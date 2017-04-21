"use strict";

/**
 * A very basic Sprite. For now, does not do anything.
 * 
 * */
class AnimatedSprite extends Sprite {
	
	constructor(id, filename, jsonSprites, parentObj=null) {
		super(id, filename, parentObj);

		this.frames = jsonSprites ? jsonSprites : null;
		this.currentFrameIndex = 0;
		this.currentAnimation = "Default";
		this.currentFrame = this.frames ? this.frames[this.currentAnimation][this.currentFrameIndex] : null;

		if (!this.currentFrame) {
			this.currentFrame = {
				x : 0,
				y : 0,
				sw : super.getUnscaledWidth(),
				sh : super.getUnscaledHeight()
			}
		}

		this.sx = this.currentFrame.x;
		this.sy = this.currentFrame.y;
		this.sw = this.currentFrame.width;
		this.sh = this.currentFrame.height;

		this.animationSpeedFactor = 10;
		this.frameCounter = 0;
	}

	/**
	 * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
	 */
	update(pressedKeys) {
		super.update(pressedKeys);

		if (this.jumped) {
			this.currentAnimation = "Jump";
			this.currentFrameIndex = 0;
		} else if (this.crouched) {
			this.currentAnimation = "Crouch";
			this.currentFrameIndex = 0;
		} else {
			if (this.moving) {
				if (this.currentAnimation != "Moving") {
					this.currentAnimation = "Moving";
					this.currentFrameIndex = 0;
				}
			// } else if (this.currentAnimation == "Moving") {
			} else {
				this.currentAnimation = "Default";
				// this.currentFrameIndex = 0;
			}
		}

		// Sprite animation
		if (this.frames) {
			this.frameCounter += 1;
			if (this.frameCounter % this.animationSpeedFactor == 0) {
				this.currentFrameIndex += 1;
			}
			if (this.currentFrameIndex >= this.frames[this.currentAnimation].length) {
				this.currentFrameIndex = 0;
			}

			this.currentFrame = this.frames[this.currentAnimation][this.currentFrameIndex];

			this.sx = this.currentFrame.x;
			this.sy = this.currentFrame.y;
			this.sw = this.currentFrame.width;
			this.sh = this.currentFrame.height
		}

		if (!this.sw || !this.sh) {
			this.sw = super.getUnscaledWidth();
			this.sh = super.getUnscaledHeight();
		}

	}

	/**
	 * Draws this image to the screen
	 */
	draw(context) {
		if(this.displayImage && this.visible) {
			this.applyTransformations(context);
			if(this.loaded) {
				context.drawImage(
					this.displayImage,
					this.sx, this.sy, this.sw, this.sh,
					0,0,
					this.sw, this.sh);
			}
			this.reverseTransformations(context);
		}
	}

	setCurrentAnimation(animation) {
		if (this.currentAnimation != animation) {
			this.currentAnimation = animation;
			this.currentFrameIndex = 0;
		}
	}

	getUnscaledWidth() {
		return this.sw;
	}
	getUnscaledHeight() {
		return this.sh;
	}
}

