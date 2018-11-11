import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FriendItem from './FriendItem'
 class FriendList extends Component {
  render() {
    return (
      <View>
        <FriendItem/>
      </View>
    )
  }
}

export default FriendList;