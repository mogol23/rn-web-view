import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

const middlewares = [thunkMiddleware];
const devMiddlewares = [loggerMiddleware];
__DEV__ && middlewares.push(...devMiddlewares);
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
const composedEnhancers = __DEV__
  ? composeWithDevTools(...enhancers)
  : compose(...enhancers);

export const store = createStore(rootReducer, composedEnhancers);

export const storePersisted = persistStore(store);

export default {
  store,
  storePersisted,
};
