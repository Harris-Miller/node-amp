export const SET_PATH = 'SET_PATH';

export function setCurrentTrack(file) {
  return {
    type: SET_PATH,
    file
  };
}
