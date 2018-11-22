import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoot from './AppRoot'
import store from '../App/redux/store'
import Storage from '../App/util/AsyncStorageUtil'
import {login} from '../App/netWork/api'
import SplashScreen from 'react-native-splash-screen';
import {LoginState} from './constants/loginState'
class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            isFirstStart: false,
        }
        this.changeFirstCall = this.changeFirstCall.bind(this)
    }
    componentWillMount() {
        setTimeout(this.openApp.bind(this),2000);
        SplashScreen.hide()
    }
   async openApp(){
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
        LoginState(isLogin)
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
