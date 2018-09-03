import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState={}) {
 return createStore(
  rootReducer,
   compose(
      applyMiddleware(thunk),
      /**
       * Conditionally add the Redux DevTools extension enhancer
       * if it is installed.
       */
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
 );
}
