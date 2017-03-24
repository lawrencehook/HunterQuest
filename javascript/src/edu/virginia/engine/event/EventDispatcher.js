// Lawrence Hook

"use strict";

class EventDispatcher {
	constructor() {
		this.events = {}
	}

	addEventListener(listener, eventType) {
		if (!this.events[eventType]) {
			this.events[eventType] = new Set();
			this.events[eventType].add(listener);
		} else {
			this.events[eventType].add(listener);
		}
	}

	removeEventListener(listener, eventType) {
		if (this.events[eventType]) {
			this.events[eventType].remove(listener);
		}
	}

	dispatchEvent(event) {
		var eventType = event.eventType;
		if (this.events[eventType]) {
			this.events[eventType].forEach(function(listener) {
				listener.handleEvent(event);
			});
			delete this.events[eventType];
		}
	}

	hasEventListener(listener, eventType) {
		if (this.events[eventType]) {
			return this.events[eventType].has(listener);
		} else {
			return false;
		}
	}
}
