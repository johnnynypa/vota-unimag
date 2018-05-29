//Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

//Root Reducers
import reducers from './rootReducer';

//Store
export const initStore = () => {
	return createStore(reducers, compose(
      applyMiddleware(thunkMiddleware)(window.devToolsExtension) ? window.devToolsExtension() : f => f
    )
  )
}

// applyMiddleware(thunkMiddleware)(window.devToolsExtension) ? window.devToolsExtension() : f => f