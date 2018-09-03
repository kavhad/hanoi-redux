import * as types from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.PRODUCE_MOVES:
      return [...state, ...action.moves];
    case types.REPLACE_HEAD_MOVE:
      return [...action.moves ,...(state.length > 0 ? [...state].slice(1) : [])];

    case types.RESET_NUMBER_OF_DISCS:
      return [];
    default:
      return state;
  }
 };
