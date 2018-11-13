import React, { Component } from 'react'
import { Text, View,TouchableOpacity } from 'react-native'
import { RRCAlert } from 'react-native-overlayer';

class UploadVideo extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={()=>{
          RRCAlert.alert('title title')
        }}>
        <Text>上传视频</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default UploadVideo