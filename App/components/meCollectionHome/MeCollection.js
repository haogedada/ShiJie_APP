import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import {getCollections} from "../../netWork/api";

export default class MeCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coll: []
        }
    }

    componentWillMount() {
        getCollections().then(req => {
                this.setState({
                    coll: req.data
                });
            }
        )
    }

    loadingView() {
        return this.state.coll.map((item, index) => {
            return (<View style={meColl.coll}>
                <TouchableOpacity onPress={() => {
                    alert(item.userId);
                }
                }>
                    <Text>视频名称:{item.videoTitle}</Text>
                    <Image style={{height: 40, width: 40, borderRadius: 50}} source={{uri: item.videoCoverUrl}}/>
                    <Text>时间:{item.videoTime}</Text>
                    <Text>类型:{item.videoType}</Text>
                    <Text>播放量:{item.playerCount}</Text>
                    <Text>顶:{item.videoTipNum}</Text>
                    <Text>踩:{item.videoTrampleNum}</Text>
                </TouchableOpacity>
            </View>)
        })
    }

    render() {
        return (<View>
            <ScrollView>
                {this.loadingView()}
            </ScrollView>
        </View>);
    }
}
const meColl = StyleSheet.create({
    coll: {
        borderRadius: 4,
        borderColor: "#fff",
        backgroundColor: "#73c0ff",
        borderWidth: 1
    }
});