const canvas = document.getElementById('scoreBoard');
const ctx = canvas.getContext('2d');

export const drawScore = (players) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Scoreboard ", 8, 20)
  let i = 40
  for (let x in players) {
    ctx.fillText(`${players[x].name}:  ${players[x].score}`, 8, i)
    i+=20
  }
}
