export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REORDER = 'REORDER';

export function addToQueue(track) {
  return {
    type: ADD,
    track
  };
}
