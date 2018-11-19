import React, { Component } from 'react'
import { View, ImageBackground, Text, TouchableOpacity, Image, Dimensions, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { getHome } from "../../netWork/api";
const { width, height } = Dimensions.get('window')

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
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.videoTitle}</Text>
            <Image source={{ uri: item.videoCoverUrl }}
              style={{ width: 0.85 * width, height: 180 }}
              resizeMode='cover' />
            <View style={meHomeStyle.videoMsgStyle}>
              <View style={meHomeStyle.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/eye.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={meHomeStyle.videoMsgFontStyle}>{item.playerCount}</Text>
              </View>
              <View style={meHomeStyle.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/top.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={meHomeStyle.videoMsgFontStyle}>{item.videoTipNum}</Text>
              </View>
              <View style={meHomeStyle.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/trample.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={meHomeStyle.videoMsgFontStyle}>{item.videoTrampleNum}</Text>
              </View>
              <View style={[meHomeStyle.iconAndNumStyle, { flex: 8, justifyContent: 'flex-end' }]}>
                <Text style={{ color: '#fff', marginRight: 5 }}>{item.videoTime}</Text>
              </View>
            </View>
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
  showDate: {
    borderRadius: 5,
    width: width * 0.85,
    marginTop: 25
  },
  videoMsgStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: 25,
    marginTop: -25,
    alignItems: 'center'
  },
  videoMsgFontStyle: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 25
  },
  iconAndNumStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  }
})