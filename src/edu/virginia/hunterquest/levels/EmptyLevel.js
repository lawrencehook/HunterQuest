"use strict";

class EmptyLevel extends Level {
	constructor() {
		super();
		this.completed = false;
		this.empty = true;
	}

	isCompleted() {
		return this.completed;
	}

	initialize() {}

}