import React, {Component} from 'react'
import {View, Image, Text, TouchableOpacity, FlatList, RefreshControl, ScrollView, StyleSheet} from 'react-native'
import {getHome} from "../../netWork/api";

export default class MeHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            homeData: [],
            videoList: []
        }
    }

    componentWillMount() {
        this.getFetch();
    }

    getFetch() {
        let list = [];
        let videoList = '';
        //作品
        getHome().then(req => {
            list.push(req.data);
            videoList = req.data.videos;
            this.setState({
                homeData: list,
                videoList: videoList
            });
        });
    }

    _onRefresh() {
        var self = this;
        this.setState({
            isRefreshing: true
        });
        setTimeout(() => {
            this.getFetch();
        }, 2000)
    }

    loadingView() {
        return this.state.videoList.map(item => {
            return (
                <View style={meHomeStyle.showDate}>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Text>标题;{item.videoTitle}</Text>
                        <Text>描述;{item.videoContent}</Text>
                        <Text>分类;{item.videoType}</Text>
                        <Image style={{height: 40, width: 40, borderRadius: 50}}
                               source={{uri: item.videoCoverUrl}}/>
                        <Text>播放量:{item.playerCount}</Text>
                        <Text>顶:{item.videoTipNum}</Text>
                        <Text>踩:{item.videoTrampleNum}</Text>
                    </TouchableOpacity>

                </View>
            )
                ;
        })
    }

    render() {
        return (
            <View stylt={meHomeStyle.prevent}>
                {/*<Text>作品{this.state.homeData.nickName}</Text>*/}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#fff"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />}
                >
                    {this.loadingView()}</ScrollView>

            </View>
        );
    }
}
const meHomeStyle = StyleSheet.create({
    prevent: {
        flex: 1,
        backgroundColor: "#73c0ff"
    }
    ,
    showDate: {
        borderColor: "#FFF",
        borderWidth: 1,
        borderRadius: 5,
        width: 100,
        marginTop: 10
    }
})