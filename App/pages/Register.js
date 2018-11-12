import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Button, Dimensions, Alert, Image, findNodeHandle } from 'react-native'
import { BlurView } from 'react-native-blur'
import { register, promptEmail, promptUserName } from '../netWork/api'
import { randomNumber } from '../util/random'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            okpassword: '',
            email: '',
            yzm: '',
            isRegister: false,
            prompt: ' ',
            random: randomNumber(),
            btn_disabled: true,
            viewRef: 1
        }
    }

    imageLoaded() {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
        let prompt_str = [
            '用户名为长度3至20的英文字母',
            '密码为长度8至16的英文字符组合',
            '两次密码不匹配',
            '邮箱不合法',
            '邮箱已存在',
            '验证码不正确',
            '用户名已存在'
        ]
        /**
         * 注册事件
         * @param {*} e 
         */
        function btn_register(e) {
            if (!btn_disabled) {
                let form = {
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
                }
                register(form).then(response => {
                    if (response.code === 200) {
                        Alert.alert('注册成功')
                    } else if (response.code === 500) {
                        Alert.alert(response.msg)
                    }
                });
            } else {
                Alert.alert('请正确输入信息')
            }

        }
        /**
         * 
         * @param {验证邮箱是否存在} e 
         */
        function handleEmail(e) {
            const re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (!re.test(this.state.email)) {
                this.setState({ btn_disabled: true, prompt: prompt_str[3] });
            } else {
                let _email = { email: this.state.email }
                promptEmail(_email).then(response => {
                    if (response.code === 200) {
                        this.setState({ btn_disabled: true, prompt: prompt_str[4] });
                    } else {
                        this.setState({ prompt: ' ' });
                    }
                })
            }
        }
        /**
         * 用户名验证
         */
        function handleUserName(e) {
            const re = /[^A-Za-z]/;
            if (((3 > this.state.username.length) ||
                (this.state.username.length > 20))) {
                this.setState({ btn_disabled: true, prompt: prompt_str[0] });
            } else if (re.test(this.state.username)) {
                this.setState({ btn_disabled: true, prompt: prompt_str[0] });
            } else {
                if (this.state.username !== '  ') {
                    let _username = { username: this.state.username }
                    promptUserName(_username).then(response => {
                        console.log(response);

                        if (response.code === 200) {
                            this.setState({ btn_disabled: true, prompt: prompt_str[6] });
                        } else {
                            this.setState({ prompt: ' ' });
                        }
                    })
                } else {
                    this.setState({ btn_disabled: true, prompt: '用户名不能为空' });
                }
            }
        }
        /**
         * 
         * @param {表单参数验证} e 
         */

        function handlePrompt(e) {
            if ((8 > this.state.password.length) || (this.state.password.length > 16)) {
                this.setState({ btn_disabled: true, prompt: prompt_str[1] });
            } else if (this.state.password !== (this.state.okpassword)) {
                this.setState({ btn_disabled: true, prompt: prompt_str[2] });
            } else if ((this.state.yzm !== this.state.random.toLowerCase()) &&
                (this.state.yzm !== this.state.random.toUpperCase())) {
                this.setState({ btn_disabled: true, prompt: prompt_str[5] });
            } else {
                this.setState({
                    btn_disabled: false,
                    prompt: ' '
                });
            }
        }
        return (
          <KeyboardAwareScrollView>
            <View style={styles.column}>
              <Image 
                style={styles.bg}
                source={require('./../resources/images/image_backgrund/bg_2.jpg')}
                ref={(img) => { this.backgroundImage = img; }}
                onLoadEnd={this.imageLoaded.bind(this)}
                />
                <BlurView
                  style={styles.dark}
                  viewRef={this.state.viewRef}
                  blurType="light"
                  blurAmount={20}
                />
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/user.png')} />
                    <TextInput style={styles.input}
                        onChangeText={(value) => this.setState({ username: value })}
                        placeholder="请输入用户名"
                        onBlur={handleUserName.bind(this)} />
                </View>
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/word.png')} />
                    <TextInput style={styles.input}
                        onChangeText={(value) => this.setState({ password: value })}
                        placeholder="请输入密码"
                        secureTextEntry={true}
                        onBlur={handlePrompt.bind(this)}
                    />
                </View>
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/word.png')} />
                    <TextInput style={styles.input}
                        onChangeText={(value) => this.setState({ okpassword: value })}
                        placeholder="再次输入密码"
                        onBlur={handlePrompt.bind(this)}
                        secureTextEntry={true} />
                </View>
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/email.png')} />
                    <TextInput style={styles.input}
                        onChangeText={(value) => this.setState({ email: value })}
                        onBlur={handleEmail.bind(this)}
                        placeholder="请输入邮箱" />
                </View>
                <View style={styles.row}>
                    <View style={styles.yzmBox}>
                      <Text style={{fontSize: 20, textAlign: 'center', lineHeight: 36}} onPress={() => { this.setState({ random: randomNumber() }) }}>{this.state.random}</Text>
                    </View>
                     <TextInput style={[styles.input, styles.yzm]}
                        onChangeText={(value) => this.setState({ yzm: value })}
                        onBlur={handlePrompt.bind(this)}
                        placeholder="请输入验证码" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.hint}>{this.state.prompt}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.btn} >
                        <Button title="注           册" disabled={this.state.btn_disabled} style={styles.btn} onPress={btn_register.bind(this)} />
                    </View>
                </View>
            </View>
          </KeyboardAwareScrollView>
        )
    }
}

export default Register;

var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.7
    },
    column: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: width,
      height: height - 70
    },
    input: {
        height: 38,
        width: width * 0.6,
        borderBottomWidth: 1,
        borderColor: "#3d3d3d",
        marginBottom: 10,
        fontSize: 18
    },
    btn: {
        width: width * 0.7,
        height: 38,
        marginTop: 25
    },
    hint: {
      color: 'red'
    },
    yzm: {
      width: 0.5 * width
    },
    yzmBox: {
      width: width * 0.18,
      height: 38,
      textAlign: 'center',
      backgroundColor: '#fff'
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
    }
});
