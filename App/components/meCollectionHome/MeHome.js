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
    return this.state.videoList.map((item, index) => {
      return (
        <View style={styles.showDatilsStyle} key={index}>

          <TouchableOpacity onPress={() => {
            Actions.ClickVideoShowDetails();
            DeviceEventEmitter.emit("left", data);
          }}>
            <Text style={styles.titleStyle}>{item.videoTitle}</Text>
            <View style={styles.imageBoxStyle}>
              <Image style={styles.ImageStyle}
                source={{ uri: item.videoCoverUrl }}
                resizeMode='cover' />
            </View>
            <View style={styles.msgStyle}>

              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/eye.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.playerCount}</Text>
              </View>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/top.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoTipNum}</Text>
              </View>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/trample.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoTrampleNum}</Text>
              </View>
              <View style={[styles.iconAndNumStyle, { flex: 8, justifyContent: 'flex-end' }]}>
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
      <View>
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
const styles = StyleSheet.create({
  showDatilsStyle: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10
  },
  imageBoxStyle: {

  },
  ImageStyle: {
    width: width - 20,
    height: (width - 20) / 2,
    borderRadius: 5
  },
  msgStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: -35,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  textStyle: {
    color: '#fff',
    lineHeight: 35,
    fontSize: 16
  },
  titleStyle: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1
  },
  iconAndNumStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  }
})