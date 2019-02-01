import { audioContext } from './audio-context';

export default class Track {
  constructor() {
    this.track = new Audio();
    this.source = audioContext.createMediaElementSource(this.track);
    this.gainControl = audioContext.createGain();

    // https://www.google.com/search?q=10+band+eq+Q+values&oq=10+band+eq+Q+values&aqs=chrome..69i57j69i60.4390j1j4&sourceid=chrome&ie=UTF-8
    // first result PDF
    // [tuple<freq, Q, display>]
    this.eqPairs = [
      [31.5, 4.3],
      [63, 2.9],
      [125, 2.4],
      [250, 1.6],
      [500, 2.4],
      [1000, 1.4],
      [2000, 0.8],
      [4000, 0.6],
      [8000, 0.7],
      [16000, 1]
    ];

    this.filters = this.eqPairs.map(([freq, q]) => {
      const eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.Q.value = q;
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

    this.filters[this.filters.length - 1].connect(this.gainControl);

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
