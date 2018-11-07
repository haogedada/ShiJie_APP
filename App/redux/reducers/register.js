import {actionType} from '../../constants/actionType'
const initialState = {
    isRegister:false
}

export default (state = initialState,action) => {
  switch (action.type) {
  case actionType.REGISTER_STATE:
    return {...state,isRegister:action.isRegister};

  default:
    return state
  }
}
