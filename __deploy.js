/* SSDL Graph Deployer
 * by Błażej Wolańczyk (blazejwolanczyk@gmail.com) based on previous work
 * SUBMITTED: 09.10.2012
 * INPUT:
 * 	REQUIRED PARAMS: 
 * 		- ssdlJson (jSon form of SSDL XML)
 * 		- canvasW (width of canvas we will be drawing on)
 * 		- canvasH (height of canvas we will be drawing on)
 * 	OPTIONAL PARAMS:
 * 		- targetPaper (paper on which we want to draw visualisation !if we want!)
 * 		- nodeW (width of nodes)
 * 		- nodeH (height of nodes)
 * 		- nodeHSpacing (minimum horizontal spacing between nodes)
 * 		- nodeVSpacing (vertical spacing between nodes)
 * 		- startY (height on canvas from which we start to draw graph)
 * OUTPUT:
 *	- object containing:
 * 		- array in specified format [nodeId, positionX, positionY, nodeLabel]
 *		- function getCoords providing [x,y] for node with specified id
 */
(function(){
	function deploy(ssdlJson, canvasW, canvasH, targetPaper, nodeW, nodeH, nodeHSpacing, nodeVSpacing, startY) {
		//-MAIN-FUNCTION--------------------->>>
		function run(){//deploying main ssdl graph
			var jnodes = ssdlJson.nodes,
				nodeArr = getNodes(jnodes);
			processNodes(nodeArr);
			var graphMat = postProcessNodes(nodeArr);
			if(false && s.debugMode){
				console.time("Deploying Time");
				console.group("DEPLOYMENT RESULTS:");
			}
			if(nodeArr.length>18){//CHOICE TIME
				if(false && s.debugMode) console.info("Genetic Alghoritm in use");
				var bestI = genetic(graphMat, 200, 250, 20, 25, 50);
			}else{
				if(false && s.debugMode) console.info("BruteForce Alghoritm in use");
				var bestI = bruteForce(graphMat);
			}
			var out = generateCoords(graphMat, bestI);
			if(false && s.debugMode){
				console.log("ALGHORITM PERFORMANCE: ");
				console.timeEnd("Deploying Time");
				console.info("Best deployment rating: " + bestI.rating);
				console.log("GRAPH MATRIX: ");
				console.log(graphMat);
				console.log("DEPLOYMENT: ");
				console.log(out);
				console.groupEnd();
			}
			visualize(out, nodeArr, targetPaper);
			console.log(out);
			var outObj = {
				coords: out,
				getCoords: function(id){
					var len = this.coords.length;
					var outputCoordsTab;
					for(var i = 0; i<len; i++){
						if(this.coords[i][0]===id){
							outputCoordsTab = [this.coords[i][1], this.coords[i][2]];
							break;
						}
					}
					return outputCoordsTab;
				}
			}
			return outObj;
		}
		//-PARSING-FUNCTIONS----------------->>>
		function node(id, targets, label, condition) {//NODE OBJECT
			this.id = id;
			this.label = label;
			this.parents = [];
			this.children = [];
			this.targets = targets;
			this.condition = condition;
			this.level = -1;
			this.column = -1;
		}
		function getNodes(jsonNodes) {//building nodes list basing on JSon form of SSDL
			var nodes = [];
			var i = 0;
			$.each(jsonNodes, function() {
				nodes[i] = new node(this.nodeId, this.targets, this.nodeLabel, this.condition);
				i++;
			});
			return nodes;
		}
		function getNodeById(nodeArray, nId) {//searching nodes list for node with specific id
			var ret = null
			$.each(nodeArray, function() {
				if(this.id == nId) {
					ret = this;
					return false;
				}
			});
			if(ret == null) console.error('getNodeById("' + nId +'") returned NULL!');
			return ret;
		}
		function processCondition(condition, parent, nodeArray){ //create parent/children refferences by condition values
			var temp = getNodeById(nodeArray, condition.then);
			parent.children.push(temp);
			temp.parents.push(parent);
			if(condition['else'].then){
				processCondition(condition['else'], parent, nodeArray);
			}
		}
		function processNodes(nodeArray) {//setting flow and processing subgraph for each node
			$.each(nodeArray, function() {
				var tempObj = this;
				if(this.targets){
					if(this.targets.length!=0){
						$.each(this.targets, function() {//assigning parent/child refferences for each node
							if(typeof this != 'object'){
								var temp = getNodeById(nodeArray, this);
								if(temp != null) {
									tempObj.children.push(temp);
									temp.parents.push(tempObj);
								}
							}
						});
					}else if(this.id!="#End"){
						processCondition(this.condition, this, nodeArray);
					}
				}
			});
		}
		function postProcessNode(node) {//assigning node level to node and its parents/children
			if(node.id == "#Start") {//if in root assigning level 0
				node.level = 0;
			} else {
				$.each(node.parents, function() {
					postProcessNode(this);
				});
			}
			var lowerLevel = node.level;
			$.each(node.children, function() {//assigning  node level incremented by one to all children
				if(this.level == -1 || this.level > lowerLevel + 1) {
					this.level = lowerLevel + 1;
				}
			});
		}
		function postProcessNodes(nodeArray) {//creating graphMatrix and subgraph Matrixes
			var graphMatrix = [[]];
			postProcessNode(getNodeById(nodeArray, "#End")); //assigning node levels
			console.log(nodeArray);
			$.each(nodeArray, function() {
				if(this.id != "#End") {//for all nodes except #End
					if(!graphMatrix[this.level]) {//creating level array if not present
						graphMatrix[this.level] = [];
					}
					graphMatrix[this.level].push(this); //assigning node to graph matrix
					this.column = graphMatrix[this.level].length - 1; //assigning column nuber to node
				}
			});
			//assigning #End to graph matrix
			var stop = getNodeById(nodeArray, "#End");
			if(graphMatrix[stop.level]) {
				stop.level++;
			}
			graphMatrix[stop.level] = [stop];
			stop.column = 0;
			return graphMatrix;
		}
		//-AUXILIARY-FUNCTIONS--------------->>>
		function clone(tab){//array shallow cloning function
			var result = [];
			$.each(tab, function(i, v){
				result.push(v);
			});
			return result;
		}
		function cloneObj(obj){//object deep cloning function
			var object = {};
			object.o = obj;
			var clone = jQuery.extend(true, {}, object);
			var result = clone.o;
			return result;
		}
		//-DEPLOYMENT-ALGORITHM-FUNCTIONS---->>>
		function individual(deploymentMatrix) {//INDIVIDUAL OBJECT
			this.deploymentMatrix = deploymentMatrix;
			this.rating = null;
		}
		function rate(individual, graphMatrix) {//rating individual by square criterion
			var deploymentMatrix = individual.deploymentMatrix,
				len = deploymentMatrix.length,
				rating = 0;
			for(var i = 1; i < len; i++) {//for each level
				var len2 = deploymentMatrix[i].length;
				for(var j = 0; j < len2; j++) {//for each column
					var num = deploymentMatrix[i][j],
						temp = graphMatrix[i][num].parents, //get parents
						len3 = temp.length,
						parentColIds = [],
						parentRowIds = [];
					for(var k = 0; k < len3; k++) {//get their IDs
						parentColIds.push(temp[k].column);
						parentRowIds.push(temp[k].level);
					}
					//sum horizontal distance to all parents for all nodes
					var len4 = parentColIds.length;
					for(var l = 0; l<len4; l++){
						var len5 = deploymentMatrix[parentRowIds[l]].length;
						if(len2>1){
							for(var o = 0; o<len5; o++){
								if(deploymentMatrix[parentRowIds[l]][o]==parentColIds[l]){
									var xLen = ((j+1)/(len2+1))-((o+1)/(deploymentMatrix[parentRowIds[l]].length+1));
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
		}
		//-BRUTEFORCE-VERSION---------------->>>
		function bruteForce(graphMatrix) {//searching for best deployment by bruteForce
			var len = graphMatrix.length,
				matrix = [[]],
				bruteForceMatrix = [[[]]],
				individuals = [],
				bestRating,
				tempRating,
				bestIndividual,
				tempIndividual;
			for(var i = 0; i < len; i++) {//for each level
				var len2 = graphMatrix[i].length,
					tab = [];
				for(var j = 0; j < len2; j++) {//create table of possible IDs
					tab.push(j);
				}
				//ZuO i mrokH i rekurencja
				bruteForceMatrix[i] = [];
				generatePossibleRows(tab, [], bruteForceMatrix[i], len2);
			}
			//here we have matrix of possible levels, now it's time to mix it to individuals
			generateDepMat(bruteForceMatrix, [], individuals, 0);
			var am = individuals.length,
				tempMat = [[]];
			for(var i = 0; i<len; i++){
				tempMat[i] = [];
				tempMat[i] = bruteForceMatrix[i][individuals[0][i]];
			}
			bestIndividual = new individual(tempMat);
			bestRating = rate(bestIndividual, graphMatrix);
			//searching for best individual by checking all generated matrixes
			for(var i = 1; i<am; i++){
				tempMat = [[]];
				for(var j = 0; j<len; j++){
					tempMat[j] = [];
					tempMat[j] = bruteForceMatrix[j][individuals[i][j]];
				}
				tempIndividual = new individual(tempMat);
				tempRating = rate(tempIndividual, graphMatrix);
				if(tempRating<bestRating){
					bestRating = tempRating;
					bestIndividual = tempIndividual;
				}
			}
			return bestIndividual;
		}
		function generatePossibleRows(possibleIds, combination, output, left){//generating table of possible rows
			if(left==0){//if combination was completed
				output.push(combination); //add it to output matrix
			}else{
				for(var i = 0; i < left; i++){//for left possible ids
					var ids = clone(possibleIds),
						newCombination = clone(combination);
					newCombination.push(ids[i]); //create new combinations
					for(var j = i; j < left - 1; j++) {//shrink support table
						ids[j] = ids[j + 1];
					}
					generatePossibleRows(ids, newCombination, output, left-1); //send combination further
				}
			}
		}
		function generateDepMat(bfMatrix, combination, output, row){//generating deployment matrixes for individuals
			if(row==bfMatrix.length){//if combination was completed
				output.push(combination); //add it to output table
			}else{
				var len = bfMatrix[row].length;
				for(var i = 0; i<len; i++){//for all possible combinations of this level
					var newCombination = clone(combination);
					newCombination.push(i); //create new deployment option based on row ids
					generateDepMat(bfMatrix, newCombination, output, row+1); //send combination further
				}
			}
		}
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
			for(var i = 1; i < individualsAmount; i++) {
				deploymentMatrix = generateRandom(graphMatrix); //generating random individual
				ind = new individual(deploymentMatrix);
				if(rate(ind, graphMatrix) < bestRating) {//rating random individual / if it's best then save it as best
					bestRating = ind.rating;
					bestIndividual = cloneObj(ind);
					// console.log("0 - New best (r): " + bestIndividual.rating);
				}
				individuals.push(ind);
			}
			//generating further generations
			for(var i = 1; i < generationsAmount && bestRating > 0; i++) {
				oldIndividuals = cloneObj(individuals);
				for(var j = 0; j < individualsAmount; j++) {
					individual1 = select(oldIndividuals, individualsAmount, rivalsAmount);
					rand = Math.floor((Math.random() * 100)) + 1;
					if(rand < mutationRatio) {
						individual1 = mute(individual1);
					}
					rand = Math.floor((Math.random() * 100)) + 1;
					if(rand < hybridizationRatio) {
						individual2 = select(oldIndividuals, individualsAmount, rivalsAmount);
						hybridize(individual1, individual2);
						rand = Math.floor((Math.random() * 100)) + 1;
						if(rand < mutationRatio) {
							individual2 = mute(individual2);
						}
						individuals[j] = individual2;
						if(rate(individual2, graphMatrix) < bestRating) {
							bestRating = individual2.rating;
							bestIndividual = cloneObj(individual2);
							bestGen = i;
							// console.log(i + " - New best (h): " + bestIndividual.rating);
						}
						j++;
					}
					if(rate(individual1, graphMatrix) < bestRating) {
						bestRating = individual1.rating;
						bestIndividual = cloneObj(individual1);
						bestGen = i;
						// console.log(i + " - New best (m): " + bestIndividual.rating);
					}
					individuals[j] = individual1;
				}
			}
			console.info("Best deployment discovered in " + bestGen + "/" + generationsAmount + " generation");
			return bestIndividual;
		}
		function select(individuals, indAm, rivalsAmount) {//selection by tournament
			rand = Math.floor((Math.random() * indAm));
			bestIndividual = individuals[rand];
			bestRating = bestIndividual.rating;
			for(var j = 1; j < rivalsAmount; j++) {
				rand = Math.floor((Math.random() * indAm));
				ind = individuals[rand];
				if(ind.rating < bestRating) {
					bestIndividual = ind;
					bestRating = ind.rating;
				}
			}
			return new individual(bestIndividual.deploymentMatrix.slice());
		}
		function mute(individual1) {//mutation by switching 2 elements of random level
			deploymentMatrix = individual1.deploymentMatrix.slice();
			individual2 = new individual(deploymentMatrix);
			rand = Math.floor((Math.random() * individual2.deploymentMatrix.length));
			rand2 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			rand3 = Math.floor((Math.random() * individual2.deploymentMatrix[rand].length));
			temp = individual2.deploymentMatrix[rand][rand2];
			individual2.deploymentMatrix[rand][rand2] = individual2.deploymentMatrix[rand][rand3];
			individual2.deploymentMatrix[rand][rand3] = temp;
			return individual2;
		}
		function hybridize(individual1, individual2) {//hybridization
			len = individual2.deploymentMatrix.length;
			rand1 = Math.floor((Math.random() * len));
			rand2 = Math.floor((Math.random() * len));
			for(var i = rand1; i<rand2; i++){
				individual2.deploymentMatrix[i] = clone(individual1.deploymentMatrix[i]);
			}
		}
		function generateRandom(graphMatrix) {//generating random deployment matrix
			len = graphMatrix.length;
			matrix = [[]];
			for(var i = 0; i < len; i++) {//for each level
				len2 = graphMatrix[i].length;
				tab = [];
				tab2 = [];
				elAmount = len2;
				for(var j = 0; j < len2; j++) {//create table of possible IDs
					tab.push(j);
				}
				for(var j = 0; j < len2; j++) {//randomly place all IDs
					rand = Math.floor((Math.random() * elAmount));
					tab2.push(tab[rand]);
					for(var k = rand; k < elAmount - 1; k++) {//shrink support table (tab)
						tab[k] = tab[k + 1];
					}
					elAmount--;
				}
				matrix[i] = tab2;
			}
			return matrix;
		}
		//-COMMON-FINISH--------------------->>>
		function generateCoords(graphMatrix, bestInd) {//generating ID's -> coordinates table
			var w = canvasW;
			var width, height, spacing, hSpacing;
			//check if node properties are defined. if not assign default
			if(startY==undefined){
				startY = 15;
			}
			if(nodeW!=undefined&&nodeH!=undefined){
				width = nodeW;
				height = nodeH;
			}else{
				width = 145;
				height = 30;
			}
			if(nodeVSpacing!=undefined){
				spacing = nodeVSpacing;
			}else{
				spacing = 30;
			}
			if(nodeHSpacing!=undefined){
				hSpacing = nodeHSpacing;
			}else{
				hSpacing = 30;
			}
			var dMatrix = bestInd.deploymentMatrix,
				len = dMatrix.length,
				maxWidth = 1,
				rowLength = [],
				rowElWidth = [],
				columnPadding = [];
			//searching for longest row
			for(var i = 0; i < len; i++) {
				rowLength[i] = dMatrix[i].length;
				if(rowLength[i] > maxWidth) {
					maxWidth = dMatrix[i].length;
				}
			}
			for(var i = 0; i < len; i++) {
				rowElWidth[i] = w / rowLength[i];
				if(rowElWidth[i]<width+hSpacing){
					rowElWidth[i] = width+hSpacing;
					columnPadding[i] = (w - rowLength[i]*(width+hSpacing))/2;
				}else{
					columnPadding[i] = 0;
				}
			}
			var dTab = [];
			//assigning x & y to nodes
			for(var i = 0; i < len; i++) {
				var len2 = dMatrix[i].length;
				for(var j = 0; j < len2; j++) {
					var id = graphMatrix[i][dMatrix[i][j]].id,
						label = graphMatrix[i][dMatrix[i][j]].label,
						y = i * (height + spacing) + startY,
						x = Math.floor(columnPadding[i] + j * rowElWidth[i] + (rowElWidth[i] - width) / 2),
						tab = [];
					tab[0] = id;
					tab[1] = x;
					tab[2] = y;
					tab[3] = label;
					dTab.push(tab);
				}
			}
			return dTab;
		}
		//-DISPLAYING-VISUAL-RESULT---------->>>
		function visualize(out, nodeArr, targetPaper){
			var paper = targetPaper;
			if(!paper) return undefined;
			var width, height;
			if(nodeW==undefined||nodeH==undefined){
				width = 145;
				height = 30;
			}else{
				width = nodeW;
				height = nodeH;
			}
			var arr = nodeArr;
			var len = nodeArr.length;
			canvasH = canvasH || 600;
			var paper = targetPaper;
			paper.setStart();
			paper.clear();
			//RAPHAEL
			var dragger = function dragger() {
				$.each(this.set, function() {
					switch(this.type){
		            	case "rect":
		            		this.ox = this.attr("x");
		            		this.oy = this.attr("y");
		            		break;
		            	case "text":
		           			this.ox = this.attr("x");
			        		this.oy = this.attr("y");
		           			break;
		           		default:
		           			this.ox = this.attr("cx");
		            		this.oy = this.attr("cy");
		           			break;
		           	}
			        this.animate({"fill-opacity": .5}, 500);
				});
		    },
	        move = function move(dx, dy) {
	        	$.each(this.set, function() {
		            var att;
		            switch(this.type){
		            	case "rect":
		            		att = {x: this.ox + dx, y: this.oy + dy};
		            		break;
		            	case "text":
		           			att = {x: this.ox + dx, y: this.oy + dy};
		           			break;
		           		default:
		           			att = {cx: this.ox + dx, cy: this.oy + dy};
		           			break;
		           	}
		            this.attr(att);
		            for (var i = connections.length; i--;) {
		                paper.connection(connections[i]);
		            }
	            });
	        },
	        up = function () {
	        	$.each(this.set, function() {
	            	this.animate({"fill-opacity": 1}, 500);
	            });
	        };

	        function getShape(tab, id){
	        	var result;
	        	$.each(tab, function(key, value) {
	        		if(this.id==id){
	        			result = this;
	        			return false;
	        		}
				});
				return result;
	        }
	        Raphael.fn.connection = function(obj1, obj2, line, bg) {
			    if (obj1.line && obj1.from && obj1.to) {
			        line = obj1;
			        obj1 = line.from;
			        obj2 = line.to;
			    }
			    var bb1 = obj1.getBBox(),
			        bb2 = obj2.getBBox(),
			        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
			        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
			        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
			        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
			        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
			        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
			        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
			        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
			        d = {}, dis = [];
			    for (var i = 0; i < 4; i++) {
			        for (var j = 4; j < 8; j++) {
			            var dx = Math.abs(p[i].x - p[j].x),
			                dy = Math.abs(p[i].y - p[j].y);
			            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
			                dis.push(dx + dy);
			                d[dis[dis.length - 1]] = [i, j];
			            }
			        }
			    }
			    if (dis.length == 0) {
			        var res = [0, 4];
			    } else {
			        res = d[Math.min.apply(Math, dis)];
			    }
			    var x1 = p[res[0]].x,
			        y1 = p[res[0]].y,
			        x4 = p[res[1]].x,
			        y4 = p[res[1]].y;
			    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
			    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
			    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
			        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
			        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
			        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
			    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
			    var angle = Math.atan2(x1-x4,y4-y1)-Math.PI/4;
			    //angle = (angle / (2 * Math.PI)) * 360;
			    var size = 8;
			    var arrowPath = "M"+ x1+ " "+ y1+ " L"+ (x1 - Math.cos(angle)*size)+ " "+ (y1 - Math.sin(angle)*size)+ " L"+ (x1 - Math.sin(angle)*size)+ " "+ (y1 + Math.cos(angle)*size)+ " Z";
			    //path += arrowPath;
			    if (line && line.line) {
			        line.bg && line.bg.attr({path: path});
			        line.line.attr({path: path});
			        line.arrow.attr({path: arrowPath});
			    } else {
			        var color = typeof line == "string" ? line : "#000";
			        return {
			            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
			            line: this.path(path).attr({stroke: color, fill: "none"}),
			            arrow: this.path(arrowPath).attr({stroke: color, fill: "#000"}),
			            from: obj1,
			            to: obj2
			        };
			    }
			};
			//drawing blocks
			var shape;
			var shapes = [];
			var connections = [];
			$.each(out, function(key, value) {
				shape = paper.set();
				var block = paper.rect(value[1], value[2], width, height, 5).attr({
					fill : "#222"
				});
				var text = paper.text(value[1] + width / 2, value[2] + 10, value[3] || value[0]).attr({
					fill : "#ffff00", 
					"font-size": 14
				});
				block.set = shape;
				text.set = shape;
				shape.push(text);
				shape.push(block);
				shape.id = value[0];
				shapes.push(shape);
			});
			for (var i = 0, ii = shapes.length; i < ii; i++) {
		        var color = Raphael.getColor();
		        shapes[i].attr({cursor: "move"});
		        shapes[i].drag(move, dragger, up);
		    }
		    for(var i = 0; i < len; i++) {
				var len2 = arr[i].children.length;
				for(var j = 0; j < len2; j++){
					connections.push(paper.connection(getShape(shapes, arr[i].children[j].id), getShape(shapes, arr[i].id), "#000"));
				}
			}
		}
		//-PLUGIN-RUN------------------------>>>
		return run();
	}
	e.c.deploy = deploy;
})();
