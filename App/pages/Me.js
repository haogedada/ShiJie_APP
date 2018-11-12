import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, Button, DeviceEventEmitter, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'
import {getInfo} from "../netWork/api";

export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            isLogin: false,
            showData: ''
        }
    }

    componentWillUnmount() {
        this.deEmitter.remove();
    }

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener("info", (a) => {
            if (a !== null && a !== "") {
                this.setState({
                    token: a,
                    isLogin: true
                });
            } else {
                this.setState({
                    token: "",
                    idLogin: false
                })
            }
        })
        getInfo();
        this.showInfoData();
    }

    async showInfoData() {
        let showData = await Storage.get("infoMsg");
        console.log("showData", showData);
        if (showData !== null) {
            this.setState({
                showData: showData.data
            });
        }
    }

    judgeLogin() {
        console.log("judegeLogin()是否登录", this.state.isLogin);
        if (this.state.isLogin) {
            console.log("登录页面");
            return (
                <View>
                    <TouchableOpacity  onPress={() => {
                        Actions.Login();
                        alert("123")
                    }}>
                        <Image style={meStyle.loginImage} source={require('../resources/images/icon/me.png')}/>
                        <Text>
                            登录/注册
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View>
                    <View>
                        <TouchableOpacity onPress={() => {
                            Actions.MeInfo();
                        }}>
                            <Image style={meStyle.loginImage} source={{uri: this.state.showData.headimgUrl}}/>
                            <Text>
                                昵称：{this.state.showData.userNickname}
                            </Text>
                        </TouchableOpacity>
                        <Text>
                            个性签名：{this.state.showData.bardianSign}
                        </Text>
                    </View>
                    <View style={meStyle.loginWoks}>
                        <Text>我的作品</Text>
                        <Text>我的收藏</Text>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.judgeLogin()}
            </View>
        );
    }
}
const meStyle = StyleSheet.create({
        loginImage: {
            borderWidth: 1,
            borderColor: "#ee2115",
            height: 60,
            width: 60,
            borderRadius: 50
        },
        loginWoks: {
            backgroundColor: "#73c0ff"
        }
    })
;
