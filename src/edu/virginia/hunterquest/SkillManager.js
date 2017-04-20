"use strict";

class SkillManager {
	constructor() {
		SkillManager.instance = this;

		this.poisonActivated = false;
		this.magicActivated = false;

		this.poisonPower = 0;
		this.magicPower = 0;

		this.projectileStrenth = 2;
		this.projectileSpeed = 5;
		this.projectileSize = 10;

		this.maxHealth = 20;
	}

	static getInstance() {
		return SkillManager.instance;
	}
}