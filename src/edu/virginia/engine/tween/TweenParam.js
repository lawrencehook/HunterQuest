// Lawrence Hook

"use strict";

class TweenParam {
	constructor(fieldToAnimate, startVal, endVal, time, transition=null) {
		this.fieldToAnimate = fieldToAnimate;
		this.startVal = startVal;
		this.endVal = endVal;
		this.changeVal = endVal - startVal;
		this.time = time;

		this.started = false;
		this.startTime;
		this.ended = false;

		this.transition = transition ? transition : "linear";
	}

	getTimeElapsed () {
		return (new Date).getTime() - this.startTime;
	}

	// t: current time, b: begInnIng value, c: change In value, d: duration


	isComplete() {
		var timeElapsed = this.getTimeElapsed();
		return timeElapsed > this.time;
	}

	getField() {
		return this.fieldToAnimate;
	}
}