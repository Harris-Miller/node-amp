export const ADD_NEW_TRACKS = 'ADD_NEW_TRACKS';
export const CLEAR = 'CLEAR';

export function clear() {
  return {
    type: CLEAR
  };
}

export function addNewTracks(data) {
  return {
    type: ADD_NEW_TRACKS,
    data
  };
}
