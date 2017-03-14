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
	generateOneNumber();
	generateOneNumber();
}


function init(){

	//初始化每个格子的位置
	for (var i = 0; i < 4; i++) { //i 行
		for (var j = 0; j < 4; j++) { //j 列

			var gridCell = $("#grid-cell-" + i + "-" + j);

			gridCell.css({
				left:getPositionTop(i,j) + "px",
				top:getPositionLeft(i,j) + "px"
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
					"width":0,
					"height":0,
					"left" : getPositionLeft(i,j) + 50 + "px",
					"top" : getPositionTop(i,j) + 50 + "px",					
				})
			}else{

				numberCellID.css({
					"height":"100px",
					"width":"100px",
					"left" : getPositionLeft(i,j) + "px",
					"top" : getPositionTop(i,j) + "px",
					"backgroundColor":getNumberBackgroundColor( board[i][j] ),
					"color":getNumberColor( board[i][j] ),
				})

				numberCellID.text( board[i][j] );

			}//if结束

		}
	}//for结束
}

function generateOneNumber(){

	//如果没有位置就不再生成
	if (nospace(board)) return;

  //随机一个位置
  var randx = parseInt( Math.floor( Math.random()  * 4 ) );
  var randy = parseInt( Math.floor( Math.random()  * 4 ) );

	while(true){
		if (board[randx][randy] == 0) break;

  	randx = parseInt( Math.floor( Math.random()  * 4 ) );
  	randy = parseInt( Math.floor( Math.random()  * 4 ) );
	}

	//随机一个数字
  var randNumber = Math.random() < 0.5 ? 2 : 4;

	//在随机位置显示随机数字
  board[randx][randy] = randNumber;  

  showNumberWithAnimation( randx , randy , randNumber );

	return true;	
}

function moveLeft(){
	if (!canMoveLeft(board)) return false;

	for (var i = 0; i < 4; i++) {
			for (var j = 1; j < 4; j++) {

				if (board[i][j] != 0){

					for (var k = 0; k < j; k++) {		
						if ( board[i][k] == 0 && noBlockHorizontal( i , k , j , board ) ) {

							showMoveAnimation( i , j , i , k );
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) ){
							//move
							showMoveAnimation( i , j , i , k );
							board[i][k] += board[i][j];
							board[i][j] = 0;
							//叠加
							continue;

						}//if结束
					}
				}


			}
		}	//for i 结束

	setTimeout("updateBoardView()",200);

	return true;
}

function moveRight(){
	if (!canMoveRight(board)) return false;

	for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 3; j++) {

				if (board[i][j] != 0){

					for (var k = 3; k > j; k--) {		
						if ( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ) {

							showMoveAnimation( i , j , i , k );
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) ){
							//move
							showMoveAnimation( i , j , i , k );
							board[i][k] += board[i][j];
							board[i][j] = 0;
							//叠加
							continue;

						}//if结束
					}
				}


			}
		}	//for i 结束

	setTimeout("updateBoardView()",200);

	return true;
}


function moveTop(){
	if (!canMoveTop(board)) return false;

	for (var i = 1; i < 4; i++) { 
			for (var j = 0; j < 4; j++) {

				if (board[i][j] != 0){

					for (var k = 0; k < i; k++) {	
						if ( board[k][j] == 0 && noBlockVertical(j , k , i , board ) ) {

							showMoveAnimation( i , j , k , j );
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[k][j] == board[i][j] && noBlockVertical(j , k , i, board ) ){
							//move
							showMoveAnimation( i , j , k , j );
							board[k][j] += board[i][j];
							board[i][j] = 0;
							//叠加
							continue;

						}//if结束
					}
				}


			}
		}	//for i 结束

	setTimeout("updateBoardView()",200);

	return true;
}


function moveDown(){
	if (!canMoveDown(board)) return false;

	for (var i = 1; i < 4; i++) {
			for (var j = 0; j < 4; j++) {

				if (board[i][j] != 0){

					for (var k = 3; k > i; k--) {	
						if ( board[k][j] == 0 && noBlockVertical(j , i , k , board ) ) {

							showMoveAnimation( i , j , k , j );
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[k][j] == board[i][j] && noBlockVertical(j , i , k, board ) ){
							//move
							showMoveAnimation( i , j , k , j );
							board[k][j] += board[i][j];
							board[i][j] = 0;
							//叠加
							continue;

						}//if结束
					}
				}


			}
		}	//for i 结束

	setTimeout("updateBoardView()",200);

	return true;
}

function isGameOver(){
	if (nospace(board) && nomove(board)) {
		gameOver();
	}
}

function gameOver(){
	alert("游戏结束");
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37: //left
			if (moveLeft()) {
				generateOneNumber();
				isGameOver();
			}
			break;
		case 38: //top
			if (moveTop()) {
				generateOneNumber();
				isGameOver();
			}		
			break;
		case 39: //right
			if (moveRight()) {
				generateOneNumber();
				isGameOver();
			}		
			break;			
		case 40: //向下
			if (moveDown()) {
				generateOneNumber();
				isGameOver();
			}		
			break;			
		default:
			return
	}
})
