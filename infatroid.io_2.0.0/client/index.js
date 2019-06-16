const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const socket = io();
let id = '';

import { keyDownHandler, keyUpHandler, playerMovement } from './playerMovement';
import { drawPlayer } from './drawPlayer';
import { drawCoin } from './drawCoin';
import { detectCollision } from './detectCollision';
import { drawScore } from './drawScore'

socket.emit('newPlayer');
socket.on('playerId', (playerId) => {
	id = playerId;
});
socket.on('state', (gameState) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let player in gameState.players) {
		drawPlayer(gameState.players[player]);
	}
	if (gameState.players[id] && detectCollision(gameState.players[id], gameState.coin)) {
		socket.emit('collision');
	}
  drawCoin(gameState.coin);
  drawScore(gameState.players)
});

setInterval(() => {
	socket.emit('playerMovement', playerMovement);
}, 1000 / 60);

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
