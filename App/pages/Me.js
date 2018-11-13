import React, {Component} from 'react'
import {StyleSheet, Text, Image, View, Button, DeviceEventEmitter, TouchableOpacity} from 'react-native'
import {getUserInfo} from '../netWork/api'
import {Actions} from 'react-native-router-flux'
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
        this.eventEmitter = DeviceEventEmitter.addListener("login", () => {
            this.setState({loginState: true})
            this.getInfo()
        });
    }

    // 组件销毁前移除事件监听
    componentWillUnmount() {
        this.eventEmitter.remove();
    }

    async getInfo() {
        let loginState = await Storage.get('loginState')
        if (loginState) {
            getUserInfo().then(info => {
                if (info) {
                    this.setState({loginState: true, userInfo: info.data})
                }
            })
            //todo
        }
    }

    render() {
        let login = (<View>
            <TouchableOpacity onPress={() => {
                Actions.UserMsg();
            }
            }>
                <Image source={{uri: this.state.userInfo.headimgUrl}} style={meStyle.noLoginImage}/>
                <Text>{this.state.userInfo.userNickname}</Text>
            </TouchableOpacity>
            <Text>{this.state.userInfo.bardianSign}</Text>
            <Button title='注销' onPress={() => {
                Storage.save('loginState', false)
                Storage.save('user', null)
                Storage.save('token', null)
                this.setState({loginState: false})
            }}/>
        </View>)
        let noLogin = (<View>
            <TouchableOpacity
                onPress={() => {
                    Actions.Login()
                }}
            >
                <Image style={meStyle.noLoginImage} source={require('../resources/images/icon/me.png')}/>
                <Text> 登录/注册</Text>
            </TouchableOpacity>
        </View>)
        return (
            <View>
                {this.state.loginState ? login : noLogin}
            </View>
        )
    }
}
const meStyle = StyleSheet.create({
    noLoginImage: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderColor: "#ee2115",
        borderRadius: 50
    }
})