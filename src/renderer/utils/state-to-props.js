export default function stateToProps(...args) {
  return state => args.reduce((acc, arg) => {
    acc[arg] = state[arg];
    return acc;
  }, {});
}
