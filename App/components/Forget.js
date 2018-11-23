import React, { Component } from 'react'
import { View, TextInput, Alert, Image, Button, StyleSheet, Keyboard, Dimensions } from 'react-native'
import { promptUserName, verfly, forgetPassword } from '../netWork/api'
import { Actions } from 'react-native-router-flux'
import { scaleSize, scaleFont } from './../util/Adaptive'
const { width, heigth } = Dimensions.get('window')
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
      codeFocus: false,
      successAfter: false
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
    promptUserName({ username: this.state.userName }).then(req => {
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
          }
        }
      ])
    }
  }

  /**
   * 获取验证码
   */
  isUserEmail() {
    verfly({ username: this.state.userName, email: this.state.userEmail }).then(req => {
      if (req.code === 200) {
        Alert.alert("成功", "发送成功,请耐心等待...", [
          {
            text: '确认', onPress: () => {

            }
          }
        ])
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
      let str = {
        username: this.state.userName,
        password: this.state.userTwoPass,
        code: this.state.userCode
      }
      forgetPassword(str).then(req => {
        if (req.code === 200) {
          Alert.alert("提示", "找回成功,请登录", [{
            text: "确认", onPress: () => {
              Actions.me();
            }
          }]);
        }
        if (req.code === 500) {
          Alert.alert("警告", "验证码错误", [
            {
              text: '确认', onPress: () => {
              }
            }
          ])
        }
      })
    }
  }

  render() {
    return (
      <View style={userStyle.forgetBoxStyle}>
        <Image source={require('./../resources/images/image_backgrund/bg_1.png')}
          style={userStyle.backStyle}
          blurRadius={10} />
        <View style={[userStyle.outer]}>
          <TextInput
            ref={"user"}
            style={userStyle.inputStyle}
            placeholder={'请输入用户名'}
            placeholderTextColor={'#d4d4d4'}
            onChangeText={(text) => {
              this.setState({
                userName: text
              });
            }}
            onSubmitEditing={() => {
              if (this.state.userName.indexOf(" ") === -1) {
                this.isUserName();
              } else {
                Alert.alert("警告", "不能包含空格", [
                  {
                    text: '确认', onPress: () => {
                      this.refs.user.focus();
                    }
                  }, {
                    text: '取消', onPress: () => {
                      this.refs.user.focus();
                    }
                  }
                ])
              }
              if (this.state.emailFocus) {
                this.refs.email.focus();
              }
            }}
          />
        </View>
        <View style={[userStyle.outer]}>
          <TextInput
            rer={"emailRef"}
            placeholderTextColor={'#d4d4d4'}
            style={userStyle.inputStyle}
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
              this.checkEmail();
            }}
          />
        </View>
        <View style={[userStyle.outer, userStyle.yzmBoxStyle]}>
          <TextInput
            ref={"code"}
            placeholderTextColor={'#d4d4d4'}
            style={[userStyle.inputStyle, { width: scaleSize(400) }]}
            placeholder={'请输入验证码'}
            onChangeText={(text) => {
              this.setState({
                userCode: text
              });
            }}
            onSubmitEditing={() => {

            }}
          />
          <Button onPress={() => this.checkEmail()}
            title='获取验证码' />
        </View>
        <View style={[userStyle.outer]}>
          <TextInput
            style={userStyle.inputStyle}
            placeholderTextColor={'#d4d4d4'}
            ref={"onePass"}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                userOnePass: text
              });
            }}
            onSubmitEditing={() => {
              if (this.state.userOnePass.indexOf(" ") !== -1) {
                Alert.alert("警告", '不能有空格', [
                  {
                    text: '确认', onPress: () => {
                      this.refs.onePass.focus();
                    }
                  }
                ])
              }
            }}
          />
        </View>
        <View style={[userStyle.outer, { marginBottom: scaleSize(30) }]}>
          <TextInput
            ref={"twoPass"}
            style={userStyle.inputStyle}
            placeholderTextColor={'#d4d4d4'}
            secureTextEntry={true}
            placeholder={'请确认密码'}
            onChangeText={(text) => {
              this.setState({
                userTwoPass: text
              });
            }}
            onSubmitEditing={() => {
              if (this.state.userTwoPass.indexOf(" ") !== -1) {
                Alert.alert("警告", '不能有空格', [
                  {
                    text: '确认', onPress: () => {

                    }
                  }
                ])
              }

            }}
          />
        </View>
        <View style={userStyle.buttonStyle}>
          <Button title={"确认修改"}
            onPress={() => {
              if (this.state.userOnePass === this.state.userTwoPass) {
                this.isCode()
              } else {
                Alert.alert("错误警告", '两次输入的密码不一致', [{
                  text: '确认', onPress: () => {

                  }
                }])
              }
            }} />
        </View>
      </View>
    );
  }

}
const userStyle = StyleSheet.create({
  forgetBoxStyle: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outer: {
    width: scaleSize(650)
  },
  inputStyle: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#fff',
    color: '#fff',
    height: scaleSize(100)
  },
  yzmBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  buttonStyle: {
    width: scaleSize(650)
  }
})
