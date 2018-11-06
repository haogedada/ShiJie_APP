import React from 'react'
import { Text, View, TextInput, Button } from 'react-native'

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            userName: '',
            passWord:''
     };
      }
    render() {
        function login(){
            console.log(this.state.userName);
            console.log(this.state.passWord);
        }
        return (
            <View>
                <view>
                    <Text> 用户名 </Text>
                    <TextInput 
                    onChangeText={(userName) => this.setState({userName})}
        value={this.state.userName}/>
                    <Text> 密码 </Text>
                    <TextInput 
                     onChangeText={(passWord) => this.setState({passWord})}
        value={this.state.passWord}/>
                </view>
                <Button title="登录" onPress={login.bind(this)}/>
            </View>
        )
    }
}
export default Login;
