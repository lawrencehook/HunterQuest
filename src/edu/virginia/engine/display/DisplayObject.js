"use strict";

/**
 * A very basic display object for a javascript based gaming engine
 * 
 * */
class DisplayObject {
// class DisplayObject extends EventDispatcher {
	
	constructor(id, filename, parentObj=null) {
		// super();
		this.id = id;
		this.parent = parentObj;
		if (this.parent) {
			this.parent.addChild(this);
		}
		this.loaded = false;
		if (filename) {
			this.loadImage(filename);
		}

		this.speed = 10;
		this.angularSpeed = 0.01;
		this.scaleSpeed = 0.1;
		this.alphaSpeed = 0.01;
		this.pivotSpeed = 1;

		// lab2 fields
		this.visible = true;
		this.visibilityChanged = false;

		this.position = new Point(5, 5);
		this.pivotPoint = new Point(0, 0);
		this.scaleX = 1;
		this.scaleY = 1;
		this.angle = 0;
		this.alpha = 1;

		this.saveState = new Transform();
		this.pivotState = new Transform();
		this.pivotChanged = false;

		// Bounding
		this.xBound;
		this.yBound;
		this.block = {
			up : false,
			down : false,
			platformDown : false,
			left : false,
			right : false
		}

		this.moving = false;

		// lab3 fields
		this.ischaracter = false;
		this.defaultPosition;
		this.ellipseOffset;

		// lab4 fields
		this.movingLeft = false;
		this.movingRight = false;
		this.movingUp = false;
		this.movingDown = false;
		this.centered = false;

		this.eventDispatcher = new EventDispatcher();

		// lab5 fields
		this.flip = false;
		this.flipped = false;
		this.obstacle = true;
	}

