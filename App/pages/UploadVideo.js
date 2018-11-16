import React, { Component } from 'react'
import {
  Text, View, Button, DeviceEventEmitter, StyleSheet, TextInput,
  Image, Alert, TouchableOpacity
} from 'react-native'
import { upLoadVideo } from '../netWork/api'
import FileUtil from '../util/FileUtil'
import ImagePicker from 'react-native-image-picker'
export default class UploadVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoSource: ' ',
      videoTitle: ' ',
      videoContent: ' ',
      videoType: ' ',
      VideoCoverfile: require('./../resources/images/icon/header.png'),
      isSelectImg: false,
      isSelectVideo: false,
      progress: "0%"
    }
    this.subUploadVideo = this.subUploadVideo.bind(this)
    this.selectImg = this.selectImg.bind(this)
    this.listenerSelectVideo = this.listenerSelectVideo.bind(this)
    this.listenerUploadProgress = this.listenerUploadProgress.bind(this)
  }
  componentDidMount() {
    this.listenerSelectVideo()
    this.listenerUploadProgress()
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('selectVideo')
    DeviceEventEmitter.removeListener('uploadProgress')
  }
  listenerSelectVideo() {
    DeviceEventEmitter.addListener('selectVideo', (videoPath) => {
      this.setState({ videoSource: videoPath, isSelectVideo: true })
    })
  }
  listenerUploadProgress() {
    DeviceEventEmitter.addListener('uploadProgress', (_progress) => {
      this.setState({ progress: _progress })
    })
  }
  subUploadVideo() {
    if (this.state.videoTitle.includes(' ') ||
      this.state.videoContent.includes(' ') ||
      this.state.videoType.includes(' ')) {
      Alert.alert('输入内容不能含有空格')
      return
    }
    if (this.state.isSelectVideo) {
      var formData = new FormData();
      formData.append("title", this.state.videoTitle);
      formData.append("content", this.state.videoContent);
      formData.append('file', FileUtil.creatFile(this.state.videoSource, 'uploadvideo'));
      if (this.state.isSelectImg) {
        formData.append("file", FileUtil.creatFile(this.state.VideoCoverfile.uri, 'videoCoverfile'));
      }
      formData.append("type", this.state.videoType);
      upLoadVideo(formData).then(res => {
        if (res.code === 200) {
          Alert.alert('上传成功')
        }
      })
    } else {
      Alert.alert('你没有选择视频')
    }
  }
  selectImg() {
    const options = {
      title: '选择图片方式',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '从文件中选择图片',
      cancelButtonTitle: '取消',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        return
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        return
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('用户选择图片 = ', response);
        let source = { uri: response.uri };
        this.setState({
          VideoCoverfile: source,
          isSelectImg: true
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.form}>
        <View style={styles.form_title}>
          <Text style={{ fontSize: 18 }}>上传自己美好的一瞬间</Text>
        </View>
        <TouchableOpacity onPress={this.selectImg}>
          <Image style={{ width: 70, height: 70 }} source={this.state.VideoCoverfile} />
          <Text>选择视频封面图片(可选)</Text>
        </TouchableOpacity>
        <View style={styles.form_row}>
          <Text>视频标题</Text>
          <TextInput placeholder='请输入你的视频'
            onChangeText={(value) => { this.setState({ videoTitle: value }) }} />
        </View>
        <View style={styles.form_row}>
          <Text>视频类型(例如热门,娱乐)</Text>
          <TextInput placeholder='请选择分类'
            onChangeText={(value) => { this.setState({ videoType: value }) }} />
        </View>
        <View style={styles.form_row}>
          <Text>视频内容</Text>
          <TextInput placeholder='请描述你的视频'
            onChangeText={(value) => { this.setState({ videoContent: value }) }} />
        </View>
        <View>
          <Button title='上传' onPress={this.subUploadVideo} />
          <Text>{this.state.progress}</Text>
        </View>
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

