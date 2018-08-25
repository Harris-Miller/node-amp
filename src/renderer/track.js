export default class Track {
  constructor() {
    this.track = new Audio();
  }

  on(...args) {
    this.track.on(...args);
  }

  off(...args) {
    this.track.off(...args);
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
