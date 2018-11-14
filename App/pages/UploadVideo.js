import React, { Component } from 'react'
import {
  Text, View, Button, DeviceEventEmitter, StyleSheet, TextInput,
  Image,Alert
} from 'react-native'
import {upLoadVideo} from '../netWork/api'
import FileUtil from '../util/FileUtil'
export default class UploadVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoSource: ' ',
      videoTitle:' ',
      videoContent:' ',
      videoType:' '
    }
    this.subUploadVideo = this.subUploadVideo.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount() {
    DeviceEventEmitter.addListener('selectVideo', (videoPath) => {
      this.setState({videoSource:videoPath})
    })
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('selectVideo')
  }
   subUploadVideo() {
     if(this.state.videoTitle.includes(' ')||
     this.state.videoContent.includes(' ')||
     this.state.videoType.includes(' ')){
      Alert.alert('输入内容不能含有空格')
     }
    var formData = new FormData();
    formData.append("title", this.state.videoTitle);
    formData.append("content", this.state.videoContent);
    formData.append("type", this.state.videoType);
    formData.append('file', FileUtil.creatFile(this.state.videoSource, 'uploadvideo'));
     upLoadVideo(formData).then(res=>{
       if(res.code === 200){
        Alert.alert('上传成功')
       }
     })
  }
  
  render() {
    return (
      <View style={styles.form}>
        <View style={styles.form_title}>
          <Text style={{ fontSize: 18 }}>上传自己美好的一瞬间</Text>
        </View>
        
        <View style={styles.form_row}>
          <Text>视频标题</Text>
          <TextInput placeholder='请输入你的视频' 
          onChangeText={(value)=>{this.setState({videoTitle:value})}}/>
        </View>
        <View style={styles.form_row}>
          <Text>视频类型(例如热门,娱乐)</Text>
          <TextInput placeholder='请选择分类' 
           onChangeText={(value)=>{this.setState({videoContent:value})}}/>
        </View>
        <View style={styles.form_row}>
          <Text>视频内容</Text>
          <TextInput placeholder='请描述你的视频' 
          onChangeText={(value)=>{this.setState({videoType:value})}}/>
        </View>
        <View><Button title='上传' onPress={this.subUploadVideo}/></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  form: {
    flexDirection: 'column'
  },
  form_title: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 60,
  },
  form_row: {
    flexDirection: 'row'
  },
  imgBox: {
    alignItems: 'center',
  },
  imgStyle: {
    width: 80,
    height: 80
  } 
})

