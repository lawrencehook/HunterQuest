// Author Lawrence Hook

"use strict";

class TweenJuggler {
	constructor() {
		TweenJuggler.instance = this;

		this.tweens = new ArrayList();
	}

	getInstance() {
		return TweenJuggler.instance;
	}

	static add(tween) {
		TweenJuggler.instance.tweens.add(tween);
	}

	nextFrame() {
		var tween;
		for (tween of this.tweens.contents) {
			tween.update();
			if (tween.isComplete()) {
				this.removeTween(tween);
			}
		}
	}

	removeTween(tween) {
		this.tweens.remove(tween);
	}
}