/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

var board = new Array(); //游戏数据
var score = 0; //游戏分数
var hasSuperposition = new Array(); 

var startX,
		startY,
		endX,
		endY;

$(function(){

	prepareForMobile();

	newGame();

});

function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}

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
				left:getPositionLeft(i,j) + "px",
				top:getPositionTop(i,j) + "px"
			});
			
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasSuperposition[i] = new Array();
    for( var j = 0 ; j < 4 ; j ++ ){
        board[i][j] = 0;
        hasSuperposition[i][j] = false;
    }		
	}

	updateBoardView();

	score = 0;
}


function  updateBoardView(){

	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {

			$("#grid-container").append("<div class='number-cell' id='number-cell-"+ i + "-" + j +"'></div>");

			var numberCellID = $("#number-cell-"+ i + "-" + j);



			if ( board[i][j] === 0 ) {
				numberCellID.css({
					"width":0,
					"height":0,
					"left" : getPositionLeft(i,j) + cellSideLength/2 + "px",
					"top" : getPositionTop(i,j) + cellSideLength/2 + "px",					
				})
			}else{

				numberCellID.css({
					"height":cellSideLength + "px",
					"width":cellSideLength + "px",
					"left" : getPositionLeft(i,j) + "px",
					"top" : getPositionTop(i,j) + "px",
					"backgroundColor":getNumberBackgroundColor( board[i][j] ),
					"color":getNumberColor( board[i][j] ),
				})

				numberCellID.text( board[i][j] );

			}//if结束

			hasSuperposition[i][j] = false;

		}
	}//for结束

  $('.number-cell').css('line-height',cellSideLength+'px');
  $('.number-cell').css('font-size',0.4*cellSideLength+'px');	
}

function generateOneNumber(){

	//如果没有位置就不再生成
	if (nospace(board)) return;

  //随机一个位置
  var randx = parseInt( Math.floor( Math.random()  * 4 ) );
  var randy = parseInt( Math.floor( Math.random()  * 4 ) );


  var times = 0;

	while(times < 50){
		if (board[randx][randy] == 0) break;

  	randx = parseInt( Math.floor( Math.random()  * 4 ) );
  	randy = parseInt( Math.floor( Math.random()  * 4 ) );

  	times++;
	}

	if (times >= 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {

				if (board[i][j] == 0) {
					randx = i;
					randy = j;
				}

			}
		}
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
						
						}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , k , j , board ) && !hasSuperposition[i][k]){
							//move
							showMoveAnimation( i , j , i , k );
							board[i][k] += board[i][j];
							board[i][j] = 0;

							score += board[i][k];
							updateScore(score);

							hasSuperposition[i][k] = true;

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
			for (var j = 2 ; j >= 0 ; j --) {

				if (board[i][j] != 0){

					for (var k = 3; k > j; k--) {		
						if ( board[i][k] == 0 && noBlockHorizontal( i , j , k , board ) ) {

							showMoveAnimation( i , j , i , k );
							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[i][k] == board[i][j] && noBlockHorizontal( i , j , k , board ) && !hasSuperposition[i][k] ){
							//move
							showMoveAnimation( i , j , i , k );
							board[i][k] += board[i][j];
							board[i][j] = 0;

							score += board[i][k];
							updateScore(score);

							hasSuperposition[i][k] = true;

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


function moveUp(){
	if (!canMoveUp(board)) return false;

		for (var j = 0; j < 4; j++) {
			for (var i = 1; i < 4; i++) { 

				if (board[i][j] != 0){

					for (var k = 0; k < i; k++) {	
						if ( board[k][j] == 0 && noBlockVertical(j , k , i , board ) ) {

							showMoveAnimation( i , j , k , j );
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[k][j] == board[i][j] && noBlockVertical(j , k , i, board ) && !hasSuperposition[k][j]){
							//move
							showMoveAnimation( i , j , k , j );
							board[k][j] += board[i][j];
							board[i][j] = 0;
						
							score += board[i][k];
							updateScore(score);

							hasSuperposition[k][j] = true;

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

		for (var j = 0; j < 4; j++) {
			for (var i = 2 ; i >= 0 ; i --) { 

				if (board[i][j] != 0){

					for (var k = 3; k > i; k--) {	
						if ( board[k][j] == 0 && noBlockVertical(j , i , k , board ) ) {

							showMoveAnimation( i , j , k , j );
							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						
						}else if( board[k][j] == board[i][j] && noBlockVertical(j , i , k, board ) && !hasSuperposition[k][j]){
							//move
							showMoveAnimation( i , j , k , j );
							board[k][j] += board[i][j];
							board[i][j] = 0;

							score += board[i][k];
							updateScore(score);

							hasSuperposition[k][j] = true;

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
			event.preventDefault();
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38: //top
			event.preventDefault();
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}		
			break;
		case 39: //right
			event.preventDefault();
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}		
			break;			
		case 40: //向下
			event.preventDefault();
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}		
			break;			
		default:
			break;
	}
})


document.addEventListener("touchstart",function(event){
	event.preventDefault();

	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;

})


document.addEventListener("touchend",function(event){
	event.preventDefault();
	
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var deltaX = endX - startX;
	var deltaY = endY - startY;

	if( Math.abs( deltaX ) < 0.3*documentWidth && Math.abs( deltaY ) < 0.3*documentWidth )
        return;

	//x
	if (Math.abs(deltaX) >= Math.abs(deltaY)) {
		//move right
		if (deltaX > 0) {
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
		//move left
		else{
			if (moveLeft()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}

	//y
	else{
		//move up
		if (deltaY < 0) {
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}	
		}
		//move down
		else{
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}	
		}
	}

})
