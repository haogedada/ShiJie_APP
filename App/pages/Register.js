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
            prompt: '',
            random: randomNumber(),
            btn_disabled: true,
            viewRef: 1,
            promptCount:0
        }
        
    }

    imageLoaded() {
      this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
        let prompt_str = [
            '用户名为长度3至20的英文字母数字组合',
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
            let form = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            register(form).then(response => {
                if (response.code === 200) {
                    Alert.alert('注册成功,请在邮箱内激活')
                    this.setState({
                    username: '',
                    password: '',
                    email: '',
                    promptCount: 0});
                } else if (response.code === 500) {
                    Alert.alert(response.msg)
                }
            });
        }
        /**
         * 
         * @param {验证邮箱是否存在} e 
         */
        function handlePromptEmail(value) {
            const re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (!re.test(value)) {
                this.setState({ prompt: prompt_str[3] });
            } else {
                let _email = { email: value }
                promptEmail(_email).then(response => {
                    if (response.code === 200) {
                        this.setState({ prompt: prompt_str[4] });
                    } else {
                        this.setState({ email:value,prompt: ' ', promptCount: this.state.promptCount + 1 });
                    }
                })
            }
        }
        /**
         * 用户名验证
         */
        function handlePromptUserName(value) {
            const re = /^[0-9a-zA-z]/;
            if ((3 > value.length) ||
                (value.length > 20) ||
                !re.test(value)) {
                this.setState({ prompt: prompt_str[0] });
            } else {
                if (value !== '  ') {
                    let _username = { username: value }
                    promptUserName(_username).then(response => {
                        if (response.code === 200) {
                            this.setState({ prompt: prompt_str[6] });
                        } else {
                            this.setState({username: value, prompt: ' ', promptCount: this.state.promptCount + 1 });
                        }
                    })
                } else {
                    this.setState({ prompt: '用户名不能为空' });
                }
            }
        }
        /**
         * 密码验证
         */
        function handlePromptPassword(value) {
            const re = /^[\u3220-\uFA29]+$/;
            if ((re.test(value)) ||
                (8 > value.length) ||
                (value.length > 16)) {
                this.setState({ prompt: prompt_str[1] });
            } else {
                this.setState({password:value,prompt: ' ', promptCount: this.state.promptCount + 1 });
            }

        }/**
         * 确认密码验证
         * @param {*} e 
         */
        function handlePromptOkPassword(value) {
            if (this.state.password !== value) {
                this.setState({ prompt: prompt_str[2] });
            } else {
                this.setState({ prompt: ' ', promptCount: this.state.promptCount + 1 });
            }
        }
        /**
         * 验证码验证
         * @param {*} e 
         */
        function handlePromptYzm(value) {
            if (value !== this.state.random.toLowerCase()) {
              return  this.setState({ prompt: prompt_str[5] });
            } else {
                return  this.setState({ prompt: ' ', promptCount: this.state.promptCount + 1 });
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
                        onChangeText={handlePromptUserName.bind(this)}
                        placeholder="请输入用户名"
                        defaultValue={this.state.username}
                         />
                </View>
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/word.png')} />
                    <TextInput style={styles.input}
                        onChangeText={handlePromptPassword.bind(this)}
                        placeholder="请输入密码"
                        defaultValue={this.state.password}
                        password={true}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/word.png')} />
                    <TextInput style={styles.input}
                        onChangeText={handlePromptOkPassword.bind(this)}
                        placeholder="请输入密码"
                        defaultValue={this.state.okpassword}
                        password={true}
                        secureTextEntry={true}
                        />
                </View>
                <View style={styles.row}>
                    <Image style={{width: 35, height: 35}} source={require('./../resources/images/icon/email.png')} />
                    <TextInput style={styles.input}
                        onChangeText={handlePromptEmail.bind(this)}
                        placeholder="请输入邮箱" 
                        defaultValue={this.state.email}/>
                </View>
                <View style={styles.row}>
                    <View style={styles.yzmBox}>
                      <Text style={{fontSize: 20, textAlign: 'center', lineHeight: 36}} 
                      onPress={() => { this.setState({ random: randomNumber() }) }}>
                      {this.state.random}
                      </Text>
                    </View>
                     <TextInput style={[styles.input, styles.yzm]}
                        onChangeText={handlePromptYzm.bind(this)}
                        placeholder="请输入验证码"
                        defaultValue="" />
                </View>
                <View style={styles.row}>
                    <Text style={styles.hint}>{this.state.prompt}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.btn} >
                        <Button title="注     册"
                            disabled={this.state.promptCount >= 5 ? false : true}
                            style={styles.btn} 
                            onPress={btn_register.bind(this)} />
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
        padding: 0,
        borderWidth: 1,
        borderColor: "#3d3d3d",
        borderRadius: 4,
        paddingLeft: 10,
        marginBottom: 10,
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
