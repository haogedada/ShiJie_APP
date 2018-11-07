import React ,{Component}from 'react'
import { Text, View, TextInput, Button } from 'react-native'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userName: '',
            passWord:''
     };
      }
    render() {
        function login(){
          
        }
        let input;
        return (
            <View style={{flexDirection:'column'}}> 
                <View style={{flexDirection:'row'}}>
                    <Text> 用户名 </Text>
                    <TextInput 
                    onChangeText={(userName) => this.setState({userName:userName})}
                    placeholder="请输入用户名"
                     value={this.state.userName}
                     />
                     </View>
                     <View  style={{flexDirection:'row'}}>
                    <Text> 密码 </Text>
                    <TextInput 
                     onChangeText={(passWord) => this.setState({passWord})}
                     placeholder="请输入密码"
                     value={this.state.passWord}
                     />
                     </View>
             <View><Button title="登录" onPress={login.bind(this)}/></View>
            </View>
        )
    }
}
export default Login;
