import { reduxAction } from '../../constans';

const {
  GLOBAL_FETCH_START,
  GLOBAL_FETCH_END,
  GLOBAL_SET_STATE,
  GLOBAL_RESET_STATE,
} = reduxAction;

const initialState = {
  fetching: false,
  onboard: false,
  cookies: null
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
    case GLOBAL_SET_STATE:
      return {
        ...state,
        ...action,
      };
    case GLOBAL_RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
