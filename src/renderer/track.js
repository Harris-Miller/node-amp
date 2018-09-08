import { audioContext } from './audio-context';

export default class Track {
  constructor() {
    this.track = new Audio();
    this.source = audioContext.createMediaElementSource(this.track);
    this.gainControl = audioContext.createGain();

    this.eqFrequencies = [60, 200, 1000, 3000, 5000, 10000];

    this.filters = this.eqFrequencies.map(freq => {
      const eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.Q.value = 1;
      eq.type = 'peaking';
      return eq;
    });

    this.filters.forEach((filter, i, filters) => {
      // filter.gain.value = -15;

      if (i === 0) {
        this.source.connect(filters[i]);
      } else {
        filters[i - 1].connect(filters[i]);
      }
    });

    this.filters[5].connect(this.gainControl);

    this.gainControl.connect(audioContext.destination);
  }

  get gain() {
    return this.gainControl.gain;
  }

  on(...args) {
    this.track.addEventListener(...args);
  }

  off(...args) {
    this.track.removeEventListener(...args);
  }

  get duration() {
    return this.track.duration;
  }

  play() {
    return this.track.play();
  }

  pause() {
    this.track.pause();
  }

  stop() {
    this.track.pause();
    this.track.currentTime = 0;
  }

  replay() {
    this.track.load();
    this.play();
  }

  load(src) {
    this.track.src = src;
  }

  unload() {
    this.track.src = '';
  }

  get isMuted() {
    return this.track.muted;
  }

  get isPaused() {
    return this.track.paused;
  }

  mute() {
    this.track.muted = true;
  }

  unmute() {
    this.track.muted = false;
  }

  get currentTime() {
    return this.track.currentTime;
  }

  seek(time) {
    this.track.currentTime = time;
  }

  get volume() {
    return this.track.volume;
  }

  set volume(volume) {
    this.track.volume = volume;
  }

  get currentSrc() {
    return this.track.currentSrc;
  }
}
