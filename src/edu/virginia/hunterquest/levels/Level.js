
"use strict";

class Level {
	constructor() {
		this.monsters = [];
	}

	isCompleted() {
		var isCompleted = this.monsters.reduce(function(acc, val) {
			return acc && !val.parent;
		}, true);

		return isCompleted;
	}

	emptyLevel() {
		this.monsters.forEach(function(monster) {
			//console.log(monster);
			if(monster.parent != undefined) monster.destroy();
		});
		this.monsters = [];
	}

	initialize() {
		this.emptyLevel();
		Game.getInstance().gamescreen.getChildren().contents.forEach(function(entity) {
			//console.log("Entity id: " + entity.id);
			if(entity.id.includes("projectile")) {
				entity.destroy();
			}
		});
	}
}