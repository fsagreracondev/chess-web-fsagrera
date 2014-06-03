"use strict";

var boardLocation = null;
var tiles = new Array();
var activePiece = null;
var canvas = null;
var ctx = null;
var currentPlayer= null;

function Location (x, y, size) {
	this.X = x;
	this.Y = y;
	this.Size = size;
}

function Tile(x, y, size, position, owner, piece){
	this.X = x;
	this.Y = y;
	this.Size = size;
	this.Position = position;
	this.Owner = owner;
	this.Piece = piece;
}

function draw(){
	var width = $("#chessBoard").width();
	$("#chessBoard").height(width);
	
	canvas = document.getElementById("chessBoard");
	ctx = canvas.getContext("2d");
	
	SetUpInteraction(canvas);
	resetCanvas(width);
	drawBoard(width);

	var pos = canvas.getBoundingClientRect();
	boardLocation = new Location(pos.left, pos.top, width);
	
	loadPieces();
	
    var gameState = getGameState();
	currentPlayer = gameState.currentPlayer;
	togglePlayers();
}

function drawBoard(width){
	var tileSize = width/8;
	var isBlack = false;
	var color;
	for(var i = 0; i < 8; i++){
		for(var j = 0; j <8; j++){
			if(isBlack) color = "#428bca";
			else 
				color = "#FFFFFF";
			drawTile(tileSize * j, tileSize * i, tileSize, color);	
			isBlack = !isBlack;
		}	
		
		isBlack = !isBlack;
	}
}

function drawTile(x, y, size, color){
	ctx.fillStyle = color;
	ctx.fillRect(x, y, size, size);
}

function resetCanvas(size){
	canvas.width = size;
	canvas.height = size;
	
	ctx.clearRect(0, 0, size, size);
}

function tileHasPiece(row, col, tileLocations){
	for(var x in tileLocations){
		var position = positionToRowCol(x);
		if(row == position.row && col == position.col){
			tileLocations[x].position = x;
			return tileLocations[x];
		}
	}
	
	return null;
}

function positionToRowCol(position){
	var row = position.substr(0,1).charCodeAt(0) - 97;
	var col = 8 - Number(position.substr(1,1));
	
	var piece = new Object();
	piece.row = row;
	piece.col = col;
	
	return piece;
}

function rowColToPostion(row, col){
	var charRow = String.fromCharCode(97 + row);
	var reverseCol = 8 - col;
	
	return charRow + reverseCol;
}

function drawPiecesWithInfo(tileLocations){
	var owner = null;
	var piece = null;
	var position = null;
	var width = boardLocation.Size / 8;
	
	tiles = new Array();
	
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var gamePiece = tileHasPiece(j, i, tileLocations);		
			if(gamePiece){
				owner = gamePiece["owner"];
				piece = gamePiece["type"];	
				position = gamePiece["position"];
			} else {
				owner = null;
				piece = null;
				position = rowColToPostion(j, i);
			}
					
			var tile = new Tile(width * j, width * i, width, position, owner, piece);
			drawPiece(tile);
			tiles.push(tile);
		}	
	}
}

function refreshPieces(){
	if(tiles.length < 1) return;
	
	resetCanvas(canvas.width);
	drawBoard(canvas.width);
	
	for(var i = 0; i < tiles.length; i++)
		drawPiece(tiles[i]);
}

function switchTurns(){
	if(currentPlayer == "White"){
		currentPlayer = "Black";
		
	} else {
		currentPlayer = "White";
	}
	
	togglePlayers();
}

function togglePlayers(){
	if(currentPlayer == "Black"){
		$("#whiteMate").hide();
		$("#blackMate").fadeIn("slow");
		
	} else {
		$("#blackMate").hide();
		$("#whiteMate").fadeIn("slow");
	}
}

function toggleInCheck(){
	alert(currentPlayer + "is in check");
}