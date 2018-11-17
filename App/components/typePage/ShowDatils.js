import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, DeviceEventEmitter} from "react-native"
import {Actions} from 'react-native-router-flux'

const {height, width} = Dimensions.get("window");
export default class ShowDatils extends Component {
    constructor(props) {
        super(props);
    }

    showDetails() {
        let data = this.props.data.list;
        // console.log("data数据:", data);
        let dataList = [];
        let userDate = [];
        return data.map((item) => {
            return (
                <View style={{borderColor: "#ff394a", marginTop: 5, borderWidth: 1}}>
                    <TouchableOpacity onPress={() => {
                        Actions.ClickVideo();
                        DeviceEventEmitter.emit("left", data);
                    }}>
                        <Text>昵称:{item.videoBean.userBean.userNickname}</Text>
                        <Text>标题:{item.videoBean.videoTitle}</Text>
                        <Text>描述:{item.videoBean.videoContent}</Text>
                        <Image style={{width: width, height: height / 2}} source={{uri: item.videoBean.videoCoverUrl}}/>
                        <Text>时长:{item.videoBean.videoTime}</Text>
                        <Text>播放次数:{item.videoBean.playerCount}</Text>
                        <Text>顶:{item.videoBean.videoTipNum}</Text>
                        <Text>踩:{item.videoBean.videoTrampleNum}</Text>
                    </TouchableOpacity>
                </View>
            );
        })
    }

    render() {
        return (
            <View>
                {this.showDetails()}
            </View>);
    }
}