	/**
	 * Loads the image, sets a flag called 'loaded' when the image is ready to be drawn
	 */
	loadImage(filename) {
		// console.log("load " + filename);
		var t = this;
		this.displayImage = new Image();
  		this.displayImage.onload = function(){
  			t.loaded = true;
  		};
  		this.displayImage.src = 'resources/' + filename;
	}

	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys) {
		this.angle = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.moving = false;

		if (this.ischaracter) {
			this.checkBounds();
			this.updateCharacter(pressedKeys);
		}

		if (!this.centered) {
			this.centerPivotPoint();
		}

		this.saveState.setTransform(1, 0, 0, 1, ...this.position.toA());

		this.saveState.multiply(this.pivotState);
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
		if (pressedKeys.indexOf(38) != -1 && !this.block.up) {
			this.position.y -= this.speed;
			this.movingUp = true;
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
		if (pressedKeys.indexOf(40) != -1 && !this.block.down) {
			this.position.y += this.speed;
			this.movingDown = true;
		} else {
			this.movingDown = false;
		}

		this.moving = this.movingDown || this.movingRight || this.movingUp || this.movingLeft;
	}

	resetState() {
		this.pivotState.reset();
		this.alpha = 1; 
		this.visible = true;
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
		// if (this.position.y <= 0) {
		// 	this.block.up = true;
		// 	this.position.y = 0;
		// } else {
		// 	this.block.up = false;
		// }
		// if (this.position.y >= this.yBound - this.getUnscaledHeight()) {
		// 	this.block.down = true;
		// 	this.position.y = this.yBound - this.getUnscaledHeight();
		// 	this.jumped = false;
		// 	this.vy = 0;
		// 	console.log("hi");
		// } else {
		// 	this.block.down = false;
		// }
	}

	/**
	 * Draws this image to the screen
	 */
	draw(context) {
		if(this.displayImage && this.visible) {
			this.applyTransformations(context);
			if(this.loaded) context.drawImage(this.displayImage, 0, 0);
			this.reverseTransformations(context);
		}
	}

	/**
	 * Applies transformations for this display object to the given graphics
	 * object
	 * */
	applyTransformations(context) {
		context.save();
		context.transform(...this.saveState.m);
		context.globalAlpha = this.alpha;
	}

	/**
	 * Reverses transformations for this display object to the given graphics
	 * object
	 * */
	reverseTransformations(context) {
		context.restore();
	}

	/*
	 * This area contains mostly getters and setters
	 */
	setId(id) {
		this.id = id;
	}
	getId() {
		return this.id;
	}

	// image needs to already be loaded!
	setDisplayImage(image) {
		this.displayImage = image;
	}
	getDisplayImage() {
		return this.displayImage;
	}

	getUnscaledHeight() {
		if (this.height) {
			return this.height;
		} else {
			return this.displayImage.height;
		}
	}
	getUnscaledWidth() {
		if (this.width) {
			return this.width;
		} else {
			return this.displayImage.width;
		}
	}

	getSpeed() {
		return this.speed;
	}
	setSpeed(speed) {
		this.speed = speed;
	}

	// lab2 getters and setters
	getVisible() {
		return this.visible;
	}
	getPosition() {
		return this.position;
	}
	getPivotPoint() {
		return this.pivotPoint;
	}
	getScaleX() {
		var m0 = this.pivotState.m[0],
			m1 = this.pivotState.m[1];

		return Math.sqrt(m0*m0 + m1*m1);
	}
	getScaleY() {
		var m2 = this.pivotState.m[2],
			m3 = this.pivotState.m[3];

		return Math.sqrt(m2*m2 + m3*m3);
	}
	getAngle() {
		return this.pivotState.getAngle();
	}
	getAlpha() {
		return this.alpha;
	}
	getXBound() {
		return this.xBound;
	}
	getYBound() {
		return this.yBound;
	}

	setVisible(visible) {
		this.visible = visible;
	}
	setPosition(position) {
		this.position = position.clone();
	}
	setPivotPoint(pivotPoint) {
		this.pivotPoint = pivotPoint;
	}
	setScaleX(scaleX) {
		var thisScaleX = this.getScaleX();

		this.pivotState.translate(...this.pivotPoint.toA());
		this.pivotState.scale(1/thisScaleX, 1);
		this.pivotState.scale(scaleX, 1);
		this.pivotState.translate(...this.pivotPoint.inverseA());
	}
	setScaleY(scaleY) {
		var thisScaleY = this.getScaleY();

		this.pivotState.translate(...this.pivotPoint.toA());
		this.pivotState.scale(1, 1/thisScaleY);
		this.pivotState.scale(1, scaleY);
		this.pivotState.translate(...this.pivotPoint.inverseA());
	}
	setAngle(angle) {
		var thisAngle = this.getAngle();

		this.pivotState.translate(...this.pivotPoint.toA());
		this.pivotState.rotate(-thisAngle);
		this.pivotState.rotate(angle);
		this.pivotState.translate(...this.pivotPoint.inverseA());
	}
	setAlpha(alpha) {
		this.alpha = alpha;
	}
	setXBound(x) {
		this.xBound = x;
	}
	setYBound(y) {
		this.yBound = y;
	}

	// lab3
	centerPivotPoint() {
		this.pivotPoint = this.getCenter();
		if (!(this.pivotPoint.x === undefined)) {
			this.centered = true;
		}
	}
	setScale(scale) {
		this.pivotState.translate(...this.pivotPoint.toA());
		this.pivotState.scale(1/this.getScaleX(), 1/this.getScaleY());
		this.pivotState.scale(scale, scale);
		this.pivotState.translate(...this.pivotPoint.inverseA());
	}
	getCenter() {
		return new Point(0.5*this.getUnscaledWidth(), 0.5*this.getUnscaledHeight());
	}
	setEllipseOffset(fraction) {
		this.ellipseOffset = fraction*this.getPosition().x;
	}

	// lab5
	getHitbox() {
		return {
			x : this.position.x,
			y : this.position.y,
			width : this.getUnscaledWidth(),
			height : this.getUnscaledHeight()
		};
	}

	getHitboxCenter() {
		return this.position.plus(this.getCenter());
	}

	collidesWith(other) {
		if (utils.intersects(this.getHitbox(), other.getHitbox())) {
			return true;
		} else {
			return false;
		}
	}

	xCollides(other) {
		return (this.position.x + this.getUnscaledWidth() >= other.position.x &&
			this.position.x <= other.position.x + other.getUnscaledWidth());
	}

	yCollides(other) {
		return (this.position.y + this.getUnscaledHeight() >= other.position.y &&
			this.position.y <= other.position.y + other.getUnscaledHeight());
	}

}
