"use strict";

/**
 * A very basic Sprite. For now, does not do anything.
 * 
 * */
class Sprite extends DisplayObjectContainer {
	
	constructor(id, filename, parentObj=null) {
		super(id, filename, parentObj);
	}

	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys) {
		super.update(pressedKeys);
	}

	/**
	 * Draws this image to the screen
	 */
	draw(g) {
		super.draw(g);
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

