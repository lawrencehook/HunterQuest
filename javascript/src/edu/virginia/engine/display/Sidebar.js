// Lawrence Hook

"use strict";

class Sidebar extends DisplayObjectContainer {
	constructor(id, filename, parentObj=null, width, height) {
		super(id, filename, parentObj);

		this.health;
		this.exp;
		this.gold;
		this.weapon1;
		this.weapon2;
		this.stats = {
			"vitality" : 0,
			"strength" : 0,
			"dexterity" : 0,
			"luck" : 0
		};
		this.skills = {
			"sword" : 0,
			"bow" : 0,
			"fire" : 0,
			"auto" : 0
		};

		this.x = -5;
		this.y = -5;
		this.width = width;
		this.height = height;
	}


	draw(context) {
		super.draw(context);
		context.fillStyle = "#5decf0";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}