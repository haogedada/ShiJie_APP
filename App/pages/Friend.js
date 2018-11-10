import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Friend extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> 朋友 </Text>
      </View>
    )
  }
}
