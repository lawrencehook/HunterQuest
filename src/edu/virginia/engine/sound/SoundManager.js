// Lawrence Hook

"use strict"

class SoundManager {
	constructor() {
		SoundManager.instance = this;

		this.sounds = {};
	}

	static getInstance() {
		return SoundManager.instance;
	}

	playSound(id) {
		// console.log(this.sounds[id]);
		this.sounds[id].play();
	}

	loopSound(id) {
		// http://stackoverflow.com/questions/3273552/html5-audio-looping
		if (typeof this.sounds[id].loop == 'boolean') {
		    this.sounds[id].loop = true;
		}
		else {
		    this.sounds[id].addEventListener('ended', function() {
		        this.currentTime = 0;
		        this.play();
		    }, false);
		}
		this.sounds[id].play();
	}

	addSound(id, audio) {
		(this.sounds)[id] = audio;
	}
}
