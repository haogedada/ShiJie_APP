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
       this.listenerLoadUser = this.listenerLoadUser.bind(this)
    }
    componentWillMount() {
        this.getInfo()
    }
    componentDidMount() {
        this.listenerLoadUser()
        this.listenerLogin()
    }
    // 组件销毁前移除事件监听 
    componentWillUnmount(){ 
        DeviceEventEmitter.removeListener('login')
        DeviceEventEmitter.removeListener('loadUser')
    }
    async getInfo() {
        let loginState = await Storage.get('loginState')
        if (loginState) {
            getUserInfo().then(info => {
                if (info) {
                    this.setState({ loginState: true, userInfo: info.data })
                }
            })
        }else{
            this.setState({ loginState: false})
        }
    }
    listenerLoadUser(){
        DeviceEventEmitter.addListener("loadUser",()=>{
            this.getInfo()
        })
    }
    listenerLogin(){
        DeviceEventEmitter.addListener("login",()=>{
            this.setState({ loginState: true})
            this.getInfo()
        });
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
