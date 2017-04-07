// Steven Wang

"use strict";

class Projectile extends DisplayObjectContainer {
	constructor(x, y, width, height, vx, vy, damage, color="#2f4d2f", friendly, parentObj=null) {
		super("projectile", "", parentObj);
		this.position = new Point(x, y);
		this.width = width;
		this.height = height;
		this.vx = vx;
		this.vy = vy;
		this.damage = damage;
		this.fillColor = color;

		this.collidable = true;

		this.lifetime = 9999; //Decreases by 1 per frame

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
		this.position.x += this.vx;
		this.position.y += this.vy;
		if(this.isOffscreen()) this.destroy();
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
		return (this.position.x < 0 || this.position.x > Game.getInstance().gamescreen.width) || (this.position.y < 0 || this.position.y > Game.getInstance().gamescreen.width);
	}

	destroy() {
		Game.getInstance().projectiles.remove(this);
		if (this.parent) this.parent.removeChild(this);
	}
}