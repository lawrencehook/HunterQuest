// Lawrence Hook

"use strict";

class TweenEvent extends Event {
	constructor(eventType, source, tweenParam) {
		super(eventType, source);
		this.strings = {
			"TWEEN_START_EVENT" 	: 0,
			"TWEEN_COMPLETE_EVENT" 	: 0
		}
		this.tweenParam = tweenParam;
	}

	getTween() {
		return this.tween;
	}

	// setEventType(eventType) {
	// 	this.eventType = eventType;
	// }
	// setSource(source) {
	// 	this.source = source;
	// }
	// getEventType() {
	// 	return this.eventType;
	// }
	// getSource() {
	// 	return this.source;
	// }

}