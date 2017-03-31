
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
}