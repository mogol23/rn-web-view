import { reduxAction } from '../../constans';
import { store } from './../index';

const {
  GLOBAL_FETCH_START,
  GLOBAL_FETCH_END,
  GLOBAL_SET_STATE,
  GLOBAL_RESET_STATE,
} = reduxAction;

export function fetchStart() {
  return store.dispatch({
    type: GLOBAL_FETCH_START,
  });
}

export function fetchEnd() {
  return store.dispatch({
    type: GLOBAL_FETCH_END,
  });
}

export function getState() {
  return store.getState().global;
}

export function setState(data) {
  return store.dispatch({
    type: GLOBAL_SET_STATE,
    data,
  });
}

export function resetState() {
  return store.dispatch({
    type: GLOBAL_RESET_STATE,
  });
}

export default {
  fetchStart,
  fetchEnd,
  setState,
  resetState,
  getState,
};
