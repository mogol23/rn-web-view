import { reduxAction } from '../../constans';

const { USER_FETCH_START, USER_FETCH_END, USER_SET_STATE, USER_RESET_STATE } =
  reduxAction;

const initialState = {
  logged_in: false,
  fetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_FETCH_START:
      return {
        ...state,
        fetching: true,
      };
    case USER_FETCH_END:
      return {
        ...state,
        fetching: false,
      };
    case USER_SET_STATE:
      return {
        ...state,
        ...action.data,
      };
    case USER_RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
