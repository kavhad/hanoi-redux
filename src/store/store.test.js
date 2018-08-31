import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../store/initialState';
import * as stackActions from '../actions/stackActions';
import configureStore from '../store/configureStore';

describe('Store tests', () => {

  it('Creates moves from stack with depth 2', () => {

    const store = configureStore(initialState);

    const moveStackAction = {
      start: 'a',
      intermediate: 'b',
      end: 'c',
      stackDepth: 2
    };

    const dispatcher = (action) => store.dispatch(action);

    stackActions.moveStack(moveStackAction)(dispatcher);

    const actual = store.getState().stackMoves;
    const expected = [{from:'a', to: 'b'},{from:'a', to:'c'},{from:'b',to:'c'}];
    expect(actual).toEqual(expected);

  });

  it('Creates moves from stack with depth 3', () => {

    const store = createStore(rootReducer, initialState);

    const moveStackAction = {
      start: 'a',
      intermediate: 'b',
      end: 'c',
      stackDepth: 3
    };

    const dispatcher = (action) => store.dispatch(action);

    stackActions.moveStack(moveStackAction)(dispatcher);

    const actual = store.getState().stackMoves;
    const expected = [{from:'a', to: 'c'},{from:'a', to:'b'},{from:'c',to:'b'},{from:'a',to:'c'},{from:'b', to: 'a'},{from:'b', to:'c'},{from:'a',to:'c'}];

    expect(actual).toEqual(expected);

  });

});
