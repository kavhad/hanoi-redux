import * as types from '../actions/actionTypes';

function updatedState(state, move) {
  const newState = Object.assign({}, state, {a:[...state.a], b:[...state.b], c:[...state.c]});
  const disc = newState[move.from].shift();
  newState[move.to].unshift(disc);

  return newState;
}

function createStack(numberOfDiscs) {
  const stack = [];

  for(let i = 1; i <= numberOfDiscs; i++) {
    stack.push(i);
  }

  const newState = {
    a:stack,
    b:[],
    c:[]
  };

  return newState;
}

export default (state = {a:[], b:[], c:[]}, action) => {
  switch (action.type) {
   case types.CONSUME_DISC_MOVE:
    if(action.move) {
      return updatedState(state, action.move);
    }
    return state;
   case types.RESET_NUMBER_OF_DISCS:
    return createStack(action.numberOfDiscs);
   default:
    return state;
  }
 };
