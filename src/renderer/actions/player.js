export const SET_PATH = 'SET_PATH';

export function setCurrentTrack(path) {
  return {
    type: SET_PATH,
    path
  };
}
