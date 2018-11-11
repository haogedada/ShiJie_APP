import React, { Component } from 'react'
import { View ,Dimensions,StyleSheet} from 'react-native'
import FriendList from '../components/Friend/FriendList'
import SearchFriend from '../components/Friend/SearchFriend'

 class Friend extends Component {
  render() {
      let friends;
    return (
      <View style={styles.friend}>
        <SearchFriend />
        {/* <FriendList /> */}
      </View>
    )
  }
}
export default Friend;
const styles=StyleSheet.create({
    friend:{
        flexDirection: 'column',
    },
    friend_search:{

    },
    friend_item:{

    }


})
