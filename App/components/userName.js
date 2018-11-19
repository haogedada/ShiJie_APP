import React, {Component} from 'react'
import {View, TextInput, Alert, Text, StyleSheet, Keyboard} from 'react-native'
import {promptUserName, verfly, forgetPassword} from '../netWork/api'

export default class UserName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userCode: "",
            userOnePass: ''
            , userTwoPass: '',
            emailFocus: false,
            codeFocus: false
        }
        //键盘弹出和收起
        Keyboard.addListener("keyboardDidShow", () => {
        })
        Keyboard.addListener("keyboardDidHide", () => {
        })
    }

    /**
     * 验证用户是否存在
     */
    isUserName() {
        promptUserName({username: this.state.userName}).then(req => {
            if (req.code === 200) {
                this.setState({
                    emailFocus: true
                });
            } else {
                Alert.alert("错误提示", '这个用户不存在', [
                    {
                        text: '确认', onPress: () => {
                            this.refs.user.focus();
                        }
                    },
                    {
                        text: '取消', onPress: () => {
                            this.refs.user.focus();
                        }
                    }
                ])
            }
        });
    }

    /**
     * 验证邮箱是否正确
     */
    checkEmail() {
        let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (re.test(this.state.userEmail)) {
            this.isUserEmail();
        } else {
            Alert.alert("错误提示", '邮箱格式不正确', [
                {
                    text: '确认', onPress: () => {
                        this.refs.emailRef.focus();
                    }
                },
                {
                    text: '取消', onPress: () => {
                        this.refs.emailRef.focus();
                    }
                }
            ])
        }
    }

    /**
     * 获取验证码
     */
    isUserEmail() {
        verfly({username: this.state.userName, email: this.state.userEmail}).then(req => {
            if (req.code === 200) {
                this.setState({
                    codeFocus: true
                });
            }
        })
    }

    /**
     * 输入验证码
     * @returns {*}
     */
    isCode() {
        if (this.state.userCode !== "") {
            forgetPassword({
                username: this.state.userName, password: this.state.userTwoPass, code: this.state.userCode
            }).then(req => {
                console.log("修改后:", req);
            })
        }
    }

    render() {
        return (<View>
            <View style={[userStyle.outer]}>
                <TextInput
                    ref={"user"}
                    placeholder={'请输入用户名'}
                    onChangeText={(text) => {
                        this.setState({
                            userName: text
                        });
                    }}
                    onSubmitEditing={() => {
                        this.isUserName();
                        if (this.state.emailFocus) {
                            this.refs.email.focus();
                        }
                    }}
                />
            </View>
            <View style={[userStyle.outer]}>
                <TextInput
                    rer={'emailRef'}
                    placeholder={'请输入邮箱'}
                    onFocus={() => {
                        if (this.state.userName === "") {
                            this.refs.user.focus();
                        }
                    }
                    }
                    onChangeText={(text) => {
                        this.setState({
                            userEmail: text
                        });
                    }}
                    onSubmitEditing={() => {
                        this.checkEmail()
                        if (this.state.codeFocus) {
                            this.refs.code.focus()
                        }
                    }}
                />
            </View>
            <View style={[userStyle.outer]}>
                <TextInput
                    ref={'code'}
                    placeholder={'请输入验证码'}
                    onChangeText={(text) => {
                        this.setState({
                            userCode: text
                        });
                    }}
                    onSubmitEditing={() => {
                        this.isCode();
                        this.refs.onePass.focus();
                    }}
                />
            </View>
            <View style={[userStyle.outer]}>
                <TextInput
                    ref={'onePass'}
                    placeholder={'请输入密码'}
                    onChangeText={(text) => {
                        this.setState({
                            userOnePass: text
                        });
                    }}
                    onSubmitEditing={() => {
                        this.isCode();
                        this.refs.twoPass.focus();
                    }}
                />
            </View>
            <View style={[userStyle.outer]}>
                <TextInput
                    ref={'twoPass'}
                    placeholder={'二次确认'}
                    onChangeText={(text) => {
                        this.setState({
                            userTwoPass: text
                        });
                    }}
                    onSubmitEditing={() => {
                        this.isCode();
                    }}
                />
            </View>
        </View>);
    }

}
const userStyle = StyleSheet.create({
    outer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ff5fb2',
        marginTop: 10
    }

})
