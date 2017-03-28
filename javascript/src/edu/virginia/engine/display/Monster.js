// Lawrence Hook

"use strict";

class Monster extends AnimatedSprite {

	constructor(id, spriteSheet, jsonSprites, parentObj=null) {
		super(id, spriteSheet, jsonSprites, parentObj);

		this.frameCounter = 0;
		this.attackSpeed = 50; // Lower is faster
	}

	attack1() {
		if (this.frameCounter % this.attackSpeed == 0) {
			// ATTACK!
			var character = Character.getInstance();
		}
	}

	update(pressedKeys) {
		super.update(pressedKeys);

		this.frameCounter += 1;

		if (this.id == "enemy1") {
			this.attack1();
		}
	}

}
