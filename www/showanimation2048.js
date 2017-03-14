/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */

function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $("#number-cell-" + i + "-" + j);

  numberCell.css('background-color',getNumberBackgroundColor( randNumber ) );
  numberCell.css('color',getNumberColor( randNumber ) );
  numberCell.text( randNumber );

  numberCell.animate({
  	"height":"100px",
  	"width":"100px",
    "top":getPositionTop( i , j ) + "px",
    "left":getPositionLeft( i , j ) + "px"
  },50);
}



function  showMoveAnimation( forx , fory , tox , toy ){
  var numberCell = $("#number-cell-" + forx + "-" + fory);

  numberCell.animate({
    "top":getPositionTop( tox , toy ) + "px",
    "left":getPositionLeft( tox , toy ) + "px"
  },
    200
  );
}
