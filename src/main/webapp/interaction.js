"use strict";

function SetUpInteraction(element){
	element.addEventListener("mousedown", MouseDown, false);
	element.addEventListener("mousemove", MouseMove, false);
	element.addEventListener("mouseup", MouseUp, false);
}

var originalPiece;
function MouseDown(e){
	var x = e.x - boardLocation.X;
    var y = e.y - boardLocation.Y;

	for(var i = 0; i < tiles.length; i++){	
		if(x > tiles[i].X && x < (tiles[i].X+ tiles[i].Size) && y > tiles[i].Y && y < (tiles[i].Y + tiles[i].Size)){	
			if(tiles[i].Piece == null) return;
			activePiece = tiles[i];
			originalPiece = new Tile(activePiece.X, activePiece.Y, activePiece.Size, activePiece.Position, activePiece.Owner, activePiece.Piece);
			return;
		}		
	}
}

var dispX, dispY;
function MouseMove(e){
	canvas.style.cursor = "pointer";
	
	if(activePiece == null) return;	

	var x = e.x - boardLocation.X;
	var y = e.y - boardLocation.Y;
	
	if(!dispX && !dispY){
		dispX = x - activePiece.X;
		dispY = y - activePiece.Y;
	}
	
	activePiece.X = x - dispX;
	activePiece.Y = y - dispY;
	refreshPieces();
}

function MouseUp(e){
	if(!activePiece) return;
	
	var x = activePiece.X + activePiece.Size / 2;
	var y = activePiece.Y + activePiece.Size / 2;
	
	var validMove = true;
    for(var i = 0; i < tiles.length; i++){	
		if(x >= tiles[i].X && x <= (tiles[i].X+ tiles[i].Size) && y >= tiles[i].Y && y <= (tiles[i].Y + tiles[i].Size)){	
			if(activePiece == tiles[i]) continue;
/*			activePiece.X = tiles[i].X;
			activePiece.Y = tiles[i].Y;
			activePiece.Position = tiles[i].Position;*/
			 validMove = getValidMove(tiles[i], originalPiece);
			 if(validMove){
				 movePiece(activePiece.Position, tiles[i].Position);
				 tiles[i].Piece = activePiece.Piece;
				 tiles[i].Owner = activePiece.Owner;
				 activePiece.Piece = null;
				 activePiece.Owner = null;
			}
			
			break;
		}		
	}
    
	activePiece.X = originalPiece.X;
	activePiece.Y = originalPiece.Y;
	
	dispX = 0;
    dispY = 0;
    
    activePiece = null;
    
    if(validMove){
    	switchTurns(); 	
    	if(isInCheck())
    		toggleInCheck();
    	if(isGameOver()){
    		checkMateAlert();
    		newGame();
    		draw();	
    		resetTime();
    	}
    }
     
    refreshPieces();
}
