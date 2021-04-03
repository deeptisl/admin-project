import { USER_LOGIN, ADD_CORPORATE, ALL_CORPORATE, SINGLE_CORPORATE, UPDATE_CORPORATE } from "../action-types/index";

const initialState = {
  loginResponse: {},
  toatlCorporates: {
    data: [],
    status: ''
  },
  addResponse: {},
  corporatesResult: []
};

function reducer(state = initialState, action) {
  if (action.type === USER_LOGIN) {
    return {
      ...state,
      loginResponse: action.payload
    };
  }
  if (action.type === ALL_CORPORATE) {
    return {
      ...state,
      toatlCorporates: action.payload
    };
  }
  if (action.type === ADD_CORPORATE || action.type === UPDATE_CORPORATE) {
    return {
      ...state,
      addResponse: action.payload
    };
  }
  if (action.type === SINGLE_CORPORATE) {
    return {
      ...state,
      corporatesResult: action.payload
    };
  }
  return state;
};

export default reducer;

