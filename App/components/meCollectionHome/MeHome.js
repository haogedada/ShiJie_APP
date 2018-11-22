import React, { Component } from 'react'
import {
  View, Platform, Text, TouchableOpacity, Image, Alert,
  Dimensions, RefreshControl, ScrollView, StyleSheet, BackHandler
} from 'react-native'
import { getHome, removeVideo } from "../../netWork/api";
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window')

export default class MeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      homeData: [],
      videoList: [],
      isIconShow: true
    }
    this.onBackAndroid = this.onBackAndroid.bind(this)
  }

  componentWillMount() {
    this.getFetch();
    if (Platform.OS === 'android') {
      this.listener = BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
  }
  componentWillUnmount () {
    if (Platform.OS === 'android') {
      this.listener.remove('hardwareBackPress');
    }
  }

  onBackAndroid () {
    if (!this.state.isIconShow) {
      this.setState({isIconShow: true})
      return true
    } else {
      return false
    }
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
        videoList: videoList,
        isRefreshing: false
      });
    });
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.getFetch();
  }

  loadingView() {
    return this.state.videoList.map((item, index) => {
      return (
        <View style={styles.showDatilsStyle} key={index}>
          <TouchableOpacity onPress={() => { Actions.video({ 'index': index + 1, 'videoList': this.state.videoList }); }}
            onLongPress={() => { this.setState({ isIconShow: !this.state.isIconShow }) }}>
            <Text style={styles.titleStyle}>{item.videoTitle}</Text>
            {this.state.isIconShow ? <View /> : (
              <View style={[styles.reAndUpStyle, {}]}>
                <TouchableOpacity onPress={() => {
                  Actions.updateVideo({ "videoBean": item });
                }}>
                  <Image source={require('./../../resources/images/icon/updateIcon.png')}
                    style={styles.rightTopIconStyle} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  Alert.alert('提示', '你确定要删除这个视频?',
                    [{
                      text: '确定', onPress: () => {
                        removeVideo(item.videoId).then(res => {
                          if (res.code === 200) {
                            Alert.alert('删除成功')
                            Actions.me()
                          } else {
                            Alert.alert(res.msg)
                          }
                        })
                      }
                    },
                    { text: '取消', onPress: () => { return } }])
                }}>
                  <Image source={require('./../../resources/images/icon/removeIcon.png')}
                    style={styles.rightTopIconStyle} />
                </TouchableOpacity>
              </View>
            )}
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
  },
  reAndUpStyle: {
    position: 'absolute',
    top: 0,
    right: -10,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  rightTopIconStyle: {
    width: 40,
    height: 40,
    marginRight: 15
  },
})