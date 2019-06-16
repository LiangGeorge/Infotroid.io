export const playerMovement = {
	up: false,
	down: false,
	left: false,
	right: false
};


export const keyDownHandler = (e) => {
	if (e.keyCode == 39) {
		playerMovement.right = true;
	} else if (e.keyCode == 37) {
		playerMovement.left = true;
	} else if (e.keyCode == 38) {
		playerMovement.up = true;
	} else if (e.keyCode == 40) {
		playerMovement.down = true;
  }
};

export const keyUpHandler = (e) => {
	if (e.keyCode == 39) {
		playerMovement.right = false;
	} else if (e.keyCode == 37) {
		playerMovement.left = false;
	} else if (e.keyCode == 38) {
		playerMovement.up = false;
	} else if (e.keyCode == 40) {
		playerMovement.down = false;
  }
};

