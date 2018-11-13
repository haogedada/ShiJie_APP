import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { getUserInfo } from '../netWork/api'
import { Actions } from 'react-native-router-flux'

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
    async getInfo() {
        let loginState = await Storage.get('loginState');
        if (loginState) {
            let info = await getUserInfo()
            if (info) {
                this.setState({ loginState: true, userInfo: info.data })
            }
        }

    }
    render() {
        let login = (<View><Text>登录</Text></View>)
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
