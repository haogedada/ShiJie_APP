import React, {Component} from 'react'
import {
    Text, View, TextInput, findNodeHandle,
    Dimensions, Image, StyleSheet, Button, Alert, DeviceEventEmitter
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
//网络请求
import { login } from '../netWork/api'
//请求网址
import { Actions } from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'
//警告
import { prompt } from '../util/Warning'
let { width, height } = Dimensions.get("window")
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //用户名
            userName: '',
            //密码
            passWord: '',
            //以下为测试使用的属性名
            str: ''
        };
        this.isInputEmpty = this.isInputEmpty.bind(this)
    }

    /**
     *用户登录处理函数
     * @param user 用戶名
     * @param pass 密码
     */
    isInputEmpty() {
        let user = this.state.userName;
        let pass = this.state.passWord;
        let warn = {};
        //判断用户点击登录后输入框是否为空
        if (user === "") {
            warn.title = "警告!";
            warn.text = "用户名为空";
            prompt(warn);
            return;
        }
        if (pass === "") {
            warn.title = "警告!";
            warn.text = "密码为空";
            prompt(warn);
            return;
        }
        //用户进行网络请求
        this.showLoadDialog()
        login({
            username: user,
            password: pass
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    userName: '',
                    passWord: ''
                })
                Storage.save('token',res.data)
                Storage.save('user', { username: user, password: pass })
                Storage.save('loginState', true)
                DeviceEventEmitter.emit('login')
                Actions.me()
            } if(res.code === 199){
                this.setState({
                    userName: '',
                    passWord: ''
                })
                Storage.save('token',res.data)
                Storage.save('user', { username: user, password: pass })
                Storage.save('loginState', true)
                this.dissmissLoadDialog()
                let userInfo={
                userNickname:'',
                userSex:'',
                userBirthday:'',
                bardianSign: ''}
                let headimgUrl=require('../resources/images/icon/header.png'); 
                Actions.firstLogin({'userInfo':userInfo,'headimgUrl':headimgUrl})
            }
        })
    }
    showLoadDialog(){
        this.refs.RNAlertLoad && this.refs.RNAlertLoad.showLoad();
    }
    dissmissLoadDialog(){
        this.refs.RNAlertLoad && this.refs.RNAlertLoad.dissmiss(0.5);
    }
    //render函数渲染
    render() {
        return (
            // <View>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Image
                        style={styles.bg}
                        source={require('./../resources/images/image_backgrund/bg_1.png')}
                        blurRadius={10}
                    />
                    <View style={styles.tgInputBox}>
                        {/* <Image style={{ width: 35, height: 35, marginTop: 4 }} source={require('./../resources/images/icon/user.png')} /> */}
                        <TextInput style={styles.inputStyle} placeholder="用户名"
                            onChangeText={(text) => this.setState({ userName: text })}
                            defaultValue={this.state.userName}
                            placeholderTextColor='#d4d4d4' />
                    </View>
                    <View style={styles.tgInputBox}>
                        {/* <Image style={{ width: 35, height: 35, marginTop: 4 }} source={require('./../resources/images/icon/word.png')} /> */}
                        <TextInput style={styles.inputStyle} password={true} placeholder="密码" secureTextEntry={true}
                            onChangeText={(text) => this.setState({ passWord: text })}
                            defaultValue={this.state.passWord}
                            placeholderTextColor='#d4d4d4' />
                    </View>
                    <View style={styles.tgLoginBtnStyle}>
                        <Button style={styles.tgLoginBtnStyle} 
                        onPress={this.isInputEmpty}
                            title='登          陆' />
                    </View>
                    <View style={styles.tgSettingStyle}>
                        <Text style={{color: '#fff'}} onPress={() => {
                            Actions.Forget();
                        }}>忘记密码</Text>
                        <Text style={{color: '#fff'}} onPress={() => Actions.Register()}>新用户</Text>
                    </View>
                </View>
                <RNAlertLoad ref='RNAlertLoad' content={'加载中...'}/>
            </KeyboardAwareScrollView>
        //  </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height-65
    },
    inputStyle: {
        height: 38,
        width: width * 0.7,
        borderBottomWidth: 0.2,
        borderColor: "#fff",
        marginBottom: 10,
        fontSize: 18,
        padding: 0,
        color: '#fff'
    },
    tgLoginBtnStyle: {
        height: 38,
        width: width * 0.7,
        marginTop: 15,
        marginBottom: 10
    },
    tgSettingStyle: {
        flexDirection: 'row',
        width: width * 0.7,
        justifyContent: 'space-between'
    },
    tgInputBox: {
        flexDirection: 'row',
        width: width * 0.7,
        justifyContent: 'space-between'
    },
    bg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height
    },
    dark: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
})
export default Login;
