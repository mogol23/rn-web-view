import { reduxAction } from './../../constans';
import { store } from '../index';

const { USER_FETCH_START, USER_FETCH_END, USER_SET_STATE, USER_RESET_STATE } =
  reduxAction;

export function fetchStart() {
  return store.dispatch({
    type: USER_FETCH_START,
  });
}

export function fetchEnd() {
  return store.dispatch({
    type: USER_FETCH_END,
  });
}

export function getState() {
  return store.getState().user;
}

export function setState(data) {
  return store.dispatch({
    type: USER_SET_STATE,
    data,
  });
}

export function resetState() {
  return store.dispatch({
    type: USER_RESET_STATE,
  });
}

export default {
  fetchStart,
  fetchEnd,
  setState,
  resetState,
  getState,
};
