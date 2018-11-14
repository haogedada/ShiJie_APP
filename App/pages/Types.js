import React, {Component} from 'react'
import {View, FlatList, Text, Image, ScrollView, TouchableOpacity, Button, StyleSheet, Dimensions} from 'react-native'
import {getTypes, getVideoTypesCount} from "../netWork/api";

const titleList = [""]
export default class Classification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: [],
            //所有视屏
            videoTypeList: [],
            //分类视屏
            videoList: []
        }
    }

    componentWillMount() {
// 标题
        getTypes().then(item => {
            let keyValue = [];
            console.log(item.data);
            let type = item.data;
            for (let i of type) {
                // console.log("类型:", i);
                let spilt = i.split(":");
                // console.log("拆分:", spilt[0], spilt[1]);
                keyValue.push({
                    id: spilt[0],
                    name: spilt[1]
                })
            }
            this.setState({
                typeList: keyValue
            });
        });
//视屏
        getVideoTypesCount().then(req => {
            this.setState({
                videoTypeList: req.data.videoTypeList
            });
        })
    }

    /**
     * 显示分类列表属性
     * @returns {*}
     */
    titleData() {
        let title = this.state.typeList;
        return title.map(item => {
            console.log(item.id);
            return (<Text onPress={() => {
                this.titleClick(item.id);
            }} key={item.id} style={classStyle.classTitleText}>{item.name}</Text>);
        });
    }

    defaultList() {
        let allVideo = this.state.videoTypeList;
        return allVideo.map(type => {
            return (<View>
                {this.defaultType(allVideo)}
            </View>);

        })
    }

    defaultType(type) {
        // console.log("视屏123456:", type.videos);
        return type.map(item => {
            let videoList = item.videos;
            return <View stylt={classStyle.outer}>
                <Text style={classStyle.title}>{item.videoType}</Text>
                <View>
                    {this.defaultVideo(videoList)}
                </View>
            </View>
        });
    }

    defaultVideo(videoList) {
        return videoList.map((item, index) => {
            console.log(index);
            if (index === 0) {
                return (this.defaultVideoShow(index, item));
            } else {
                return (this.defaultVideoShow(index, item));
            }
        });
    }

    defaultVideoShow(index, item) {
        let attribute;
        let video;
        if (index == 0) {
            attribute = classStyle.parent;
            video = classStyle.parentVideo;
        } else {
            attribute = classStyle.child;
            video = classStyle.childVideo;
        }
        return (
            <View key={index} style={attribute}>
                <Image style={classStyle.infoImage} source={{uri: item.userBean.headimgUrl}}/>
                <Text>{item.userBean.userNickname}</Text>
                <Text>{item.videoTitle}</Text>
                <Text>{item.videoContent}</Text>
                {/*<Video*/}
                {/*onEnd={this.onEnd}//视频播放结束时的回调函数*/}
                {/*source={require('../resources/video/douyin.qlv')}*/}
                {/*style={video}/>*/}
                <Text>播放次数:{item.playerCount}</Text>
                <Text>时间{item.videoTime}</Text>
                <View>
                    <Image source={require('../resources/images/icon/share.png')} style={classStyle.allImage}/>
                    <Image source={require('../resources/images/icon/comment.png')}
                           style={classStyle.allImage}/>
                    <Image source={require('../resources/images/icon/top.png')}
                           style={classStyle.allImage}/>
                    <Image source={require('../resources/images/icon/tread.png')}
                           style={classStyle.allImage}/>
                    <Image source={require('../resources/images/icon/focus.png')}
                           style={classStyle.allImage}/>
                </View>
            </View>
        );
    }

    titleClick(titleParams) {
        console.log("点击的元素", titleParams);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <ScrollView style={classStyle.classTitle} horizontal={true}>
                        {this.titleData()}
                    </ScrollView>
                </View>
                <View style={{flex: 9}}>
                    <ScrollView>
                        {this.defaultList()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const classStyle = StyleSheet.create({
    infoImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#000"
    },
    allImage: {
        height: 10,
        width: 10
    },
    parentVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    childVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    parent: {
        borderColor: "#fff",
        borderWidth: 1,

    },
    child: {
        borderColor: "#ee2115",
        borderWidth: 1,
        marginTop: 5
    },
    outer: {
        borderColor: "#9ec6ff",
        borderWidth: 1
    },
    title: {
        flex: 1,
        backgroundColor: '#73c0ff',
        textAlign: "center",
        lineHeight: 40,
        height: 40,
        borderColor: "#ee2115",
        borderWidth: 2
    },


    classText: {
        height: 40,
        lineHeight: 40,
        backgroundColor: "#ff5fb2",
        color: "#fff"
    },
    classTitle: {
        backgroundColor: "#73c0ff",
        maxHeight: 30
    },
    classTitleText: {
        width: 50,
        height: 30,
        lineHeight: 30,
        textAlign: "center",
        borderColor: "#fff",
        borderWidth: 1
    }
});