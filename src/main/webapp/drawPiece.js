"use strict";

var chessPieces = new Array();
var images = [
["B-b", "images/chessPieces/B-b.png"],
["B-k", "images/chessPieces/B-k.png"],
["B-n", "images/chessPieces/B-n.png"],
["B-p", "images/chessPieces/B-p.png"],
["B-q", "images/chessPieces/B-q.png"],
["B-r", "images/chessPieces/B-r.png"],
["W-b", "images/chessPieces/W-b.png"],
["W-k", "images/chessPieces/W-k.png"],
["W-n", "images/chessPieces/W-n.png"],
["W-p", "images/chessPieces/W-p.png"],
["W-q", "images/chessPieces/W-q.png"],
["W-r", "images/chessPieces/W-r.png"]
];

function loadPieces(){
	for(var i = 0; i <images.length; i++){
		var piece = new Image();
		piece.src= images[i][1];
		chessPieces[images[i][0]]= piece;
		if(i == images.length - 1){
			piece.onload = function(){
				var gameState = getGameState();
				drawPiecesWithInfo(gameState.positionToPieces);
			};
		}
	}
}

function drawPiece(tile){
	var piece = tile.Piece;
	if(!piece) return;
	
	var color = "B";
	if(tile.Owner == "White") color = "W";

   ctx.drawImage(chessPieces[color + "-" + piece], tile.X, tile.Y, tile.Size, tile.Size);	
}