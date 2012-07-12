"use strict"; 
//url to adres do pliku albo repozytorium, które wysy³a listê dostêpnych us³ug.
function Controler(url, gui){
	var pf = gui.id_postfix;

	function repoNodes(visualiser){
		var resultObject = {
			currNodes : [],
			paper : undefined,
			require: "sdb_json_array div raphael_x_500".split(" "),
			generateData : function generateData(node, n){
				var result = visualiser.getBlankNode();
				result.id = node.nodeId;
				result.label = node.nodeLabel;
				result.type = node.nodeType;
				result.x = 10;
				result.y = 15 + (45 * n);
				result.height = 20;
				result.serviceName = node.physicalDescription.serviceName;
				result.set = this.paper.set();

				result.inputs = node.functionalDescription.inputs;				
				result.outputs = node.functionalDescription.outputs;

				return result;
			},
			draw: function draw(nodeArray){
				var tempNode,
					that = this,
					tmp,
					n = -1
				;

				if( $("#repoNodes_"+pf).length === 0 ){
					$("#right_plugins_"+pf).append("<div id='repoNodes_"+pf+"' class='plugin_"+pf+"'> </div>");
					this.paper = Raphael("repoNodes_"+pf, gui.view.columnParams.rightCol.width-1, 500);
				}
				
				this.clear();

				$.each(nodeArray, function(k, v){
					tempNode = that.generateData(v, ++n);
					tmp = visualiser.draw_serviceNode(tempNode, that.paper, true).switchToDFMode();
					tmp.raph_label.attr({cursor: "pointer"}).dblclick(function(){
						gui.controler.reactOnEvent("AddServiceFromRepoToCanvas", v);
					});
					$.each(tmp.outputs, function(){
						this.node.attr({cursor: "default"});
					});

					gui.view.visualiser.addTooltips(tmp);

					that.currNodes.push(tmp);
				});
			},
			clear: function clear(){
				if(this.paper){
					this.paper.clear();
					this.currNodes.length = 0;
				}
			}
		}

		return resultObject;
	}

	function initLogger(paper){
		/* LOGGER v0.666
		* REQUIRED PARAMS: 
		* - paper (on which we will draw button opening the console)
		*/
		var h = paper.height,
			dId = "#console_" + pf,
			button = paper.set(),
			buttonBG = paper.rect(paper.width - 170, -25, 150, 50, 25).attr({
				fill : "#222",
				"fill-opacity": .75
			});
		button.push(buttonBG);
		//images
		var iImg = paper.image('images/info.png', paper.width - 152, 4, 15, 15),
			wImg = paper.image('images/warning.png', paper.width - 112, 4, 15, 15),
			eImg = paper.image('images/error.png', paper.width - 72, 4, 15, 15);
		button.push(iImg);
		button.push(wImg);
		button.push(eImg);
		//counters
		var iCounter = paper.text(paper.width - 125, 11, "0").attr({fill: "white"}),
			wCounter = paper.text(paper.width - 85, 11, "0").attr({fill: "yellow"}),
			eCounter = paper.text(paper.width - 45, 11, "0").attr({fill: "orange"});
		button.push(iCounter);
		button.push(wCounter);
		button.push(eCounter);
		var buttonMask = paper.rect(paper.width - 170, -25, 150, 50, 25).attr({
			fill : "#222",
			"fill-opacity": 0.0
		});
		//auxiliary functions
		var contains = function(tab, el){
			var ret = false;
			$.each(tab, function() {
				if(this == el){
					ret = true;
				}
			});
			return ret;
		}
		var removeEl = function(tab, el){
			var len = tab.length;
			var tab2 = [];
			for(var i = 0; i<len; i++){
				if(tab[i] != el){
					tab2.push(tab[i]);
				}
			}
			return tab2;
		}
		//console object
		var obj = {
			lId : dId,
			counter : [0, 0, 0],
			mask : buttonMask,
			button : button,
			bImgs : [iImg, wImg, eImg],
			bCount : [iCounter, wCounter, eCounter],
			buttonBG : buttonBG,
			bGlow : null,
			animation : null,
			dIds : [],
			curElCount : 0,
			actionTaken : false,
			info : function(i){
				this.counter[0]++;
				this.bCount[0].remove();
				this.bCount[0] = paper.text(paper.width - 125, 11, this.counter[0]).attr({fill: "white"});
				this.button.push(this.bCount[0]);
				this.mask.toFront();
				//here adding to div and dTabs
				this.addMessage(i, 0);
			},
			warning : function(w){
				this.counter[1]++;
				this.bCount[1].remove();
				this.bCount[1] = paper.text(paper.width - 85, 11, this.counter[1]).attr({fill: "yellow"});
				this.button.push(this.bCount[1]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow().attr({fill : "#FFFF00"});
				this.mask.toFront();
				//here adding to div and dTabs
				this.addMessage(w, 1);
			},
			error : function(e){
				this.counter[2]++;
				this.bCount[2].remove();
				this.bCount[2] = paper.text(paper.width - 45, 11, this.counter[2]).attr({fill: "orange"});
				this.button.push(this.bCount[2]);
				if(this.bGlow) this.bGlow.remove();
				this.bGlow = this.buttonBG.glow(10, true).attr({fill : "#FFFF00"});
				this.mask.toFront();
				//here adding to div and dTabs
				this.addMessage(e, 2);
				//pulse
				var fade = function(o){
					if(o.buttonBG.attr("fill-opacity")==1){
						o.buttonBG.animate({"fill-opacity": 0.4}, 700);
					}else{
						o.buttonBG.animate({"fill-opacity": 1}, 700);
					}
				};
				if(this.animation) clearInterval(this.animation);
				this.animation = setInterval((function(that){
					return function(){
						fade(that);
					}
				})(this),750);
			},
			addMessage : function(message, priority){
				this.curElCount++;
				var divId = "console_row_" + this.curElCount;
				var colors = ['#FAFAFF','#FFFFE0','#FFFAFA'];
				var txtColors = ['white','yellow','orange'];
				var imgNames = ['info','warning','error'];
				var divString = [];
				divString.push("<div id='");
				divString.push(divId);
				divString.push("' style='border-bottom: dashed #222; border-bottom-width: 1px; background-color:");
				divString.push(colors[priority]);
				divString.push("; padding: 2px;'>");
				divString.push("<table width='100%' style='table-layout: fixed;'><tr><td valign='top' style='width: 20px;'>");
				divString.push("<img src='images/");
				divString.push(imgNames[priority]);
				divString.push(".png' style='padding-left: 2px; padding-top: 3px;'/></td>");
				divString.push("<td valign='top' style='float: left;'>");
				divString.push(message);
				divString.push("</td><td valign='top' style='width: 20px;'><div id='cCheck_");
				divString.push(this.curElCount);
				divString.push("'><form><input type='checkbox'/></form></div></td><td valign='top' style='width: 20px;'><div id='cCancel_");
				divString.push(this.curElCount);
				divString.push("'><img src='images/cancel.png' style='padding-left: 2px; padding-top: 3px;'/></div></td></tr></table>");
				divString = divString.join("");
				$(divString).prependTo($(this.lId));
				var checkId = "#cCheck_"+this.curElCount;
				var that = this;
				var nr = this.curElCount;
				$(checkId).click((function(that){
					return function(){
						that.actionTaken = true;
						/*
						if(contains(that.dIds, divId)){
							that.dIds = removeEl(that.dIds, divId);
						}else{
							that.dIds.push(divId);
						}*/
					}
				})(this));
				var delId = "#cCancel_"+this.curElCount;
				$(delId).click((function(that){
					return function(){
						that.actionTaken = true;
						that.counter[priority]--;
						that.bCount[priority].remove();
						that.bCount[priority] = paper.text(paper.width - (125 - (priority * 40)), 11, that.counter[priority]).attr({fill: txtColors[priority]});
						that.button.push(that.bCount[priority]);
						that.mask.toFront();
						delId = "#console_row_" + nr;
						$(delId).remove();
					}
				})(this));
			}
		};
		//event handling
		$(dId).click(function(){
			if(obj.actionTaken){
				obj.actionTaken = false;
			}else{
				$(dId).animate({
					height: 0
				});
			}
		});
		obj.mask.click(function(){
			$(dId).animate({
				height: h
			});
		});
		obj.mask.mouseover(function(){
			if(obj.bGlow) obj.bGlow.remove();
			if(obj.animation) clearInterval(obj.animation);
			obj.buttonBG.animate({"fill-opacity": 0.75}, 500);
			obj.bGlow = obj.buttonBG.glow();
		});
		obj.mask.mouseout(function(){
			obj.bGlow.remove();
		});
		return obj;
	}

	function deploy(ssdlJson, canvasW, nodeW, nodeH, nodeHSpacing, nodeVSpacing, startY) {
		/* SSDL Graph Deployment v0.64
		* by Błażej Wolańczyk (blazejwolanczyk@gmail.com)
		* "Lasciate ogni speranza, voi ch'entrate"
		* SUBMITTED: 26.06.2012
		* REQUIRED PARAMS: 
		* - ssdlJson (jSon form of SSDL XML)
		* - canvasW (width of canvas we will be drawing on)
		* OPTIONAL PARAMS:
		* - nodeW (width of nodes)
		* - nodeH (height of nodes)
		* - nodeHSpacing (minimum horizontal spacing between nodes)
		* - nodeVSpacing (vertical spacing between nodes)
		* - startY (height on canvas from which we start to draw graph)
		*/
		//-MAIN-FUNCTION--------------------->>>
		function run(){//deploying main ssdl graph
			var jnodes = ssdlJson.nodes,
				nodeArr = getNodes(jnodes);
			processNodes(nodeArr);
			var graphMat = postProcessNodes(nodeArr);
			// console.time("Deploying Time");
			// console.group("DEPLOYMENT RESULTS:");
			if(nodeArr.length>18){//CHOICE TIME
				// console.info("Genetic Alghoritm in use");
				var bestI = genetic(graphMat, 200, 250, 20, 25, 50);
			}else{
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
		function node(id, sources) {//NODE OBJECT
			this.id = id;
			this.parents = [];
			this.children = [];
			this.sources = sources;
			this.level = -1;
			this.column = -1;
		}
		function getNodes(jsonNodes) {//building nodes list basing on JSon form of SSDL
			var nodes = [];
			var i = 0;
			$.each(jsonNodes, function() {
				nodes[i] = new node(this.nodeId, this.sources);
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
			return ret;
		}
		function processNodes(nodeArray) {//setting flow and processing subgraph for each node
			$.each(nodeArray, function() {
				var tempObj = this;
				$.each(this.sources, function() {//assigning parent/child refferences for each node
					var temp = getNodeById(nodeArray, this);
					if(temp != null) {
						tempObj.parents.push(temp);
						temp.children.push(tempObj);
					} else {
						// console.error("getNodeByID(" + this + ") returned NULL!!!");
					}
				});
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

			// try  jQuery.extend(true, [], object);
			// roznica: {} -> [];

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
						}
						j++;
					}
					if(rate(individual1, graphMatrix) < bestRating) {
						bestRating = individual1.rating;
						bestIndividual = cloneObj(individual1);
						bestGen = i;
					}
					individuals[j] = individual1;
				}
			}
			// console.info("Best deployment discovered in " + bestGen + "/" + generationsAmount + " generation");
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
	}
	function subgraphTree(){
		var tmp = {
			name: "subgraphTree",
			version: "1.0",
			author: "Author",
			dataType: 'json',
			data: null,
			tree: null,
			parent: gui.controler,
			globalEvents: ["load"],
			localEvents: ["select"],
			require: "ssdl_JSON div".split(" "),
			counter: 0, //zmienna potrzebna ze względu na dziwactwo wtyczki jsTree
			draw: function draw(){
				var that = this;

				if( $("#subgraphTree_"+pf).length === 0 ){
						$("#left_plugins_"+pf).append("<div id='subgraphTree_"+pf+"' class='plugin_"+pf+"'> </div>");
				}

				if(this.parent.current_graphData){
					this.data = this.convert(this.parent.current_graphData);
					// console.log(this.data)
					// if(this.data.children.length > 0)
					// this.data.children[0].children.push( {data:"BUM"} );
					
						var out = (function(data){
						var tab = [];

						tab.push("<ul id='navigator'>");
							tab.push("<li class='navigatorElement'><img id='img_navigator_root' src='images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span>"+data.data+"</span></li>");

							(function inner(data, id){
								tab.push("<ul id='"+id+"'>");
									$.each(data.children, function(){
										if(this.children && this.children.length > 0){
											tab.push("<li class='navigatorElement'><img id='img_"+id+"' src='images\\arrow_next.png' class='img_hasChildren' style='width: 10px'/><span>"+this.data+"</span></li>");
												inner(this, id+"_"+this.data);
										}
										else {
											tab.push("<li class='navigatorElement'><img src='images\\white.gif' class='img_noChildren' style='visibility: hidden;height: 10px; width: 10px'/><span>"+this.data+"</span></li>");
										}
									});
								tab.push("</ul>");
							})(data, 'navigator_root');
						tab.push("</ul>");

						return tab.join("");
						})(this.data);

						$("#left_plugins_"+pf).html(out);

						$("img.img_hasChildren").click(function(){
							var $ul = $(this).parent().next();
							$ul.toggle( 150 );

							return false;
						});

						$("li.navigatorElement").click(function(){
							if(! $(this).find("span").hasClass("selectedLI") ){
								$("li.navigatorElement span").removeClass("selectedLI");
								$(this).find("span").addClass("selectedLI");

								gui.controler.reactOnEvent("SwitchCurrentView", {id: $(this).text(), parent_id: $(this).parent().attr("id")})
							}
							return false;
						});

						$("li.navigatorElement:first").click();
				}
			},
			convert: function convert(json, id, str){
				var n = json.nodes;
				var output_json = {
					data: (id ? id : "root"), 
					attr: {id: (id ? id : "root") },
					state: "open",
					children: []
				};
				str = ((str ? str : "") + (id ? id : "root"))
				$.each(n, function(){
					if(this.subgraph && this.subgraph.nodes && this.subgraph.nodes.length > 0){						
						var currNode = {};
						currNode.data = this.nodeId;
						currNode.attr = { id: "subgraphTree_"+pf+"_"+this.nodeId};
						currNode.state = "open";
						currNode.children = convert(this.subgraph).children;
						output_json.children.push(currNode);
					}
				});
				
				return output_json;
			}	
		}
		tmp.draw();
		
		return tmp;
	}
	function repository(data){
		if(data.constructor != "[object XMLDocument]")
			return false;
		else {
			var tmp = {
				name: "repository",
				version: "1.0",
				author: "Author",
				dataType: 'xml',
				data: data,
				paper: undefined,
				globalEvents: ["load"],
				require: "div canvas".split(" "),
				localEvents: ["select"],
				draw : function draw(){
					var html = [],
						name,
						url,
						that = this;

					if( $("#repository_"+pf).length === 0 ){
						$("#right_plugins_"+pf).append("<div id='repository_"+pf+"' class='plugin_"+pf+"'> </div>");
						//this.paper = Raphael("repository_"+pf, canvas_width, h);
					}

					$(data).find("list element").each(function(){
						name = $(this).find("name").text();
						url = $(this).find("url").text();
						html.push("<a href='"+url+"' class='repository_link_"+pf+"'>"+name+"</a><br/>");
					});
					
					$("#repository_"+pf).html(html.join(""));
					
					$(".repository_link_"+pf).click(function(){
						gui.controler.reactOnEvent("EditService", {url: this.href});

						return false;
					});

				}
			}

			tmp.draw();

			 // $("a:first").click(); //od razu wczytanie pierwszego serwisu
			
			return tmp;
		}
	}
	var controlerObject = {
		plugins : [],
		idCounter : 0,
		graphData_tab : [],
		current_graphData : {id: "root", nodes: []}, // element modelu, ale celowo zawarty w kontrolerze
		init: function init(){
			this.initPlugins();
		},
		deploy : deploy,
		initLogger : initLogger,
		load: function load(sUrl, fun_success, dataType, fun_error){
			$.ajax({
				url: sUrl,
				type: "GET",
				dataType : dataType || 'xml',
				success: fun_success || function(res, status, jqXHR){
					// console.group("AJAX QUERY RESULTS:");
					// console.info("Loaded data from "+sUrl+" with status: "+status);
					// console.group("Response:");
					// console.log(res);
					// console.groupEnd();
					// console.groupEnd();
				},
				error: fun_error || function(jqXHR, status, e){
					// console.group("AJAX QUERY RESULTS:");
					// console.error("Error while downloading data from "+sUrl);
					// console.log(status+": "+e);
					// console.groupEnd();
				}
			});
		},
		save: function save(sUrl, data, fun_success, dataType, fun_error){
			res = xmlToString(data);
			res = "ssdl=" + res;
			$.ajax({
				url: sUrl,
				type: "POST",
				dataType : dataType || 'text',
				data: res,
				success: fun_success || function(res, status, jqXHR){
					// console.group("AJAX QUERY RESULTS:");
					// console.info("Send data to "+sUrl+" with status: "+status);
					// console.group("Response:");
					// console.log(res);
					// console.groupEnd();
					// console.groupEnd();
				},
				error: fun_error || function(jqXHR, status, e){
					// console.group("AJAX QUERY RESULTS:");
					// console.error("Error while sending data to "+sUrl);
					// console.log(status+": "+e);
					// console.groupEnd();
				}
			});
		},
		xmlToString: function xmlToString(xml){
			return (new XMLSerializer()).serializeToString(xml);
		},
		loadSSDL : function loadSSDL(url){ 
			var that = this;
			this.load(url, function(ssdl){
				var ssdl_json = that.convert(ssdl);
				//raport(JSON.stringify(ssdl_json));
				if ( true ) //that.validate_ssdl(ssdl_json))
					that.current_graphData = ssdl_json;//.nodes[3].subgraph;
					gui.view.drawGraph(gui.controler.current_graphData);
					
				// alert(that.plugins)
				$.each(that.plugins, function(){
					this.draw();
				});

				that.reactOnEvent("SSDLLoaded");
			});
		},
		initPlugins : function initPlugins(){
			var that = this,
				repo,
				sdb
				;

			this.load(url, function fun_success(list){
				repo = repository(list, gui.view.columnParams.rightCol.width);
				that.plugins.push(repo);
				that.plugins.push( subgraphTree() );
			});


			this.repoNodes = repoNodes(gui.view.visualiser);

			this.load("get_all_atomic_service.xml", function fun_success(sdb){
				var parsedSDB = that.parseSDBetaArray(sdb);
				that.repoNodes.draw( parsedSDB );
			});
		},
		getNodeById : function getNodeById(id, graph){
			var result;
				graph = graph || gui.controler.current_graphData;
			if(graph.nodes){
				$.each(graph.nodes, function(){
					if( this.nodeId === id ){
						result = this;
						return false;
					}
				});
			}

			return result;
		},
		getInputById : function getInputById(nodeId, inputId){
			var result;

			if(gui.controler.current_graphData.nodes){
				$.each(gui.controler.current_graphData.nodes, function(){
					if( this.nodeId === nodeId ){
						$.each(this.functionalDescription.inputs, function(){
							if( this.id === inputId ){
								result = this;
								return false;
							}
						});
						return false;
					}
				});
			}

			return result;
		},
		addStartStop : function addStartStop(){
			var result = false;
			if( !(this.getNodeById("#Start") || this.getNodeById("#End")) ){
				var start = {
						nodeId : "#Start",
						nodeLabel : "#Start",
						nodeType : "Control",
						controlType : "#start",
						physicalDescription : {
							address : "",
							operation : "",
							serviceGlobalId : "",
							serviceName : ""
						},
						functionalDescription: {
							description : "Start node",
							effects : "",
							inputs : [],
							outputs : [],
							metaKeywords : [],
							preconditions : "",
							serviceClasses : []
						},
						alternatives : "",
						condition : "",
						sources : [],
						subgraph : {},
						nonFunctionalDescription : []
					},
					stop = {
						nodeId : "#End",
						nodeLabel : "#End",
						nodeType : "Control",
						controlType : "#end",
						physicalDescription : {
							address : "",
							operation : "",
							serviceGlobalId : "",
							serviceName : ""
						},
						functionalDescription: {
							description : "end node",
							effects : "",
							inputs : [],
							outputs : [],
							metaKeywords : [],
							preconditions : "",
							serviceClasses : []
						},
						alternatives : "",
						condition : "",
						sources : [],
						subgraph : {},
						nonFunctionalDescription : []
					};

					this.current_graphData.nodes.unshift(start, stop);
					
					result = true;
				}

				return result;
		},
		generateId : function generateId(){
			this.idCounter++;
			var num = this.current_graphData.nodes.length + this.idCounter,
				tab = ["node---"],
				digitMax = 6,
				digits = Math.ceil( Math.log(num) / Math.log(10) ),
				digitMax = (digitMax - digits >= 0 ? digitMax : digits)
				;

				for(var i = 0; i<digitMax-digits; i++)
					tab.push("0");
				tab.push(num);

			return tab.join("");
		},
		reactOnEvent : function reactOnEvent(evtType, evtObj){
			//var events = ("DRAGGING SELECTION, SELECT, DESELECT, MOVE, RESIZE, SCROLL, DELETE, EDGE DETACH,"+" DELETE NODE, CREATE NODE, CREATE EDGE, GRAPH LOADED, GRAPH SAVED, GRAPH CHANGED").split(", ");			
			var that = this;
			switch(evtType.toUpperCase()){
				case "EDITSERVICE" : (function (e) {
					if(e && e.url){
						that.loadSSDL(e.url);
					}
				})(evtObj); break;
				case "SWITCHCURRENTVIEW" : (function (e) {
					var tab_nav = e.parent_id.split("_");
						tab_nav.splice(0, 1);
						tab_nav.push(e.id);
					var tab_copy = $.extend(true, [], tab_nav);
						$.each(tab_nav, function(k, v){
							tab_nav[k] = "<a href='#' class='top_nav_element' id='top_nav_elem"+e.parent_id+"'>"+v+"</a>";
						});
						tab_nav = tab_nav.join(" \\ ");

					$("div#top_nav_"+pf+" span").html(tab_nav);

					if(e.id !== "root"){
						// get the proper subgraph
						var tmp,
							result,
							currentGraph = that.current_graphData;
						$.each(tab_copy, function(i, v){
							if(i===0) return true;
							tmp = that.getNodeById(this, currentGraph);
							currentGraph = tmp;
							if(!tmp)
								return false;
						});

						console.log(currentGraph.subgraph);
						console.log(e)
						gui.view.drawGraph(currentGraph.subgraph);
					}
				})(evtObj); break;
				case "SELECT" : (function (e) {
					gui.view.selectNodesInsideRect(e.x1,e.y1,e.x2,e.y2,e.ctrl);
				})(evtObj); break;
				case "DESELECT" : (function () {
					gui.view.deselectAll();
				})(); break;
				case "ADDCFEDGE" : (function(e){
					var target = gui.controler.getNodeById(e.target.id);
					// alert(e.target.id)
					target.sources.push( e.source.id );
					gui.view.addCFEdge(e);
				})(evtObj); break;
				case "ADDDFEDGE" : (function(e){
					var input = gui.controler.getInputById(e.targetId, e.input.id);
					if(input){
						input.source = [e.sourceId, e.output.id];
					} else {
						a(e.targetId+":"+e.input.id);
					}
					gui.view.addDFEdge(e);
				})(evtObj); break;
				case "NODEMOVED" : (function(){
					gui.view.updateEdges();
				})(); break;
				case "SWITCHMODE" : (function(e){
					gui.view.switchMode(e.mode);
				})(evtObj); break;
				case "ADDSTARTSTOPAUTOMATICALLY" : (function(){
					if( that.addStartStop() ){
						gui.view.addStartStop();
					}
				})(); break;
				case "ADDSERVICEFROMREPOTOCANVAS" : (function(e){
					e.nodeId = gui.controler.generateId();
					// alert(e.nodeId)
					e = $.extend(true, {}, e);
					that.current_graphData.nodes.push(e)
					gui.view.addNodeFromRepo(e);
				})(evtObj); break;
				case "ADDBLANKNODE" : (function(e){
					alert("inside add blank node");
				})(evtObj); break;
				case "EDITNODE" : (function(e){
					if(e && e.nodeId){
						// alert(e.nodeId)
						var node = that.getNodeById(e.nodeId);
						gui.view.editNode(node);
					}
				})(evtObj); break;
				case "TRYTOSAVENODEAFTEREDIT" : (function(e){
					//TUTAJ JACKOWA WALIDACJA
					//return { allOK: boolean, errlist:[]}
					alert("inside try to save...");
				})(evtObj); break;
			}
		},
		parseSDBetaArray : function parseSDBetaArray(sdb){
			var tab = [],
				that = this,
				node,
				$sdbArray,
				$sdb,
				$physicalDescription,
				$functionalDescription,
				$functionalDescriptionServiceClasses,
				$functionalDescriptionMetaKeywords,
				$functionalDescriptionInputs,
				$functionalDescriptionOutputs,
				$nonfunctionalDescription
			;

			$sdbArray = $(sdb).find("ServiceDescriptionArray ns2\\:serviceDescription");
			$sdbArray.each(function(){
				node = {};
				$sdb = $(this);
				$physicalDescription = $sdb.find("ns2\\:physicalDescription");
				$functionalDescription = $sdb.find("ns2\\:functionalDescription");
				$functionalDescriptionServiceClasses = $functionalDescription.find("ns2\\:serviceClasses ns2\\:serviceClass");
				$functionalDescriptionMetaKeywords = $functionalDescription.find("ns2\\:metaKeywords ns2\\:metaKeyword");
				$functionalDescriptionInputs = $functionalDescription.find("ns2\\:inputs ns2\\:input");
				$functionalDescriptionOutputs = $functionalDescription.find("ns2\\:outputs ns2\\:output");
				$nonfunctionalDescription = $sdb.find("ns2\\:nonfunctionalDescription  ns2\\:nonFunctionaleProperty");

				node.nodeLabel = $physicalDescription.find("ns2\\:serviceName").text();
				node.nodeType = "Service";
				node.physicalDescription = {
					serviceName: node.nodeLabel,
					serviceGlobalID: $physicalDescription.find("ns2\\:serviceGlobalID").text(),
					adress: $physicalDescription.find("ns2\\:address").text(),
					operation: $physicalDescription.find("ns2\\:operation").text()
				};

				node.functionalDescription = {
					serviceClasses: [],
					description: $functionalDescription.find("ns2\\:description").text(),
					metaKeywords: [],
					inputs: [],
					outputs: [],
					preconditions: [],
					effects:  []
				}

				node.nonfunctionalDescription = [];

				$functionalDescriptionServiceClasses.each(function() {
					node.functionalDescription.serviceClasses.push(this.textContent);
				});
				$functionalDescriptionMetaKeywords.each(function() {
					node.functionalDescription.metaKeywords.push(this.textContent);
				});
				$functionalDescriptionInputs.each(function() {
					var input = {};
					input.class = $(this).find("ns2\\:class").text();
					input.id = $(this).find("ns2\\:id").text();
					input.label = $(this).find("ns2\\:label").text();
					input.dataType = $(this).find("ns2\\:dataType").text();
					input.properties = $(this).find("ns2\\:properties").text();

					node.functionalDescription.inputs.push(input);

				});
				$functionalDescriptionOutputs.each(function() {
					var output = {};
					output.class = $(this).find("ns2\\:class").text();
					output.id = $(this).find("ns2\\:id").text();
					output.label = $(this).find("ns2\\:label").text();
					output.dataType = $(this).find("ns2\\:dataType").text();
					output.properties = $(this).find("ns2\\:properties").text();

					node.functionalDescription.outputs.push(output);

				});
				$nonfunctionalDescription.each(function(){
					var nonFunctionaleProperty = {};
					nonFunctionaleProperty.unit = $(this).find("ns2\\:unit").text();
					nonFunctionaleProperty.value = $(this).find("ns2\\:value").text();
					nonFunctionaleProperty.relation = $(this).find("ns2\\:relation").text();
					nonFunctionaleProperty.name =  $(this).find("ns2\\:name").text();

					node.nonfunctionalDescription.push(nonFunctionaleProperty);
				});

				node.sources = [];

				tab.push(node);
				// console.log( jstr(node) )
				// console.log("++++++++")
			});

			 // console.log(jstr(tab))

			return tab;
		},
		convert : function convert(ssdl, id){ // converst ssdl into json
			//alert("convert"+":"+ssdl);
			var Graph = {};
			Graph.id = id ? id : "root";
			Graph.nodes = [];
			
			(id ? ssdl : $(ssdl)).
			find("nodes node:first, nodes node:first ~ node").
			each(function(){
				var _this = $(this);
				var node = {};
				node.nodeId = _this.find("nodeId:first").text();
				node.nodeType = _this.find("nodeType:first").text();
				node.nodeLabel = _this.find("nodeLabel:first").text();
				node.physicalDescription = {};
				node.physicalDescription.serviceName = _this.find("serviceName:first").text();
				node.physicalDescription.serviceGlobalId = _this.find("serviceGlobalId:first").text();
				node.physicalDescription.address = _this.find("address:first").text();
				node.physicalDescription.operation = _this.find("operation:first").text();

				node.functionalDescription = {};
				node.functionalDescription.description = _this.find("functionalDescription description:first").text();
				node.functionalDescription.serviceClasses = [];
					_this.find("functionalDescription serviceClasses:first serviceClass").each(function(){
						node.functionalDescription.serviceClasses.push($(this).text());
					});
				node.functionalDescription.metaKeywords = []
					_this.find("functionalDescription metaKeywords:first metaKeyword").each(function(){
						node.functionalDescription.metaKeywords.push($(this).text());
					});
				node.functionalDescription.inputs = [];
				var input, tmp1, tmp2;
				_this.find("functionalDescription inputs:first input").each(function(){
					input = {}
						input.class = $(this).find("class").text();
						input.id = $(this).find("id").text();
						input.label = $(this).find("label").text();
						input.dataType = $(this).find("dataType").text();
						input.properties = $(this).find("properties").text();
						input.source = [];

						tmp1 = $(this).find("nodeId").text();
						tmp2 = $(this).find("outputId").text();
						if(tmp1.length > 0 && tmp1.length > 0){
							input.source.push(tmp1, tmp2);
						}
					node.functionalDescription.inputs.push(input);
				});
				node.functionalDescription.outputs = [];
				var output;
				_this.find("functionalDescription outputs:first output").each(function(){
					output = {}
						output.class = $(this).find("class").text();
						output.id = $(this).find("id").text();
						output.label = $(this).find("label").text();
						output.dataType = $(this).find("dataType").text();
						output.properties = $(this).find("properties").text();
						
					node.functionalDescription.outputs.push(output);
				});
				node.functionalDescription.preconditions = _this.find("functionalDescription preconditions:first").text();
				node.functionalDescription.effects = _this.find("functionalDescription effects:first").text();
				node.nonFunctionalDescription = [];
				var nonFunctionalProperty;
				_this.find("nonFunctionalDescription:first nonFunctionalProperty").each(function(){
					nonFunctionalProperty = {};
					nonFunctionalProperty.weight = $(this).find("weight").text();
					nonFunctionalProperty.name = $(this).find("name").text();
					nonFunctionalProperty.relation = $(this).find("relation").text();
					nonFunctionalProperty.unit = $(this).find("unit").text();
					nonFunctionalProperty.value = $(this).find("value").text();
						
					node.nonFunctionalDescription.push(nonFunctionalProperty);
				});
				
				node.alternatives = _this.find("alternatives:first").text();
				
					node.subgraph = {};
				
				if(_this.find("subGraph:first nodes").length > 0){
					var tmp = _this.find("subGraph:first");			
					node.subgraph = {};
					var t = convert(tmp, node.nodeId);			
					node.subgraph.nodes = t.nodes;
					node.subgraph.inputVariables = t.inputVariables;
					node.subgraph.nonFunctionalParameters = t.nonFunctionalParameters;
					node.subgraph.parameters = _this.find("subGraph parameters:last").text();
					node.subgraph.exceptions = _this.find("subGraph excptions:last").text();			
				}
				node.controlType = _this.find("controlType:last").text();
				node.condition = _this.find("condition:last").text();
				node.sources = [];
				_this.find("sources:last source").each(function(){
					var txt = $(this).text();
					if(txt.length > 0 && node.nodeId)
					{
						node.sources.push(txt);				
					}
				});
			
				Graph.nodes.push(node);
			});
			$(ssdl).find("nodes node:first, nodes node:first ~ node").remove();
			
			var inputVariables = [],
				inputVariable;
			$(ssdl).find("inputVariables:first inputVariable").each(function(){
				inputVariable = {};
				inputVariable.name = $(this).find("name:first").text();
				inputVariable.value = $(this).find("value:first").text();
				inputVariable.type = $(this).find("type:first").text();
				
				inputVariables.push(inputVariable);
			});
			$(ssdl).find("inputVariables:first inputVariable").remove();	
			Graph.inputVariables = inputVariables;
			
			var nonFunctionalParameters = [],
				nonFunctionalProperty;
			$(ssdl).find("nonFunctionalParameters:first nonFunctionalProperty").each(function(){
				nonFunctionalProperty = {};
				nonFunctionalProperty.weight = $(this).find("weight:first").text();
				nonFunctionalProperty.unit = $(this).find("unit:first").text();
				nonFunctionalProperty.value = $(this).find("value:first").text();
				nonFunctionalProperty.relation = $(this).find("relation:first").text();
				nonFunctionalProperty.name = $(this).find("name:first").text();
				
				nonFunctionalParameters.push(nonFunctionalProperty);
			});
			$(ssdl).find("nonFunctionalParameters:first nonFunctionalProperty").remove();	
			Graph.nonFunctionalParameters = nonFunctionalParameters;
					
			// console.log(Graph)
			return Graph;
		}
	}

	return controlerObject;
}