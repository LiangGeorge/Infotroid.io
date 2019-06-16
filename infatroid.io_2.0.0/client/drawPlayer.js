const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

export const drawPlayer = (player) => {
  ctx.beginPath();
  ctx.rect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};
