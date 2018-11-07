import React, {Component} from 'react'
import {Text, View, TextInput, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native'
//网络请求
import {login} from '../netWork/api'
//请求网址
import {url} from "../constants/url"
import {Actions} from 'react-native-router-flux'
//网络请求后状态码的判断
import {isStatusCode} from '../netWork/StatusCode'

//警告
import {prompt} from '../netWork/Warning'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //用户名
            userName: '',
            //密码
            passWord: '',
            //以下为测试使用的属性名
            url: "",
            str: ''
        };

    }

    /**
     *用户登录处理函数
     * @param user 用戶名
     * @param pass 密码
     */
    isInputEmpty(user, pass) {
        let warn = {};
        this.setState({url: url.URL_LOGIN})
        //判断用户点击登录后输入框是否为空
        if (user === "") {
            warn.title = "警告";
            warn.text = "用户名为空";
            prompt(warn);
            return;
        }
        if (pass === "") {
            warn.title = "警告";
            warn.text = "密码为空";
            prompt(warn);
            return;
        }
        //用户进行网络请求
        login({
            username: user,
            password: pass
        }).then(res => {
            let str = res;
            isStatusCode(str);
        });


        //用户点击登录后清空输入框中的值
        this.setState({
            userName: '',
            passWord: ''
        })
    }
    //render函数渲染
    render() {
        return (
            <View>
                <View>
                    <Text>用户名:</Text>
                    <TextInput placeholder="用户名" onChangeText={(text) => {
                        this.setState({userName: text});
                    }} defaultValue={this.state.userName}/>
                    <Text>密码</Text>
                    <TextInput placeholder="密码" onChangeText={(text) => {
                        this.setState({passWord: text})
                    }
                    }
                               defaultValue={this.state.passWord}/>
                    <TouchableOpacity>
                        < Button style={{
                            marginLeft: 20,
                            backgroundColor: "#b1e7ff",
                            color: '#fff',
                            textAlign: "center",
                            height: 30,
                            width: 40
                        }} onPress={
                            () => {
                                let user = this.state.userName;
                                let pass = this.state.passWord;
                                this.isInputEmpty(user, pass);

                            }
                        } title="登录"/>
                    </TouchableOpacity>
                    <Text>
                        去注册
                    </Text>
                </View>
            </View>
        );
    }
}

export default Login;
