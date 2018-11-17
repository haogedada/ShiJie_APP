import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  DeviceEventEmitter
} from 'react-native';
import Video from 'react-native-video'
import {Actions} from 'react-native-router-flux'
let {
  width,
  height
} = Dimensions.get('window');
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
      _index: this.props._index,
      currentPage: this.props.currentPage,
    };
    this.loadStart = this.loadStart.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setTime = this.setTime.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.videoError = this.videoError.bind(this);
    this.listenerCurrentPage = this.listenerCurrentPage.bind(this)
  }
  componentWillMount() {
    this.listenerCurrentPage()
  }
  componentDidMount() {
    this.listenerCurrentPage()
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('ChangeCurrentPage')
  }
  listenerCurrentPage() {
    DeviceEventEmitter.addListener('ChangeCurrentPage', (currentPage) => {
      this.setState({ currentPage: currentPage })
    })
  }
  loadStart() {
    console.log('视频开始加载');
    console.log(this.props)
  }
  setDuration(value) {
    console.log('视频加载完成，即将播放');
    console.log(value.duration)
  }
  setTime({
    currentTime,
    playableDuration,
    seekableDuration
  }) {
    console.log('setTime');
    console.log(currentTime, playableDuration, seekableDuration);
  }
  onEnd() {
    console.log('视频播放完成');
  }
  videoError() {
    console.log('视频播放出错');
  }
  onBuffer() {
    console.log('视频正在缓冲');
  }
  render() {
    let puasImg = (<Image style={styles.pauseImg} source={require('../../resources/images/icon/player.png')} />)
    let videoPlayer = (<TouchableOpacity
      activeOpacity={0.9}
      style={styles.backgroundVideo}
      onPress={() => {
        this.setState({
          isPlay: !this.state.isPlay,
        })
      }}
    >
      <Video
        source={{ uri: this.props.video.videoUrl }} // 视频的URL地址，或者本地地址，都可以.
        ref='player'
        rate={1}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
        volume={1.0}                 // 声音的放声音的放大倍数大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
        muted={false}                // true代表静音，默认为false.
        paused={!this.state.isPlay}               // true代表暂停，默认为false
        resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
        repeat={true}                // 是否重复播放
        playInBackground={true}     // 当app转到后台运行的时候，播放是否暂停
        playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
        onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
        onLoad={(value) => { this.setDuration(value) }}    // 当视频加载完毕时的回调函数
        onProgress={(value) => { this.setTime(value) }}    //  进度控制，每250ms调用一次，以获取视频播放的进度
        onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
        onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
        style={styles.backgroundVideo}
        onBuffer={this.onBuffer}
      />
      <View style={styles.pauseImgBox}>
        {this.state.isPlay ? <View></View> : puasImg}
      </View>
      <View style={styles.playerMsgBoxStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => {
            Actions.pop()
          }}>
          <Image style={styles.iconStyle}
                 source={require('./../../resources/images/icon/back_white.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{
            alert('点击转发')
          }}>
          <Image style={styles.iconStyle}
                 source={require('./../../resources/images/icon/share_white.png')} />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-end', top: height * 0.4}}>
          <View>
            <TouchableOpacity onPress={() => {
              alert('点击收藏')
            }}>
            <Image style={styles.iconStyle}
                  source={require('./../../resources/images/icon/collect_white.png')} />
            <Text style={styles.msgNumberStyle}>
              {12345>10000?(((12345-12345%1000)/10000+'W')):(12345)}
            </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              alert('点击评论数')
            }}>
            <Image style={styles.iconStyle}
                  source={require('./../../resources/images/icon/comment_white.png')} />
            <Text style={styles.msgNumberStyle}>
              {12345>10000?(((12345-12345%1000)/10000+'W')):(12345)}
            </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              alert('点击赞')
            }}>
            <Image style={styles.iconStyle}
                 source={require('./../../resources/images/icon/top.png')} />
            <Text style={styles.msgNumberStyle}>
              {(this.props.video.videoTipNum)>10000?
                ((((this.props.video.videoTipNum)-(this.props.video.videoTipNum)%1000)/10000+'W')):
                ((this.props.video.videoTipNum))}
            </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              alert('点击踩')
            }}>
            <Image style={styles.iconStyle}
                 source={require('./../../resources/images/icon/trample.png')} />
            <Text style={styles.msgNumberStyle}>
              {(this.props.video.videoTrampleNum)>10000?
                ((((this.props.video.videoTrampleNum)-(this.props.video.videoTrampleNum)%1000)/10000+'W')):
                ((this.props.video.videoTrampleNum))}
            </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.leftMsgStyle}>
        <TouchableOpacity onPress={() => {
          alert('点击头像')
        }}>
          <Image style={styles.headerStyle}
                 source={require('./../../resources/images/icon/header.png')} />
          <Image style={styles.addConcernStyle}
                 source={require('./../../resources/images/icon/add_concern.png')} />
        </TouchableOpacity>
          <Text style={[styles.msgNumberStyle, {textAlign: 'auto'}]}
                numberOfLines={1}>@名字再取{}</Text>
          <Text style={styles.videoContentStyle}
                numberOfLines={5}>{this.props.video.videoContent}</Text>
        </View>
      </View>
    </TouchableOpacity>)
    let noRenderVideo = (<View style={styles.backgroundVideo}>
      <View style={styles.pauseImgBox}>
        {puasImg}
      </View></View>)
    return (
      <View style={styles.container}>
        {this.state.currentPage === this.state._index ?
          videoPlayer : noRenderVideo}
      </View>
    );
  }
}

VideoPlayer.propTypes = {
  video: PropTypes.object.isRequired,
  _index: PropTypes.number.isRequired
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: '#464748'
  },
  backgroundVideo:
  {
    width: width,
    height: height,
    backgroundColor: '#464748'
  },
  pauseImgBox: {
    position: 'absolute',
    top: height / 2 - 30,
    left: width / 2 - 30,
  },
  pauseImg: {
    width: 60,
    height: 60,
  },
  playerMsgBoxStyle: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  iconStyle: {
    width: 33,
    height: 33,
    margin: 20
  },
  msgNumberStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 19,
    marginTop: -20
  },
  leftMsgStyle: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    height: height * 0.38,
    width: width * 0.7
  },
  videoContentStyle: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 16,
    marginTop: 10
  },
  headerStyle: {
    width: 60,
    height: 60,
    margin: 20,
  },
  addConcernStyle: {
    width: 30,
    height: 30,
    position: 'relative',
    top: -35,
    left: 35
  }
});
