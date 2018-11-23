import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoot from './AppRoot'
import store from '../App/redux/store'
import Storage from '../App/util/AsyncStorageUtil'
import {login,getAppVersions} from '../App/netWork/api'
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            isFirstStart: false,
        }
        this.changeFirstCall = this.changeFirstCall.bind(this)
    }
    componentWillMount() {
        setTimeout(this.initApp.bind(this),2000);
        SplashScreen.hide()
    }
   
   async initApp(){
       //判断版本号
    // getAppVersions().then(res=>{
    //     let vs =parseFloat(res.data.appVersions) 
    //      if(DeviceInfo.getVersion() < vs){
            
    //      }
    //  })
        Storage.get('isFirstStart').then(value => {
            if (value == null || value == "" || value == undefined) {
                this.setState({ isFirstStart: true })
                Storage.save('isFirstStart',true)
            }
             if(value==false){
                this.setState({ isFirstStart: true })
            }
        })
        let user = await Storage.get('user')
        let isLogin = await Storage.get('loginState')
        if (isLogin) {
            this.setState({loginState:true})
            login(user).then(res => {
                if (res.data) {
                    Storage.save('token', res.data)
                }
            })
        }
    }
    changeFirstCall(){
        this.setState({isFirstStart: false})
    }
    render() {
        return (
            <Provider store={store}>
                <AppRoot />
            </Provider>
        );
    }
}
export default App;
