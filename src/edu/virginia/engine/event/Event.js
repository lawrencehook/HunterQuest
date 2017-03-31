// Lawrence Hook

"use strict";

class Event {
	constructor(eventType, source) {
		this.eventType = eventType;
		this.source = source;
	}

	setEventType(eventType) {
		this.eventType = eventType;
	}
	setSource(source) {
		this.source = source;
	}
	getEventType() {
		return this.eventType;
	}
	getSource() {
		return this.source;
	}
}
