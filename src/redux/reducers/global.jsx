import {reduxAction} from '../../constans';

const {
  GLOBAL_FETCH_START,
  GLOBAL_FETCH_END,
  GLOBAL_SET_STATE,
  GLOBAL_RESET_STATE,
} = reduxAction;

const initialState = {
  fetching: false,
  onboard: false,
  /** @type {Record<string, Record<string, object>>} hostname -> cookie name -> cookie */
  cookieJar: {},
  /** @type {Array<{origin: string, key: string, value: string}>} */
  webviewStorage: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GLOBAL_FETCH_START:
      return {
        ...state,
        fetching: true,
      };
    case GLOBAL_FETCH_END:
      return {
        ...state,
        fetching: false,
      };
    case GLOBAL_SET_STATE: {
      const {type, ...data} = action;
      return {
        ...state,
        ...data,
      };
    }
    case GLOBAL_RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
