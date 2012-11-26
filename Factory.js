var Factory = function Factor(){
	var constructors = {
		modelNode : function modelNode(){
		},
		viewNode : function viewNode(){
		},
		CFEdge : function CFEdge() {
		},
		DFEdge : function DFEdge (){

		}
	}

	return {
		facilitate : function facilitate(type){
			if( typeof constructors[type] !==  "function" ){

			} else {
				
			}
		}
	}
};