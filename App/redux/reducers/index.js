import { combineReducers } from 'redux';
import Register from './register'
const rootReducer = combineReducers({
  //导入子reducers,合并子reducers 
  Register,
  });
  export default rootReducer;
  
