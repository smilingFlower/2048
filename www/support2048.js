/**
 * Created by liuyubobobo on 14-4-11.
 * my site: http://www.liuyubobobo.com
 */


function getPositonTop( i , j ){
    return 20 + i*120;
}

function getPositonLeft( i , j ){
    return 20 + j*120;
}

function getNumberBackgroundColor(number){
 switch( number ){
			  case 2:return "#eee4da";break;
			  case 4:return "#ede0c8";break;
			  case 8:return "#f2b179";break;
			  case 16:return "#f59563";break;
			  case 32:return "#f67c5f";break;
			  case 64:return "#f65e3b";break;
			  case 128:return "#edcf72";break;
			  case 256:return "#edcc61";break;
			  case 512:return "#9c0";break;
			  case 1024:return "#33b5e5";break;
			  case 2048:return "#09c";break;
			  case 4096:return "#a6c";break;
			  case 8192:return "#93c";break;
			  default:return "black";

  }

	// switch(number){
	// 	case 2:
	// 		return "#fd9400";
	// 		break;
	// 	case 4:
	// 		return "#fd0c00";
	// 		break;			
	// 	case 8:
	// 		return "#0024ff";
	// 		break;			
	// 	case 16:
	// 		return "#f600ff";
	// 		break;			
	// 	case 32:
	// 		return "#00fff0";
	// 		break;			
	// 	case 64:
	// 		return "#6a005f";
	// 		break;			
	// 	case 128:
	// 		return "#36ff00";
	// 		break;	
	// 	case 256:
	// 		return "#ab6400";
	// 		break;			
	// 	case 512:
	// 		return "#00ab5d";
	// 		break;			
	// 	default:		
	// 		return "#ff5400";
	// }
}

function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}


function nospace(board){
	for (var i = 0; i < 4; i++) {
	    for( var j = 0 ; j < 4 ; j ++ ){
	    	if (board[i][j] == 0) {
	    		return false;
	    	}
	    }		
	}	

	return true;
}

function canMoveLeft(){
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {

			if (board[i][j] != 0) {
				if ( board[i][j-1] == 0 || (board[i][j-1] == board[i][j]) ) {
					return true;
				}
			}

		}
	}

	return false;
}

function noBlockHorizontal(row , col1 , col2 , board){
	for (var i = col1 + 1; i < col2; i++) {
		if ( board[row][i] == 0) {
			return false
		}
	}

	return true;
}

