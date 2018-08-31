import * as types from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
   case types.START_MOVE_DISC:
    return [...state, action.move];
   case types.FINISH_MOVE_DISC:
    return state.length > 0 ? [...state].slice(1) : [];
   default:
    return state;
  }
 };
