
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoot from './AppRoot'
import store from '../App/redux/store'
import Storage from './util/AsyncStorageUtil'
import {login} from './netWork/api'

 class App extends Component<{}> {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
   this.Login()
  }
  //获取token
  async Login(){
    let user = await Storage.get('user')
    let isLogin = await Storage.get('loginState')
     if(isLogin){
      login(user).then(res => {
        if(res.data){
          Storage.save('token',res.data)
        }
      })
    }
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
