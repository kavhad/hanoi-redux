import { combineReducers } from 'redux';
import moveReducer from './moveReducer';
import stackReducer from './stackReducer';

export default combineReducers({
  stacks: stackReducer,
  moves: moveReducer
});
