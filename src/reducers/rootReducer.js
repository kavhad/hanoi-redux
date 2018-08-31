import { combineReducers } from 'redux';
import stackMoveReducer from './stackMoveReducer';

export default combineReducers({
  stackMoves: stackMoveReducer
});
