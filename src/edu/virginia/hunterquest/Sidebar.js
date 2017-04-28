// Lawrence Hook

"use strict";

class Sidebar extends DisplayObjectContainer {
	constructor(id, filename, parentObj=null, width, height) {
		super(id, filename, parentObj);

		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;

		this.upgrading = false;
	}

	onClick(e) {
		var game = Game.getInstance();
		// console.log(e);
		// console.log(game.mouse);
	}

	update(pressedKeys) {
		super.update(pressedKeys);
		var char = Character.getInstance();

		if (char.skillPoints) {
			// Max Health
			if (pressedKeys.indexOf(49) != -1) {
				if (!this.upgrading) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.maxHealth += 5;
					char.hp += 5;
					char.spSpent[0] += 1;
					SoundManager.getInstance().playSound("purchase");
				}
			// Cooldown reduction
			} else if (pressedKeys.indexOf(50) != -1) {
				if (!this.upgrading) {
					var coolDownMax = 2;
					if (char.spSpent[1] < coolDownMax) {
						this.upgrading = true;
						char.skillPoints -= 1;
						// char.cooldown += 3;
						char.spSpent[1] += 1;
						SoundManager.getInstance().playSound("purchase");

						// If cooldown is upgraded 5 times, burst is unlocked!
						if (char.spSpent[1] >= coolDownMax) {
							char.burstShot = true;
							char.singleShot = false;
						}
					}
				}
			// Projectile Damage
			} else if (pressedKeys.indexOf(51) != -1) {
				if (!this.upgrading) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.projectileDamage += 0.5;
					char.spSpent[2] += 1;
					SoundManager.getInstance().playSound("purchase");
				}
			// Poison Damage
			} else if (pressedKeys.indexOf(52) != -1) {
				if (!this.upgrading) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.poisonDamage += .02;
					char.spSpent[3] += 1;
					SoundManager.getInstance().playSound("purchase");
				}
			// Life Steal
			} else if (pressedKeys.indexOf(53) != -1) {
				if (!this.upgrading) {
					this.upgrading = true;
					char.skillPoints -= 1;
					char.lifeSteal += .2;
					char.spSpent[4] += 1;
					SoundManager.getInstance().playSound("purchase");
				}
			} else {
				this.upgrading = false;
			}

		} else {
			this.upgrading = false;
		}
	}


	draw(context) {
		super.draw(context);

		var char = Character.getInstance();
		var game = Game.getInstance();
		var leftPadding = 10;

		context.font = "bold 15px Macondo";

		// Background color
		context.fillStyle = "silver";
		context.fillRect(this.x, this.y, this.width, this.height);

		// Health bar
		context.fillStyle = "#fc0008";
		context.fillRect(leftPadding, 15, (0.8*this.width), 13);
		context.fillStyle = "#00ff08";
		context.fillRect(leftPadding, 15, char.getPercentHealth() * (0.8*this.width), 13);
		context.fillStyle = "#000000";
		context.fillText("Health", leftPadding, 13);

		// Experience bar
		context.fillStyle = "whitesmoke";
		context.fillRect(leftPadding, 45, 0.8*this.width, 13);
		context.fillStyle = "gold";
		context.fillRect(leftPadding, 45, char.exp/(100 + ((char.level-1)*50)) * (0.8*this.width), 13);
		context.fillStyle = "#000000";
		context.fillText("Experience", leftPadding, 43);

		// Level
		context.fillStyle = "#000000";
		context.fillText("Power Level " + char.level, leftPadding, 85);

		// Deaths
		context.fillStyle = "#000000";
		char.deaths == 1 ? context.fillText("1 Death", leftPadding, 105) : context.fillText(char.deaths + " Deaths", leftPadding, 105);

		// Weapons
		var curWep = char.weapon;
		if (curWep == 1) {
			context.fillStyle = "gold";
			context.fillRect(0.07*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "whitesmoke";
			context.fillRect(0.507*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "whitesmoke";
			context.fillRect(0.07*this.width, 195, 0.3*this.width, 50);
		} else if(curWep == 2) {
			context.fillStyle = "whitesmoke";
			context.fillRect(0.07*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "gold";
			context.fillRect(0.507*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "whitesmoke";
			context.fillRect(0.07*this.width, 195, 0.3*this.width, 50);
		} else {
			context.fillStyle = "whitesmoke";
			context.fillRect(0.07*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "whitesmoke";
			context.fillRect(0.507*this.width, 125, 0.3*this.width, 50);
			context.fillStyle = "gold";
			context.fillRect(0.07*this.width, 195, 0.3*this.width, 50);
		}

		context.fillStyle = "#000000";
		
		// Weapon I
		context.fillRect(0.18*this.width, 130, 0.05*this.width, 40);

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

		context.fillText("Store : " + char.skillPoints + " SP", leftPadding, 295);
		context.fillStyle = "whitesmoke";
		context.fillRect(leftPadding, 300, (0.85*this.width), 5*ts + 10);
		context.fillStyle = "#000000";
		context.fillText("1 Max Health", 15, ft);
		context.fillText("2 Cooldown", 15, ft + ts);
		context.fillText("3 Attack Damage", 15, ft + 2*ts);
		context.fillText("4 Poison Damage", 15, ft + 3*ts);
		context.fillText("5 Life Steal", 15, ft + 4*ts);
		// context.fillText("6 Max Health", 10, 420);

		// Skills points spent
		for (var i = 0; i < char.spSpent.length; i++) {
			for (var j = 0; j < char.spSpent[i]; j++) {
				context.fillText(".", 25 + (5*j), (5) + (ft + i*ts));
			}
		}

		// Time elapsed
		var t = new Date(game.elapsedTime);
		// context.fillText(t.getMinutes() + ":" + t.getSeconds() + " " + t.getMilliseconds(), 50, this.height - 50);
		context.fillText(t.getMinutes() + ":" + t.getSeconds(), 55, this.height - 50);
	}

}
