
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

	initialize() {}
}