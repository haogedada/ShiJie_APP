/** @format */

import {AppRegistry} from 'react-native';
import App from './App/App';
import {name as appName} from './app.json';
import './App/util/Global'
import Storage from './App/util/AsyncStorageUtil'
import {login} from './App/netWork/api'



 //获取token
 async function Login() {
    let user = await Storage.get('user')
    let isLogin = await Storage.get('loginState')
    if (isLogin) {
        login(user).then(res => {
            if (res.data) {
                Storage.save('token', res.data)
            }
        })
    }
}
Login()
AppRegistry.registerComponent(appName, () => App);
