import {actionType} from '../../constants/actionType'
const initialState = {
  token: ' '
}

export default (state = initialState,action) => {
  switch (action.type) {
  case actionType.TEST:
  return {...state,token:action.token};
  default:
    return state
  }
}
