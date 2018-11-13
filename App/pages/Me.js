import React, {Component} from 'react'
import {Text, AppState, StyleSheet, View, Image, Button, DeviceEventEmitter, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'
import {getInfo} from "../netWork/api";

export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            isLogin: true,
            showData: ''
        }
        // console.log("构造函数");
    }

    componentWillMount() {
        AppState.addEventListener("change", this.hindleActive);
    }

    async hindleActive(appstate) {
        //运行状态
        if (appstate = 'active') {
            alert(appstate);
            let loginInfo = await Storage.get("loginInfo");
            let msgInfo = await Storage.get("infoMsg");
            let videoInfo = await Storage.get("videoInfo");
            DeviceEventEmitter.emit("info", loginInfo.data);
            console.log("状态:",
                appstate
                ,
                "是否登录loginInfo:"
                ,
                loginInfo
            )
            ;
            console
                .log(
                    "状态:"
                    ,
                    appstate
                    ,
                    "个人信息msgInfo:"
                    ,
                    msgInfo
                )
            ;
            console
                .log(
                    "状态:"
                    ,
                    appstate
                    ,
                    "视频信息videoInfo:"
                    ,
                    videoInfo
                )
            ;
        }
    }

//卸载事件
    componentWillUnmount() {
        this.deEmitter.remove();
    }

//重新渲染
    componentWillUpdate(newProps, newState) {
        console.log("修改前:", this.state.isLogin, "修改后:", newState.isLogin);
        return true;
    }

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener("exit", a => {
            this.setState({
                isLogin: false,
                token: ''
            })
        })
        this.deEmitter = DeviceEventEmitter.addListener("info", (a) => {
            if (a !== null && a !== "") {
                this.setState({
                    token: a,
                    isLogin: false
                });
                getInfo();
                //显示个人信息
                this.showInfoData();
            } else {
                this.setState({
                    token: "",
                    idLogin: true,
                    showData: ''
                })
            }
            console.log("触发事件");
        })
    }

    async showInfoData() {
        let showData = await
            Storage.get("infoMsg");
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
                    <TouchableOpacity onPress={() => {
                        Actions.Login();
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
