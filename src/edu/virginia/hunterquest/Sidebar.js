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

		this.upgrading = false;
	}

	onClick(e) {
		var game = Game.getInstance();
		console.log(e);
		console.log(game.mouse);
	}


	draw(context) {
		super.draw(context);

		var char = Character.getInstance();

		// Background color
		context.fillStyle = "#708a98";
		context.fillRect(this.x, this.y, this.width, this.height);

		// Health bar
		context.fillStyle = "#fc0008";
		context.fillRect(5, 15, (0.8*this.width), 13);
		context.fillStyle = "#00ff08";
		context.fillRect(5, 15, char.getPercentHealth() * (0.8*this.width), 13);
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Health", 5, 13);

		// Experience bar
		context.fillStyle = "#666768";
		context.fillRect(5, 45, 0.8*this.width, 13);
		context.fillStyle = "#ffff1c";
		context.fillRect(5, 45, char.exp/100 * (0.8*this.width), 13);
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Experience", 5, 43);

		// Gold
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText(char.gold + " Gold", 5, 85);

		// Level
		context.fillStyle = "#000000";
		context.font = "15px Times New Roman";
		context.fillText("Power Level " + char.level, 5, 105);

		// Weapons
		var curWep = char.weapon;
		if (curWep == 1) {
			context.fillStyle = "#ffff0a";
			context.fillRect(0.05*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.505*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 195, 0.3*this.width, 50);
		} else if(curWep == 2) {
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#ffff0a";
			context.fillRect(0.505*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 195, 0.3*this.width, 50);
		} else {
			context.fillStyle = "#666768";
			context.fillRect(0.05*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#666768";
			context.fillRect(0.505*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "#ffff0a";
			context.fillRect(0.05*this.width, 195, 0.3*this.width, 50);
		}

		context.fillStyle = "#000000";
		
		// Weapon I
		context.fillRect(0.175*this.width, 130, 0.05*this.width, 40);

		// Weapon II
		context.fillRect(0.58*this.width, 130, 0.05*this.width, 40);
		context.fillRect(0.68*this.width, 130, 0.05*this.width, 40);
		
		// Weapon III
		context.fillRect(0.1*this.width, 200, 0.05*this.width, 40);		
		context.fillRect(0.175*this.width, 200, 0.05*this.width, 40);
		context.fillRect(0.25*this.width, 200, 0.05*this.width, 40);


		// Store
		var ft = 320,
			ts = 30;

		context.fillText("Store : " + char.skillPoints + " SP", 5, 295);
		context.fillStyle = "#f5ffff";
		context.fillRect(5, 300, (0.85*this.width), 5*ts + 10);
		context.fillStyle = "#000000";
		context.fillText("1 Max Health", 10, ft);
		context.fillText("2 Attack Speed", 10, ft + ts);
		context.fillText("3 Attack Damage", 10, ft + 2*ts);
		context.fillText("4 Poison Damage", 10, ft + 3*ts);
		context.fillText("5 Magic Damage", 10, ft + 4*ts);
		// context.fillText("6 Max Health", 10, 420);

		// Skills points spent
		for (var i = 0; i < char.spSpent.length; i++) {
			for (var j = 0; j < char.spSpent[i]; j++) {
				context.fillText(".", 20 + (5*j), (5) + (ft + i*ts));
			}
		}
		
	}

	update(pressedKeys) {
		super.update(pressedKeys);
		var char = Character.getInstance();

		if (!this.upgrading) {
			if (char.skillPoints) {
				// 1
				if (pressedKeys.indexOf(49) != -1) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.maxHealth += 20;
					char.spSpent[0] += 1;
				} else if (pressedKeys.indexOf(50) != -1) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.projectileSpeed += 3;
					char.spSpent[1] += 1;

				} else if (pressedKeys.indexOf(51) != -1) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.projectileDamage += 5;
					char.spSpent[2] += 1;

				} else if (pressedKeys.indexOf(52) != -1) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.poisonDamage += 2;
					char.spSpent[3] += 1;

				} else if (pressedKeys.indexOf(53) != -1) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.magicDamage += 2;
					char.spSpent[4] += 1;
				}
			}
		} else {
			this.upgrading = false;
		}
	}
}
