import {Actions} from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'
import {prompt} from '../util/Warning'
import {DeviceEventEmitter} from "react-native"

/**
 * 用户登录对状态码的判断
 * @param parameter 请求的数据对象
 */
export function isStatusCode(parameter) {
    let par = parameter.code;
    if (par === 200) {
        const token = parameter.data
        Storage.save("token", token);
        Actions.me();
        //分发事件
        DeviceEventEmitter.emit("info", token);
        console.log("状态码:", par);
    } else if (par === 199) {
        Actions.MeInfo();
        console.log("状态码:", par);
    } else {
        let str = {
            title: "错误提示",
            text: '登录名或密码错误'
        }
        prompt(str)
    }
}