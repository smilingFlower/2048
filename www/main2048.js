/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

var board = new Array(); 
var score = 0; //游戏分数

$(function(){

	newGame();

});


function newGame(){
	//初始化棋盘格
	init();

	//随机生成两个数
	generateNumber();
	generateNumber();

}


function init(){

	//初始化每个格子的位置
	for (var i = 0; i < 4; i++) { //i 行
		for (var j = 0; j < 4; j++) { //j 列

			var gridCell = $("#grid-cell-" + i + "-" + j);

			gridCell.css({
				left:getPositonTop(i,j) + "px",
				top:getPositonLeft(i,j) + "px"
			});
			
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
    for( var j = 0 ; j < 4 ; j ++ ){
        board[i][j] = 0;
    }		
	}

	updateBoardView();

}


function  updateBoardView(){

	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {

			$(".game-container").append("<div class='number-cell' id='number-cell-"+ i + "-" + j +"'></div>");

			var numberCellID = $("#number-cell-"+ i + "-" + j);



			if ( board[i][j] === 0 ) {
				numberCellID.css({
					"display" : "none"
				})
			}else{

				numberCellID.css({
					"display" : "block",
					"left" : getPositonLeft(i,j) + "px",
					"top" : getPositonTop(i,j) + "px",
					"backgroundColor":getNumberBackgroundColor( board[i][j] ),
					"color":getNumberColor( board[i][j] ),
				})

				$("#number-cell-"+ i + "-" + j).text(getInitNumber());
			}//if结束

		}
	}//for结束

}

function generateNumber(){

	//如果没有位置就不再生成
	if (!isGenerateNumber()) {
		return
	}

	//位置
	var line = parseInt(Math.floor(Math.random() * 4));
	var column = parseInt(Math.floor(Math.random() * 4));

	while(!isGenerateNumber(line,column)){
		line = parseInt(Math.floor(Math.random() * 4));
		column = parseInt(Math.floor(Math.random() * 4));
	}

	board[line][column] = getInitNumber();

	updateBoardView();

	
}


function getInitNumber(){
	// var num = parseInt(Math.random() * 2) == 2 ? num = 2 : num = 4;
	return 2;
}

function isGenerateNumber(i,j){
	var isGenerateNumber;

	if (typeof i !== "undefined") {
		return board[i][j] == 0 ? isGenerateNumber = true : isGenerateNumber = false;
	}

	for (var i = 0; i < 4; i++) {
	    for( var j = 0 ; j < 4 ; j ++ ){
	    	if (board[i][j] == 0) {
	    		isGenerateNumber = true;
	    		break;
	    	}
	    }		
	}	

	return isGenerateNumber ? true : false;
}
