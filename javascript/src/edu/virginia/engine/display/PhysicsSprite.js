// Lawrence Hook

"use strict";

class PhysicsSprite extends AnimatedSprite {
	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);

		this.jumped = false;
		this.gmr = 1.3;
		this.vx = 0;
		this.vy = 0;
		this.jumpSpeed = 21;
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		if (!(this.block.down || this.block.platformDown)) {
			this.vy += this.gmr;	
		} else {
			this.vy = 0;
			this.jumped = this.vy == 0 ? false : this.jumped;
		}

		this.position.x += this.vx;

		// Check for platforms
		var tempY = this.getFeet().y + this.vy,
			platforms = Game.getInstance().platforms,
			collided = false;
		for (var i = 0; i < platforms.length; i++) {
			// If yPos is equal or less NOW, and LATER will be greater than a platform && xPos is intersecting, then on a platform
			// If on a platform, don't move down
			if (this.xCollides(platforms[i]) &&
				this.getFeet().y <= platforms[i].position.y && tempY > platforms[i].position.y) {
					collided = true;
					this.jumped = false;
					this.position.y = platforms[i].position.y - this.getUnscaledHeight();
					this.vy = 0;

					this.eventDispatcher.dispatchEvent("collide");
			}
		}
		if (!collided) {
			this.position.y += this.vy;
		}

		// Check for projectiles
		var projectiles = Game.getInstance().projectiles;

		for (var i = projectiles.length-1; i >= 0; i--) {
			if (this.xCollides(projectiles[i]) && this.yCollides(projectiles[i])) {
				// THROW EVENTS (UPDATE HP), DESTROY PROJECTILE
			}
		}

	}

	updateCharacter(pressedKeys) {
		// left
		if (pressedKeys.indexOf(37) != -1 && !this.block.left) {
			this.position.x -= this.speed;
			this.movingLeft = true;
		} else {
			this.movingLeft = false;
		}
		// up
		if (pressedKeys.indexOf(38) != -1 && !this.block.up && !this.jumped) {
			this.jumped = true;
			this.vy = -this.jumpSpeed;
			this.movingUp = true;
			SoundManager.getInstance().playSound("jump");
		} else {
			this.movingUp = false;
		}
		// right
		if (pressedKeys.indexOf(39) != -1 && !this.block.right) {
			this.position.x += this.speed;
			this.movingRight = true;
		} else {
			this.movingRight = false;
		}
		// down
		if (pressedKeys.indexOf(40) != -1) {
			this.movingDown = true;
			this.crouched = true;
		} else {
			this.movingDown = false;
			this.crouched = false;
		}

		this.moving = this.movingDown || this.movingRight || this.movingUp || this.movingLeft;
	}

	getFeet() {
		return {
			x : this.position.x,
			y : this.position.y + this.getUnscaledHeight(),
			width : this.getUnscaledWidth,
			height : 1
		};
	}

	xCollides(other) {
		return (this.position.x + this.getUnscaledWidth() >= other.position.x &&
			this.position.x < other.position.x + other.getUnscaledWidth());
	}

	yCollides(other) {
		return (this.position.y + this.getUnscaledWidth() >= other.position.y &&
			this.position.y < other.position.y + other.getUnscaledWidth());
	}
}