// Lawrence Hook

"use strict";

class Event {
	constructor(eventType, source, context) {
		this.eventType = eventType;
		this.source = source;
		this.context = context;
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
