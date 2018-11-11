import { combineReducers } from 'redux';
import Register from './register'
import Test from './test'
const rootReducer = combineReducers({
  //导入子reducers,合并子reducers 
  Test,
  });
  export default rootReducer;
  
