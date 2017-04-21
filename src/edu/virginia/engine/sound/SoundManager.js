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

	addSound(id, audio) {
		(this.sounds)[id] = audio;
	}

	playSound(id) {
		if (!this.sounds[id].paused)
			this.stopSound(id);
		this.sounds[id].play();
	}

	stopSound(id) {
		this.sounds[id].pause();
		this.sounds[id].currentTime = 0;
	}

	stopAllSounds() {
		for (var id in this.sounds) {
			this.stopSound(id);
		}
	}

	loopSound(id, startTime=0) {
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
		if (startTime != 0)
			this.sounds[id].currentTime = startTime;
		this.sounds[id].play();
	}

	setBackgroundMusic(id) {
		if (this.sounds[id].paused) {
			this.stopAllSounds();
			this.loopSound(id);
		}
	}

	transitionBackgroundMusic(id1, id2) {
		if (!this.sounds[id1].paused) {
			var currentTime = this.sounds[id1].currentTime;
			this.stopSound(id1);
			this.loopSound(id2, currentTime);
		}
	}
}
