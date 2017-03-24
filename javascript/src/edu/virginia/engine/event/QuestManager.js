// Lawrence Hook
"use strict";

class QuestManager {
	
	constructor() {
		this.coinPickedUp = false;

		QuestManager.instance = this;
	}

	static getInstance() {
		return QuestManager.instance;
	}

	handleEvent(event){
		var eventType = event.eventType,
			source = event.source;

		switch (eventType) {
			case "COIN_PICKED_UP":
				this.handleCoinPickedUp(event);
				break;
			case "TWEEN_COMPLETE_EVENT":
				if (source.id === "coin" &&
					event.tweenParam.fieldToAnimate == "x") { //hacky
					var coinTween = new Tween(source);
					coinTween.animate("alpha", 1, 0, 600);
					TweenJuggler.add(coinTween);
				}
				break;
		}
	}

	handleCoinPickedUp(event) {
		var coin = event.source;
		this.coinPickedUp = true;
		SoundManager.getInstance().playSound("bell");

		var coinTween = new Tween(coin),
			game = Game.instance,
			point = game.midPoint.minus(coin.getCenter()),
			scaleX = coin.getScaleX(),
			scaleY = coin.getScaleY();
		coinTween.animate("x", coin.position.x, point.x, 1500, "easeOutElastic");
		coinTween.animate("y", coin.position.y, point.y, 1500, "easeOutElastic");
		coinTween.animate("scaleX", scaleX, 3 * scaleX, 1500);
		coinTween.animate("scaleY", scaleY, 3 * scaleY, 1500);
		TweenJuggler.add(coinTween);

		coin.eventDispatcher.addEventListener(this, "TWEEN_COMPLETE_EVENT");
	}
}
