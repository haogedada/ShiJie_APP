import {Actions} from 'react-native-router-flux'

/**
 * 用户登录对状态码的判断
 * @param parameter 请求的数据对象
 */
export function isStatusCode(parameter) {
    console.log("isStatusCode")
    console.log(parameter)
    if (parameter.code === 200) {
        Actions.tabbar();
    } else {
        return;
    }
}