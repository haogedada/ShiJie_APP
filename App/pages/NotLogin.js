import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import {Actions} from 'react-native-router-flux'

 class NotLogin extends Component {
  render() {
    return (
      <View>
        <Text>您还没有登录!请登录</Text>
        <Button title='登录' onPress={()=>{
          Actions.Login()
        }}/>
      </View>
    )
  }
}
export default NotLogin