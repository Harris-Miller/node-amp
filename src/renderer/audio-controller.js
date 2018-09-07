import { audioContext } from './audio-context';

export default class AudioController {
  constructor(track) {
    this.track = track;
    this.source = audioContext.createMediaElementSource(track);
    // this.delay = audioContext.createDelay();
    // this.delay.delayTime.value = 1;
    // this.source.connect(audioContext.destination);
    // this.source.connect(this.delay);
    // this.delay.connect(audioContext.destination);
  }
}
