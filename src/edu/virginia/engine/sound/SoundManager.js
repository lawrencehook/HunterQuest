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
		if (this.sounds[id].paused == false)
			this.stopSound(id);
		this.sounds[id].play();
	}

	stopSound(id) {
		this.sounds[id].pause();
		this.sounds[id].currentTime = 0;
	}

	stopAllSounds() {
		/*
		this.sounds.forEach( function(sound) {
			sound.pause();
			sound.currentTime = 0;
		});
		*/
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

	changeMusic(id1, id2, keepCurrentTime=false) {
		if (keepCurrentTime) {
			var currentTime = this.sounds[id1].currentTime;
			this.stopSound(id1);
			this.loopSound(id2, currentTime);
		}
		else {
			this.stopSound(id1);
			this.loopSound(id2);
		}
	}

	addSound(id, audio) {
		(this.sounds)[id] = audio;
	}
}
