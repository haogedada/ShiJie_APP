<<<<<<< HEAD
import {combineReducers} from 'redux';
import test from './test'
const rootReducer = combineReducers({
  test
});
export default rootReducer;
=======
import { combineReducers } from 'redux';
import Register from './register'
const rootReducer = combineReducers({
  //导入子reducers,合并子reducers 
  Register,
  });
  export default rootReducer;
>>>>>>> haogedada
  
