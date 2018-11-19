import React, { Component } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { getCollections } from "../../netWork/api";
const { width, height } = Dimensions.get('window')

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
        // <View style={meColl.coll}>
        //     <TouchableOpacity onPress={() => {
        //         alert(item.userId);
        //     }
        //     }>
        //         <Text>视频名称:{item.videoTitle}</Text>
        //         <Image style={{height: 40, width: 40, borderRadius: 50}} source={{uri: item.videoCoverUrl}}/>
        //         <Text>时间:{item.videoTime}</Text>
        //         <Text>类型:{item.videoType}</Text>
        //         <Text>播放量:{item.playerCount}</Text>
        //         <Text>顶:{item.videoTipNum}</Text>
        //         <Text>踩:{item.videoTrampleNum}</Text>



        //     </TouchableOpacity>
        // </View>

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

      );
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