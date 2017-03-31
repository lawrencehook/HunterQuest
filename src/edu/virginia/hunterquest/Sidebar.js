// Lawrence Hook

"use strict";

class Sidebar extends DisplayObjectContainer {
	constructor(id, filename, parentObj=null, width, height) {
		super(id, filename, parentObj);

		this.hp;
		this.exp;
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

		// Background color
		context.fillStyle = "#708a98";
		context.fillRect(this.x, this.y, this.width, this.height);

		// Health bar
		context.fillStyle = "#fc0008";
		context.fillRect(5, 15, (this.width - 20), 13);
		context.fillStyle = "#00ff08";
		context.fillRect(5, 15, Character.getInstance().getPercentHealth() * (this.width - 20), 13);
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Health", 5, 15);

		// Experience bar
		context.fillStyle = "#666768";
		context.fillRect(5, 45, this.width - 20, 13);
		context.fillStyle = "#ffff1c";
		context.fillRect(5, 45, Character.getInstance().exp/100 * (this.width - 20), 13);
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Experience", 5, 45);

		// Gold
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText(Character.getInstance().gold + " Gold", 5, 85);
	}
}