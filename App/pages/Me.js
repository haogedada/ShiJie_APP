import React, { Component } from 'react'
import { Text, View, Button,DeviceEventEmitter } from 'react-native'
import { getUserInfo } from '../netWork/api'
import { Actions } from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'
export default class Me extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginState: false,
            userInfo: {}
        }
        this.getInfo = this.getInfo.bind(this)
    }

    componentWillMount() {
        this.getInfo()
    }
    componentDidMount() {
         DeviceEventEmitter.addListener("login",()=>{
            this.setState({ loginState: true})
            this.getInfo()
        });
    }
    // 组件销毁前移除事件监听 
    componentWillUnmount(){ 
        DeviceEventEmitter.removeListener('login')
    }
    async getInfo() {
        let loginState = await Storage.get('loginState')
        if (loginState) {
            getUserInfo().then(info => {
                if (info) {
                    this.setState({ loginState: true, userInfo: info.data })
                }
            })
            //todo
        }
    }
    render() {
        let login = (<View>
            <Text>已登录</Text>
            <Button title='注销' onPress={() => {
                Storage.save('loginState', false)
                Storage.save('user', null)
                Storage.save('token', null)
                this.setState({loginState:false})
            }} />
            <Button title='修改资料' onPress={()=>{
                Actions.userMsg()
            }}/>
        </View>)
        let noLogin = (<View>
            <Text>你还没有登录!!</Text>
            <Button title='登录' onPress={
                () => {
                    Actions.Login()
                }
            } />
        </View>)
        return (
            <View>
                {this.state.loginState ? login : noLogin}
            </View>
        )
    }
}
