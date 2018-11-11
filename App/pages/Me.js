import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class Me extends Component {
  render() {
    return (
      <View><Button
        onPress={() => {
          // alert("点击")
          Actions.Login()
        }}
        title="登录" />
      </View>
    )
  }
}
