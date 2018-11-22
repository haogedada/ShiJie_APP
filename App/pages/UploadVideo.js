import React, { Component } from 'react'
import {
  Text, View, Button, DeviceEventEmitter, StyleSheet, TextInput,
  Image, Alert, TouchableOpacity
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import { upLoadVideo } from '../netWork/api'
import FileUtil from '../util/FileUtil'
import ImagePicker from 'react-native-image-picker'
import {types} from '../constants/videoTypes'
export default class UploadVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoSource: ' ',
      videoTitle: ' ',
      videoContent: ' ',
      videoType: '',
      VideoCoverfile: require('./../resources/images/icon/cover.png'),
      isSelectImg: false,
      isSelectVideo: false,
      progress: 0,
      curveContent: '',
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
  showProgressBar(){
    this.refs.RNProgressDialog && this.refs.RNProgressDialog.showProgressBar()
}
dissmissProgressBar(){
  this.refs.RNProgressDialog && this.refs.RNProgressDialog.dissmiss(0.5);
}
ProgressBarCancel(){
  this.dissmissProgressBar()
  return
}
  subUploadVideo() {
    if (this.state.videoTitle.includes(' ') ||
      this.state.videoContent.includes(' ')) {
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
      this.showProgressBar()
      upLoadVideo(formData).then(res => {
        if (res.code === 200) {
          this.dissmissProgressBar();
          Alert.alert('上传成功')
        }else{
          Alert.alert(res.msg)
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
        <View style={styles.form_row}>
          <TextInput placeholder='请输入你的视频名称'
            onChangeText={(value) => { this.setState({ videoTitle: value }) }}
            style={{borderWidth: .3,
                    borderRadius: 3}} />
        </View>
        <View style={styles.form_row}>
          <TextInput placeholder='请描述你的视频'
            onChangeText={(value) => { this.setState({ videoContent: value }) }}
            multiline
            style={{height: 160,
                    borderWidth: .3,
                    textAlignVertical: 'top',
                    borderRadius: 3}} />
        </View>
        <TouchableOpacity onPress={this.selectImg}>
          <Image style={{ width: 70, height: 70 }} source={this.state.VideoCoverfile} />
          <Text>(可选)</Text>
        </TouchableOpacity>
        <View style={styles.form_row}>
            {this.state.videoType === '' ?
            <Text style={[styles.typeFontStyle, {width: 135}]} onPress={() => { this.ActionSheet.show() }}>请选择视频类型</Text>:
            <Text style={styles.typeFontStyle} onPress={() => { this.ActionSheet.show() }}>{this.state.curveContent}</Text>}
        </View>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'选择'}
          options={types.map((value) =>  value.content)}
          cancelButtonIndex={12}
          onPress={(index) => {
            this.setState({videoType: types[index].type, curveContent: types[index].content})
          }}
        />
        <RNProgressDialog ref='RNProgressDialog' content='上传中...'
          dissmissClick={() => { this.ProgressBarCancel() }} progress={this.state.progress}/>
        <View style={{marginTop: 30}}>
          <Button title='上传' onPress={this.subUploadVideo} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#fff'
  },
  form_title: {
    alignItems: 'center',
    marginBottom: 30
  },
  form_row: {
    marginVertical: 10
  },
  imgBox: {
    alignItems: 'center',
  },
  imgStyle: {
    width: 80,
    height: 80
  },
  typeFontStyle: {
    backgroundColor: '#259de6',
    borderRadius: 25,
    lineHeight: 30,
    color: '#fff',
    width: 50,
    textAlign: 'center'
  }
})

