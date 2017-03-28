// Steven Wang

"use strict";

class StatusEvent extends Event {
	constructor(eventType, source, value) {
		super(eventType, source);
		this.value = value;
	}

	setValue(value) {
		this.value = value;
	}
	getValue() {
		return this.value;
	}
}
