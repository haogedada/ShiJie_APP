import {actionType} from '../../constants/actionType'
const initialState = {

}

export default (state = initialState,action) => {
  switch (action.type) {
  case actionType.TEST:
    return state;

  default:
    return state
  }
}
