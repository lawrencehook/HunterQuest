// Lawrence Hook

"use strict";

class Platform extends DisplayObjectContainer {
	constructor(x, y, width, height, color="#2f4d2f", parentObj=null) {
		super("platform", "", parentObj);
		this.position = new Point(x, y);
		this.width = width;
		this.height = height;
		this.fillColor = color;

		this.collidable = true;
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
}