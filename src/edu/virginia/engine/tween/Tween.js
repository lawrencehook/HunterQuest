// Lawrence Hook

"use strict";

class Tween {
	constructor(displayObject, transition=null) {
		this.displayObject = displayObject;

		// this.startTime;
		// this.started = false;

		this.tweenParams = new ArrayList();
	}


	animate(fieldToAnimate, startVal, endVal, time, transition=null) {
		console.log("field\:" + fieldToAnimate,
					"start\:" + startVal,
					"end\:" + endVal,
					"time\:" + time,
					"transition\:" + transition);
		var tweenParams = this.tweenParams;
		var newTweenParam = new TweenParam(fieldToAnimate, startVal, endVal, time, transition);

		tweenParams.contents.forEach(function(tweenParam) {
			if (tweenParam.getField() == fieldToAnimate) {
				tweenParams.remove(tweenParam);
			}
		});

		this.tweenParams.add(newTweenParam);
	}

	// Invoked once per frame by TweenJuggler
	update() {
		for (var tweenParam of this.tweenParams.contents) {
			if (!tweenParam.started) {
				tweenParam.startTime = (new Date).getTime();
				tweenParam.started = true;
				
				this.displayObject.eventDispatcher.dispatchEvent(new TweenEvent("TWEEN_START_EVENT", this.displayObject, tweenParam)
				);
			}

			var timeElapsed = tweenParam.getTimeElapsed(),
				// t: current time, b: begInnIng value, c: change In value, d: duration
				currentTime = tweenParam.getTimeElapsed(),
				beginningValue = tweenParam.startVal,
				changeInValue = tweenParam.changeVal,
				duration = tweenParam.time,
				val = TweenTransition[tweenParam.transition](currentTime, beginningValue, changeInValue, duration);

				// val = tweenParam.startVal + tweenParam.gapVal * tweenParam.transition(timeElapsed / tweenParam.time);

			switch (tweenParam.fieldToAnimate) {
				case "x":
					this.displayObject.position.x = val;
					break;
				case "y":
					this.displayObject.position.y = val;
					break;
				case "scaleX":
					this.displayObject.setScaleX(val);
					break;
				case "scaleY":
					this.displayObject.setScaleY(val);
					break;
				case "alpha":
					val = Math.max(0, val);
					val = Math.min(1, val);
					this.displayObject.setAlpha(val);
					break;
				default:
					console.log(val);
					this.displayObject[tweenParam.fieldToAnimate] = val;
			}
			

			if (!tweenParam.ended && tweenParam.isComplete()) {
				tweenParam.ended = true;

				this.displayObject.eventDispatcher.dispatchEvent(new TweenEvent("TWEEN_COMPLETE_EVENT", this.displayObject, tweenParam)	
				);
			}
		}
	}

	isComplete() {
		var isComplete = false;
		for (var tweenParam of this.tweenParams.contents) {
			isComplete = isComplete || tweenParam.ended;
		}
		return isComplete;
	}

	setValue(param, value) {
		this.displayObject[param] = value;
	}

}