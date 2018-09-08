import { audioContext } from './audio-context';

export default class AudioController {
  constructor(track) {
    this.track = track;
    this.source = audioContext.createMediaElementSource(track);
  }
}
