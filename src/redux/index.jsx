import {applyMiddleware, compose, legacy_createStore as createStore} from 'redux';
import {persistStore} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import monitorReducersEnhancer from './enhancers/monitorReducers';
import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';

const middlewares = [thunkMiddleware];
if (__DEV__) {
  middlewares.push(loggerMiddleware);
}
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
const composedEnhancers = compose(...enhancers);

export const store = createStore(rootReducer, composedEnhancers);
export const storePersisted = persistStore(store);

export default {
  store,
  storePersisted,
};
