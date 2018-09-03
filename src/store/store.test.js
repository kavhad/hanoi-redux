import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../store/initialState';
import * as stackActions from '../actions/stackActions';
import configureStore from '../store/configureStore';

describe('Store tests', () => {

  it('Creates moves from stack with depth 2', () => {

    const store = configureStore(initialState);

    store.dispatch(stackActions.initStack(2));

    const moveStackAction = {
      start: 'a',
      intermediate: 'b',
      end: 'c',
      stackDepth: 2
    };

    const dispatcher = (action) => store.dispatch(action);

    stackActions.producesMoves(moveStackAction)(dispatcher);

    const actual = store.getState().moves;
    const expected = [{discMove:{from:'a', to: 'b'}},{discMove:{from:'a', to:'c'}, stackMove:{start:'b',intermediate:'a',end:'c', stackDepth:1}}];
    expect(actual).toEqual(expected);

  });

  it('Consume moves updates moves correctly', () => {
    const store = configureStore(initialState);

    store.dispatch(stackActions.initStack(2));

    const moveStackAction = {
      start: 'a',
      intermediate: 'b',
      end: 'c',
      stackDepth: 2
    };

    const dispatcher = (action) => store.dispatch(action);

    stackActions.producesMoves(moveStackAction)(dispatcher);
    const firstMove = store.getState().moves[0];

    stackActions.consumeMove(firstMove)(dispatcher);

    const actual = store.getState().moves;
    const expected = [{discMove:{from:'a', to:'c'}, stackMove:{start:'b',intermediate:'a',end:'c', stackDepth:1}}];

    expect(actual).toEqual(expected);

  });

  it('Stack updates correctly', () => {

    const store = configureStore(initialState);

    store.dispatch(stackActions.initStack(2));

    const moveStackAction = {
      start: 'a',
      intermediate: 'b',
      end: 'c',
      stackDepth: 2
    };

    const dispatcher = (action) => store.dispatch(action);

    stackActions.producesMoves(moveStackAction)(dispatcher);
    const firstMove = store.getState().moves[0];

    stackActions.consumeMove(firstMove)(dispatcher);

    const actual = store.getState().stacks;
    const exptected = {a:[2],b:[1],c:[]};

    expect(actual).toEqual(exptected);

  });


});
