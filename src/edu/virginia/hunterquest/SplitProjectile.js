// Jon Ting

"use strict";

class SplitProjectile extends DisplayObjectContainer {
	constructor(x, y, width, height, vx, vy, damage, color="#2f4d2f", friendly, tracking=0) {
		super("splitprojectile", "", Game.getInstance().gamescreen);
		this.position = new Point(x, y);
		this.width = width;
		this.height = height;
		this.vx = vx;
		this.vy = vy;
		this.damage = damage;
		this.fillColor = color;
		this.tracking = tracking;

		this.collidable = true;

		this.lifetime = 9999; //Decreases by 1 per frame

		this.splitTimer = 10;

		this.isFriendly = friendly;

		Game.getInstance().projectiles.add(this);
		/*Game.getInstance().projectiles.contents.forEach(function(p) {
			console.log(p);
		})*/
	}

	getVx() {
		return this.vx;
	}

	getVy() {
		return this.vy;
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.lifetime -= 1;
		if(this.lifetime < 0) {
			this.destroy();
		}

		if(this.splitTimer <= 0) {
			var vx, vy, angle=Math.PI/6;
			vx = 20;
			vy = 20;
			if(this.vx === 0) {
				vy = 0;
			} else {
				vx = 0;
			}
			new Projectile(this.position.x, this.position.y, this.width, this.height, -vx, -vy, this.damage, this.color, true);
			new Projectile(this.position.x, this.position.y, this.width, this.height, vx, vy, this.damage, this.color, true);
			this.destroy();
		} else {
			this.splitTimer -= 1;
		}

		if(this.isOffscreen()) this.destroy();

		if(this.tracking != 0) {
			var speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
			var thisPos = this.getHitboxCenter();
			var playerPos = Character.getInstance().getHitboxCenter();

			var vectorAngle = Math.atan2(playerPos.y - thisPos.y, playerPos.x - thisPos.x);
			var vectorX = speed * Math.cos(vectorAngle) * this.tracking;
			var vectorY = speed * Math.sin(vectorAngle) * this.tracking;

			var newAngle = Math.atan2(this.vy + vectorY, this.vx + vectorX);
			this.vx = speed * Math.cos(newAngle);
			this.vy = speed * Math.sin(newAngle);
		}

		this.position.x += this.vx;
		this.position.y += this.vy;
	}

	draw(context) {
		this.applyTransformations(context);
		context.beginPath();
		context.rect(0, 0, this.width, this.height);
		
		context.fillStyle = this.fillColor;
		context.fill();
		
		context.strokeStyle = this.fillColor;
		context.stroke();
		this.reverseTransformations(context);
	}

	applyTransformations(context) {
		context.save();
		context.translate(...this.position.toA());
	}

	reverseTransformations(context) {
		context.restore();
	}

	getUnscaledWidth() {
		return this.width;
	}
	getUnscaledHeight() {
		return this.height;
	}

	isOffscreen() {
		return (this.position.x < 0 || this.position.x > Game.getInstance().gamescreen.width || this.position.y < 0 || this.position.y > Game.getInstance().gamescreen.height);
	}

	destroy() {
		Game.getInstance().projectiles.remove(this);
		if (this.parent) this.parent.removeChild(this);
	}
}