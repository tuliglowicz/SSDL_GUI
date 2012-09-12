
	function deploy(ssdlJson, canvasW, nodeW, nodeH, nodeHSpacing, nodeVSpacing, startY) {
		/* DEPLOYER 2.0 (Błażej)
		 * REQUIRED PARAMS:
		 * - ssdlJson (jSon form of SSDL XML)
		 * - canvasW (width of canvas we will be drawing on)
		 * OPTIONAL PARAMS:
		 * - nodeW (width of nodes)
		 * - nodeH (height of nodes)
		 * - nodeHSpacing (minimum horizontal spacing between nodes)
		 * - nodeVSpacing (vertical spacing between nodes)
		 * - startY (height on canvas from which we start to draw graph)
		 * OUTPUT:
		 * - object
		 * -> coords (array{nodeID, nodeX, nodeY})
		 * -> getCoords (function(id) returning array{nodeX, nodeY} for specified ID)
		 */

		//-MAIN-FUNCTION--------------------->>>
		function run() { //deploying main ssdl graph
			var jnodes = ssdlJson.nodes,
				nodeArr = getNodes(jnodes);
			processNodes(nodeArr);
			var graphMat = postProcessNodes(nodeArr);
			// console.time("Deploying Time");
			// console.group("DEPLOYMENT RESULTS:");
			if (nodeArr.length > 18) { //CHOICE TIME
				// console.info("Genetic Alghoritm in use");
				var bestI = genetic(graphMat, 200, 250, 20, 25, 50);
			} else {
				// console.info("BruteForce Alghoritm in use");
				var bestI = bruteForce(graphMat);
			}
			var out = generateCoords(graphMat, bestI);
			// console.log("ALGHORITM PERFORMANCE: ");
			// console.timeEnd("Deploying Time");
			// console.info("Best deployment rating: " + bestI.rating);
			// console.log("GRAPH MATRIX: ");
			// console.log(graphMat);
			// console.log("DEPLOYMENT: ");
			// console.log(out);
			// console.groupEnd();
			var outObj = {
				coords: out,
				getCoords: function(id) {
					var len = this.coords.length;
					var outputCoordsTab;
					for (var i = 0; i < len; i++) {
						if (this.coords[i][0] === id) {
							outputCoordsTab = [this.coords[i][1], this.coords[i][2]];
							break;
						}
					}

					return outputCoordsTab;
				}
			}
			return outObj;
		};
		//-PARSING-FUNCTIONS----------------->>>
		function node(id, sources) { //NODE OBJECT
			this.id = id;
			this.parents = [];
			this.children = [];
			this.sources = sources;
			this.level = -1;
			this.column = -1;
		};
		function getNodes(jsonNodes) { //building nodes list basing on JSon form of SSDL
			var nodes = [];
			var i = 0;
			$.each(jsonNodes, function() {
				nodes[i] = new node(this.nodeId, this.sources);
				i++;
			});
			return nodes;
		};
		function getNodeById(nodeArray, nId) { //searching nodes list for node with specific id
			var ret = null
			$.each(nodeArray, function() {
				if (this.id == nId) {
					ret = this;
					return false;
				}
			});
			return ret;
		};
		function processNodes(nodeArray) { //setting flow for each node
			$.each(nodeArray, function() {
				var tempObj = this;
				$.each(this.sources, function() { //assigning parent/child refferences for each node
					var temp = getNodeById(nodeArray, this);
					if (temp != null) {
						tempObj.parents.push(temp);
						temp.children.push(tempObj);
					} else {
						// console.error("getNodeByID(" + this + ") returned NULL!!!");
					}
				});
			});
		};
		function postProcessNode(node) { //assigning node level to node and its parents/children
			if (node.id == "#Start") { //if in root assigning level 0
				node.level = 0;
			} else {
				$.each(node.parents, function() {
					postProcessNode(this);
				});
			}
			var lowerLevel = node.level;
			$.each(node.children, function() { //assigning  node level incremented by one to all children
				if (this.level == -1 || this.level > lowerLevel + 1) {
					this.level = lowerLevel + 1;
				}
			});
		};
		function postProcessNodes(nodeArray) { //creating graphMatrix and subgraph Matrixes
			var graphMatrix = [
				[]
			];
			postProcessNode(getNodeById(nodeArray, "#End")); //assigning node levels
			$.each(nodeArray, function() {
				if (this.id != "#End") { //for all nodes except #End
					if (!graphMatrix[this.level]) { //creating level array if not present
						graphMatrix[this.level] = [];
					}
					graphMatrix[this.level].push(this); //assigning node to graph matrix
					this.column = graphMatrix[this.level].length - 1; //assigning column nuber to node
				}
			});
			//assigning #End to graph matrix
			var stop = getNodeById(nodeArray, "#End");
			if (graphMatrix[stop.level]) {
				stop.level++;
			}
			graphMatrix[stop.level] = [stop];
			stop.column = 0;
			return graphMatrix;
		};
		//-AUXILIARY-FUNCTIONS--------------->>>
		function clone(tab) { //array shallow cloning function
			var result = [];
			$.each(tab, function(i, v) {
				result.push(v);
			});
			return result;
		};
		function cloneObj(obj) { //object deep cloning function
			var object = {};
			object.o = obj;

			// try  jQuery.extend(true, [], object);
			// roznica: {} -> [];
			var clone = jQuery.extend(true, {}, object);
			var result = clone.o;
			return result;
		};
		//-DEPLOYMENT-ALGORITHM-FUNCTIONS---->>>
		function individual(deploymentMatrix) { //INDIVIDUAL OBJECT
			this.deploymentMatrix = deploymentMatrix;
			this.rating = null;
		};
		function rate(individual, graphMatrix) { //rating individual by square criterion
			var deploymentMatrix = individual.deploymentMatrix,
				len = deploymentMatrix.length,
				rating = 0;
			for (var i = 1; i < len; i++) { //for each level
				var len2 = deploymentMatrix[i].length;
				for (var j = 0; j < len2; j++) { //for each column
					var num = deploymentMatrix[i][j],
						temp = graphMatrix[i][num].parents,
						//get parents
						len3 = temp.length,
						parentColIds = [],
						parentRowIds = [];
					for (var k = 0; k < len3; k++) { //get their IDs
						parentColIds.push(temp[k].column);
						parentRowIds.push(temp[k].level);
					}
					//sum horizontal distance to all parents for all nodes
					var len4 = parentColIds.length;
					for (var l = 0; l < len4; l++) {
						var len5 = deploymentMatrix[parentRowIds[l]].length;
						if (len2 > 1) {
							for (var o = 0; o < len5; o++) {
								if (deploymentMatrix[parentRowIds[l]][o] == parentColIds[l]) {
									var xLen = ((j + 1) / (len2 + 1)) - ((o + 1) / (deploymentMatrix[parentRowIds[l]].length + 1));
									xLen *= xLen;
									rating += Math.sqrt(xLen);
								}
							}
						}
					}
				}
			}
			individual.rating = rating;
			return rating;
		};
		//-BRUTEFORCE-VERSION---------------->>>
		function bruteForce(graphMatrix) { //searching for best deployment by bruteForce
			var len = graphMatrix.length,
				matrix = [
					[]
				],
				bruteForceMatrix = [
					[
						[]
					]
				],
				individuals = [],
				bestRating, tempRating, bestIndividual, tempIndividual;
			for (var i = 0; i < len; i++) { //for each level
				var len2 = graphMatrix[i].length,
					tab = [];
				for (var j = 0; j < len2; j++) { //create table of possible IDs
					tab.push(j);
				}
				//ZuO i mrokH i rekurencja
				bruteForceMatrix[i] = [];
				generatePossibleRows(tab, [], bruteForceMatrix[i], len2);
			}
			//here we have matrix of possible levels, now it's time to mix it to individuals
			generateDepMat(bruteForceMatrix, [], individuals, 0);
			var am = individuals.length,
				tempMat = [
					[]
				];
			for (var i = 0; i < len; i++) {
				tempMat[i] = [];
				tempMat[i] = bruteForceMatrix[i][individuals[0][i]];
			}
			bestIndividual = new individual(tempMat);
			bestRating = rate(bestIndividual, graphMatrix);
			//searching for best individual by checking all generated matrixes
			for (var i = 1; i < am; i++) {
				tempMat = [
					[]
				];
				for (var j = 0; j < len; j++) {
					tempMat[j] = [];
					tempMat[j] = bruteForceMatrix[j][individuals[i][j]];
				}
				tempIndividual = new individual(tempMat);
				tempRating = rate(tempIndividual, graphMatrix);
				if (tempRating < bestRating) {
					bestRating = tempRating;
					bestIndividual = tempIndividual;
				}
			}
			return bestIndividual;
		};
		function generatePossibleRows(possibleIds, combination, output, left) { //generating table of possible rows
			if (left == 0) { //if combination was completed
				output.push(combination); //add it to output matrix
			} else {
				for (var i = 0; i < left; i++) { //for left possible ids
					var ids = clone(possibleIds),
						newCombination = clone(combination);
					newCombination.push(ids[i]); //create new combinations
					for (var j = i; j < left - 1; j++) { //shrink support table
						ids[j] = ids[j + 1];
					}
					generatePossibleRows(ids, newCombination, output, left - 1); //send combination further
				}
			}
		};
		function generateDepMat(bfMatrix, combination, output, row) { //generating deployment matrixes for individuals
			if (row == bfMatrix.length) { //if combination was completed
				output.push(combination); //add it to output table
			} else {
				var len = bfMatrix[row].length;
				for (var i = 0; i < len; i++) { //for all possible combinations of this level
					var newCombination = clone(combination);
					newCombination.push(i); //create new deployment option based on row ids
					generateDepMat(bfMatrix, newCombination, output, row + 1); //send combination further
				}
			}
		};
		//-GENETIC-VERSION------------------->>>
		function genetic(graphMatrix, generationsAmount, individualsAmount, rivalsAmount, mutationRatio, hybridizationRatio) {
			var individuals = [];
			var oldIndividuals = null;
			//generating 1st individual and save it as best
			var deploymentMatrix = generateRandom(graphMatrix);
			var bestIndividual = new individual(deploymentMatrix);
			var bestRating = rate(bestIndividual, graphMatrix);
			var bestGen = 0;
			individuals.push(bestIndividual);
			//generating 1st generation
			for (var i = 1; i < individualsAmount; i++) {
				deploymentMatrix = generateRandom(graphMatrix); //generating random individual
				ind = new individual(deploymentMatrix);
				if (rate(ind, graphMatrix) < bestRating) { //rating random individual / if it's best then save it as best
					bestRating = ind.rating;
					bestIndividual = cloneObj(ind);
				}
				individuals.push(ind);
			}
			//generating further generations
			for (var i = 1; i < generationsAmount && bestRating > 0; i++) {
				oldIndividuals = cloneObj(individuals);
				for (var j = 0; j < individualsAmount; j++) {
					individual1 = select(oldIndividuals, individualsAmount, rivalsAmount);
					rand = Math.floor((Math.random() * 100)) + 1;
					if (rand < mutationRatio) {
						individual1 = mute(individual1);
					}
					rand = Math.floor((Math.random() * 100)) + 1;
					if (rand < hybridizationRatio) {
						individual2 = select(oldIndividuals, individualsAmount, rivalsAmount);
						hybridize(individual1, individual2);
						rand = Math.floor((Math.random() * 100)) + 1;
						if (rand < mutationRatio) {
							individual2 = mute(individual2);
						}
						individuals[j] = individual2;
						if (rate(individual2, graphMatrix) < bestRating) {
							bestRating = individual2.rating;
							bestIndividual = cloneObj(individual2);
							bestGen = i;
						}
						j++;
					}
					if (rate(individual1, graphMatrix) < bestRating) {
						bestRating = individual1.rating;
						bestIndividual = cloneObj(individual1);
						bestGen = i;
					}
					individuals[j] = individual1;
				}
			}
			// console.info("Best deployment discovered in " + bestGen + "/" + generationsAmount + " generation");
			return bestIndividual;
		};
		function select(individuals, indAm, rivalsAmount) { //selection by tournament
			rand = Math.floor((Math.random() * indAm));
			bestIndividual = individuals[rand];
			bestRating = bestIndividual.rating;
			for (var j = 1; j < rivalsAmount; j++) {
				rand = Math.floor((Math.random() * indAm));
				ind = individuals[rand];
				if (ind.rating < bestRating) {
					bestIndividual = ind;
					bestRating = ind.rating;
				}
			}
			return new individual(bestIndividual.deploymentMatrix.slice());
		};
		function mute(individual1) { //mutation by switching 2 elements of random level
			deploymentMatrix = individual1.deploymentMatrix.slice();
			individual2 = new individual(deploymentMatrix);
			rand = Math.floor((Math.random() * individual2.deploymentMatrix.length));
			rand2 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			rand3 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			temp = individual2.deploymentMatrix[rand][rand2];
			individual2.deploymentMatrix[rand][rand2] = individual2.deploymentMatrix[rand][rand3];
			individual2.deploymentMatrix[rand][rand3] = temp;
			return individual2;
		};
		function hybridize(individual1, individual2) { //hybridization
			len = individual2.deploymentMatrix.length;
			rand1 = Math.floor((Math.random() * len));
			rand2 = Math.floor((Math.random() * len));
			for (var i = rand1; i < rand2; i++) {
				individual2.deploymentMatrix[i] = clone(individual1.deploymentMatrix[i]);
			}
		};
		function generateRandom(graphMatrix) { //generating random deployment matrix
			len = graphMatrix.length;
			matrix = [
				[]
			];
			for (var i = 0; i < len; i++) { //for each level
				len2 = graphMatrix[i].length;
				tab = [];
				tab2 = [];
				elAmount = len2;
				for (var j = 0; j < len2; j++) { //create table of possible IDs
					tab.push(j);
				}
				for (var j = 0; j < len2; j++) { //randomly place all IDs
					rand = Math.floor((Math.random() * elAmount));
					tab2.push(tab[rand]);
					for (var k = rand; k < elAmount - 1; k++) { //shrink support table (tab)
						tab[k] = tab[k + 1];
					}
					elAmount--;
				}
				matrix[i] = tab2;
			}
			return matrix;
		};
		//-COMMON-FINISH--------------------->>>
		function generateCoords(graphMatrix, bestInd) { //generating ID's -> coordinates table
			var w = canvasW;
			var width, height, spacing, hSpacing;
			//check if node properties are defined. if not assign default
			startY = startY || 15;
			width = nodeW || 135;
			height = nodeH || 30;
			spacing = nodeVSpacing || 30;
			hSpacing = nodeHSpacing || 30;
			var dMatrix = bestInd.deploymentMatrix,
				len = dMatrix.length,
				maxWidth = 1,
				rowLength = [],
				rowElWidth = [],
				columnPadding = [];
			//searching for longest row
			for (var i = 0; i < len; i++) {
				rowLength[i] = dMatrix[i].length;
				if (rowLength[i] > maxWidth) {
					maxWidth = dMatrix[i].length;
				}
			}
			for (var i = 0; i < len; i++) {
				rowElWidth[i] = w / rowLength[i];
				if (rowElWidth[i] < width + hSpacing) {
					rowElWidth[i] = width + hSpacing;
					columnPadding[i] = (w - rowLength[i] * (width + hSpacing)) / 2;
				} else {
					columnPadding[i] = 0;
				}
			}
			var dTab = [];
			//assigning x & y to nodes
			for (var i = 0; i < len; i++) {
				var len2 = dMatrix[i].length;
				for (var j = 0; j < len2; j++) {
					var id = graphMatrix[i][dMatrix[i][j]].id,
						y = i * (height + spacing) + startY,
						x = Math.floor(columnPadding[i] + j * rowElWidth[i] + (rowElWidth[i] - width) / 2),
						tab = [];
					tab[0] = id;
					tab[1] = x;
					tab[2] = y;
					dTab.push(tab);
				}
			}
			return dTab;
		}
		//-PLUGIN-RUN------------------------>>>
		return run();
	};