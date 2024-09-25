import * as actionType from './type'

const initialState = {
  userRole: '',
  userID: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USERROLE:
      return {
        ...state,
        userRole: action.payload.role,
        userID: action.payload.userID,
        fullName: action.payload.fullName,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default rootReducer;