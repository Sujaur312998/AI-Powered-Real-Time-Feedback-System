import * as actionType from './type'

const initialState = {
    userRole: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {      
      case actionType.USERROLE:
        return { ...state, userRole: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;