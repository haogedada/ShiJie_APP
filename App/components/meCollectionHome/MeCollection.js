import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, RefreshControl, ScrollView, StyleSheet} from 'react-native'
import {getCollections} from "../../netWork/api";

export default class MeCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coll: []
        }
    }

    componentWillMount() {
        this.getFetch();
    }

    getFetch() {
        getCollections().then(req => {
                this.setState({
                    coll: req.data
                });
            }
        )
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true
        });

        var self = this;
        setTimeout(() => {
            this.getFetch();
        }, 2000)
    }

    loadingView() {
        return this.state.coll.map((item, index) => {
            return (
                <View style={meColl.coll}>
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
                </View>);
        });
    }

    render() {
        return (<View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />}
            >
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