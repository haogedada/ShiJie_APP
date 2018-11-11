import React, { Component } from 'react'
import { Text, View,Image ,Dimensions,StyleSheet} from 'react-native'
 class FriendItem extends Component {
  render() {
    return (
      <View style={styles.item}>
      <View style={styles.item_img}>
       <Image style={{width: 35, height: 35}} 
           //source={require(this.props.imgUrl)}
           source={require('../../resources/images/icon/search.png')}
           />
      </View>
      <View style={styles.item_msg}>
      <Text>用户名</Text>
      <Text>签名</Text>
      </View>
      </View>
    )
  }
}
export default FriendItem
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    item:{
      flexDirection: 'row',
      width:width,
      height:height
  },
  item_img: {
        flex: 1,
    },
    item_msg:{
      flexDirection: 'column',
      flex: 3,
    },
    item_msg_name:{

    },
    item_msg_sign:{

    } 
})