import {Actions} from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'

/**
 * 用户登录对状态码的判断
 * @param parameter 请求的数据对象
 */
export function isStatusCode(parameter) {
    if (parameter.code === 200) {
      const token =  parameter.data 
      Storage.save("token", token);
        Actions.me();
    } else {
        return;
    }
}