// Lawrence Hook

"use strict";

class Character extends AnimatedSprite {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);


	}

	updateCharacter(pressedKeys) {
		// left
		if (pressedKeys.indexOf(65) != -1 && !this.block.left) {
			this.position.x -= this.speed;
			this.movingLeft = true;
		} else {
			this.movingLeft = false;
		}
		// up
		if (pressedKeys.indexOf(87) != -1 && !this.block.up) {
			this.position.y -= this.speed;
			this.movingUp = true;
		} else {
			this.movingUp = false;
		}
		// right
		if (pressedKeys.indexOf(68) != -1 && !this.block.right) {
			this.position.x += this.speed;
			this.movingRight = true;
		} else {
			this.movingRight = false;
		}
		// down
		if (pressedKeys.indexOf(83) != -1 && !this.block.down) {
			this.position.y += this.speed;
			this.movingDown = true;
		} else {
			this.movingDown = false;
		}

		this.moving = this.movingDown || this.movingRight || this.movingUp || this.movingLeft;

		// Left projectile
		if (pressedKeys.indexOf(37) != -1) {
			console.log("shoot left");
		}
		// Up projectile
		if (pressedKeys.indexOf(38) != -1) {
			console.log("shoot up");
		}
		// Right projectile
		if (pressedKeys.indexOf(39) != -1) {
			console.log("shoot right");
		}
		// Down projectile
		if (pressedKeys.indexOf(40) != -1) {
			console.log("shoot down");
		}
	}

	checkBounds() {
		if (this.position.x <= 0) {
			this.block.left = true;
			this.position.x = 0;
		} else {
			this.block.left = false;
		}
		if (this.position.x >= this.xBound - this.getUnscaledWidth()) {
			this.block.right = true;
			this.position.x = this.xBound - this.getUnscaledWidth();
		} else {
			this.block.right = false;
		}
		if (this.position.y <= 0) {
			this.block.up = true;
			this.position.y = 0;
		} else {
			this.block.up = false;
		}
		if (this.position.y >= this.yBound - this.getUnscaledHeight()) {
			this.block.down = true;
			this.position.y = this.yBound - this.getUnscaledHeight();
			this.jumped = false;
		} else {
			this.block.down = false;
		}
	}

}