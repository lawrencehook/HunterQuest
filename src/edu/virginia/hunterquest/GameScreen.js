// Lawrence Hook

"use strict";

class GameScreen extends DisplayObjectContainer {
	constructor(id, parentObj, x, y, width, height) {
		super(id, null, parentObj);

		this.position = new Point(x, y);
		this.width = width;
		this.height = height;
	}

}