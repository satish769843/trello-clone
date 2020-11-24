import { GET_LIST, LIST_FAIL } from '../actions/types';

const initialState = {
  list: [],
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case LIST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
