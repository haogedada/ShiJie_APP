import React, { Component } from 'react'
import SYImagePicker from 'react-native-syan-image-picker'
import { modifyUserMsg } from '../netWork/api'
import FileUtil from '../util/FileUtil'
import {
    Text, View, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity,
    Button, Alert
} from 'react-native'

var { height, width } = Dimensions.get('window');
class UserMsg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            headerPath: '../resources/images/icon/header.png',
            msg: {
                nikeName: ' ',
                sex: ' ',
                birthday: ' ',
                sign: ' '
            }
        }
    }

    render() {
        function handleSelectImg() {
            let options = {
                imageCount: 1,// 最大选择图片数目
                isCamera: true,         // 是否允许用户在内部拍照，默认true
                isCrop: true,          // 是否允许裁剪，默认false
                CropW: ~~(width * 0.7), // 裁剪宽度，默认屏幕宽度60%
                CropH: ~~(width * 0.7), // 裁剪高度，默认屏幕宽度60%
                isGif: false,           // 是否允许选择GIF，默认false，暂无回调GIF数据
                showCropCircle: true,  // 是否显示圆形裁剪区域，默认false
                showCropFrame: true,    // 是否显示裁剪区域，默认true
                showCropGrid: true     // 是否隐藏裁剪区域网格，默认false
            }
            SYImagePicker.showImagePicker(options, (err, photos) => {
                if (!err) {
                    console.log(photos);
                    this.setState({
                        photos: photos,
                        headerImgPath: photos[0].uri
                    })
                } else {
                    return
                }
            })
        }
        function submitMsg(e) {
            var form = new FormData();
            let k = FileUtil.creatPngFile(this.state.photos[0].uri, "header");
            console.log(k);
            form.append("nickname", this.state.msg.nikeName);
            form.append("sex", this.state.msg.sex);
            form.append("birthday", this.state.msg.birthday);
            form.append('imgfile',FileUtil.creatPngFile(this.state.photos[0].uri, "header"));
            form.append("sign", this.state.msg.sign);
            modifyUserMsg(form).then(data => {
               if(data.code ===200){
                Alert.alert('修改成功')
               }
            })
        }
        return (
            <View style={styles.msg}>
                <View>
                    <TouchableOpacity onPress={handleSelectImg.bind(this)}>
                        <Image
                            source={require('../resources/images/icon/header.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.msg_item} >
                    <Text>昵称</Text>
                    <TextInput defaultValue="" 
                    onChangeText={(value)=>{this.setState({msg:{nickname:value}})}}/>
                </View>
                <View style={styles.msg_item}>
                    <Text>性别</Text>
                    <TextInput defaultValue="" 
                    onChangeText={(value)=>{this.setState({msg:{sex:value}})}}/>
                </View>
                <View style={styles.msg_item}>
                    <Text>年龄</Text>
                    <TextInput defaultValue="" 
                     onChangeText={(value)=>{this.setState({msg:{birthday:value}})}}/>
                </View>
                <View style={styles.msg_item}>
                    <Text>个性签名</Text>
                    <TextInput defaultValue="" 
                     onChangeText={(value)=>{this.setState({msg:{sign:value}})}}/>
                </View>
                <View><Button title="完成" onPress={submitMsg.bind(this)} /></View>
            </View>
        )
    }
}
export default UserMsg

const styles = StyleSheet.create({
    msg: {
        flexDirection: "column"
    },
    msg_item: {
        flexDirection: "row"
    },
});