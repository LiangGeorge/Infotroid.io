const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

export const drawCoin = (coin) => {
  ctx.beginPath();
	ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
	ctx.fillStyle = 'gold';
	ctx.fill();
	ctx.closePath();
};
