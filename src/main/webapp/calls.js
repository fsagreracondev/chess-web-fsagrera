"use strict";

function getGameState(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8081/api/chess", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

function getValidMove(tile, orgTile){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "http://localhost:8081/api/chess/moves", false);
	xmlHttp.send(null);
	
	var moves = JSON.parse(xmlHttp.responseText);
	var currentPosition = tile.Position;
	var previousPosition =  orgTile.Position;
	
	for(var i = 0; i < moves.length; i++){
		if(moves[i]["origin"] == previousPosition &&
		   moves[i]["destination"] == currentPosition){
			return true;
		}	
	}
	
	return false;
}

function movePiece(origin, destination){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "http://localhost:8081/api/chess/moves", true);
	xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xmlHttp.send(JSON.stringify({
		"origin": origin, 
		"destination": destination
		}));
}

function isInCheck(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8081/api/chess", false);
    xmlHttp.send(null);

    return JSON.parse(xmlHttp.responseText).inCheck;
}

function isGameOver(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8081/api/chess", false);
    xmlHttp.send(null);

    return JSON.parse(xmlHttp.responseText).gameOver;
}

function newGame(){
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/api/chess", false);
    xmlHttp.send(null);
    return;
}