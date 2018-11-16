import { DeviceEventEmitter } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {Actions} from 'react-native-router-flux'

export function loadData(key) {
  if (key === 'friends') {
    loadUserFriend()
  } else if (key === 'me') {
    loadUserInfo()
  } else if (key === 'uploadVideo') {
    selectVideo()
  } else {
    return
  }
}
function loadUserFriend() {
  DeviceEventEmitter.emit('loadFriend')
}
function loadUserInfo() {
  DeviceEventEmitter.emit('loadUser')
}
function selectVideo() {
  const options = {
    title: '选择视频方式',
    takePhotoButtonTitle: '拍摄视频',
    chooseFromLibraryButtonTitle: '从文件中选择视频',
    cancelButtonTitle: '取消',
    mediaType: 'video',
    videoQuality: 'medium'
  };
  ImagePicker.showImagePicker(options, (response) => {
    console.log(response)
    if (response.didCancel) {
      console.log('用户取消选择视频');
      // Actions.home()
      return
    }
    else if (response.error) {
      console.log('视频选择出错: ', response.error);
      return    
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      return    
    } else {
      
      DeviceEventEmitter.emit('selectVideo', response.uri)
    }
  })
}