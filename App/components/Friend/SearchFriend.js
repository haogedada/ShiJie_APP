import React, { Component } from 'react'
import { TextInput, View, Image, Dimensions, StyleSheet } from 'react-native'

class SearchFriend extends Component {
  render() {
    return (
      <View style={styles.search}>
        <View style={styles.search_v_img} >
          <Image style={{width: 35, height: 35,alignContent:'center'}} 
           source={require('../../resources/images/icon/search.png')} />
        </View>
        <View style={styles.search_v_input}>
          <TextInput placeholder="搜索" />
        </View>
      </View>
    )
  }
}
export default SearchFriend;
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    width: width,
    height: height*0.1
  },
  search_v_img: {
    flex: 1,
  },
  search_img:{

  },
  search_v_input: {
    flex: 3
  }
})
