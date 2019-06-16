const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

export const detectCollision = (player, coin) => {
	let distX = Math.abs(coin.x - player.x - player.width / 2);
	let distY = Math.abs(coin.y - player.y - player.height / 2);

	if (distX > player.width / 2 + 10) {
		return false;
	}
	if (distY > player.height / 2 + 10) {
		return false;
	}

	if (distX <= player.width / 2) {
		return true;
	}
	if (distY <= player.height / 2) {
		return true;
	}

	let dx = distX - player.width / 2;
	let dy = distY - player.height / 2;
	if (dx * dx + dy * dy <= 10 * 10) {
		return true;
	}
};
