import React, {Component} from 'react'
import {View, Text, Dimensions, ScrollView, StyleSheet, Image} from 'react-native'
import Video from 'react-native-video'
import {getComment} from '../../netWork/api'

const {width, height} = Dimensions.get("window")
export default class ClickVideoShowDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: []
        }
        this.data = [];
        this.data.push(this.props.show);
    }

    getVideoComment(videoId) {
        getComment(videoId).then(req => {
            this.setState({
                commentList: req.data
            });
            console.log("评论:", req);
        })
    }

    getVideoCommentData(videoId) {
        this.getVideoComment(videoId);
        return (<View><Text>
            评论
        </Text></View>);
    }

    showView() {
        return this.data.map((item) => {
            return (
                <View>
                    <View>
                        <Text style={cvsd.text}>{item.videoType}</Text>
                        <Text style={cvsd.text}>昵称:{item.userBean.userNickname}</Text>
                        <Image style={{width: width, height: height / 3}} source={{uri: item.userBean.headimgUrl}}/>
                        <Text style={cvsd.text}>时长:{item.videoTime == null ? "没有视频" : item.videoTime}</Text>
                        <Text style={cvsd.text}>播放次数:{item.playerCount}</Text>
                        <Text style={cvsd.text}>顶:{item.videoTipNum}</Text>
                        <Text style={cvsd.text}>踩:{item.videoTrampleNum}</Text>
                        <Text style={cvsd.text}>评论</Text>
                    </View>
                    <ScrollView>
                        {this.getVideoCommentData(item.videoId)}
                    </ScrollView>
                </View>);
        });
    }
    render() {
        return (
            <View>
                {this.showView()}
            </View>);
    }
}
const cvsd = StyleSheet.create({
    text: {
        backgroundColor: "#ee2115",
        height: 30,
        textAlignVertical: "center",
        textAlign: "center",
        marginTop: 5
    }
})