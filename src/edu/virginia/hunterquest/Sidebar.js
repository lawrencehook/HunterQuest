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

	onClick(e) {
		var game = Game.getInstance();
		console.log(e);
		console.log(game.mouse);
	}


	draw(context) {
		super.draw(context);

		// Background color
		context.fillStyle = "#708a98";
		context.fillRect(this.x, this.y, this.width, this.height);

		// Health bar
		context.fillStyle = "#fc0008";
		context.fillRect(5, 15, (0.8*this.width), 13);
		context.fillStyle = "#00ff08";
		context.fillRect(5, 15, Character.getInstance().getPercentHealth() * (0.8*this.width), 13);
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Health", 5, 15);

		// Experience bar
		context.fillStyle = "#666768";
		context.fillRect(5, 45, 0.8*this.width, 13);
		context.fillStyle = "#ffff1c";
		context.fillRect(5, 45, Character.getInstance().exp/100 * (0.8*this.width), 13);
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Experience", 5, 45);

		// Gold
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText(Character.getInstance().gold + " Gold", 5, 85);

		// Level
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Power Level " + Character.getInstance().level, 5, 105);

		// Weapons
		var curWep = Character.getInstance().weapon;
		if (curWep == 1) {
			context.fillStyle = "#ffff0a";
			context.fillRect(0.05*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.505*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 205, 0.3*this.width, 50);
		} else if(curWep == 2) {
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#ffff0a";
			context.fillRect(0.505*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 205, 0.3*this.width, 50);
		} else {
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.505*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#ffff0a";
			context.fillRect(0.05*this.width, 205, 0.3*this.width, 50);
		}

		context.fillStyle = "#000000";
		
		// Weapon I
		context.fillRect(0.175*this.width, 130, 0.05*this.width, 40);

		// Weapon II
		context.fillRect(0.58*this.width, 130, 0.05*this.width, 40);		
		context.fillRect(0.68*this.width, 130, 0.05*this.width, 40);
		
		// Weapon III
		context.fillRect(0.1*this.width, 210, 0.05*this.width, 40);		
		context.fillRect(0.175*this.width, 210, 0.05*this.width, 40);		
		context.fillRect(0.25*this.width, 210, 0.05*this.width, 40);


			
	}
}
