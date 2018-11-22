import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import Video from 'react-native-video'
import { Actions } from 'react-native-router-flux'
let {
  width,
  height
} = Dimensions.get('window');
import { scaleFont, scaleSize } from './../../util/Adaptive'
import {playerCountAdd,praiseVideo,trampleVideo,followUser,getComment,collectVideo
} from '../../netWork/api'
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
      _index: this.props._index,
      currentPage: this.props.currentPage,
      praiseNum:this.props.video.videoTipNum,
      trampleNum:this.props.video.videoTrampleNum,
      commentNum:0,
      videoId:this.props.video.videoId,
      comment:{data:[]}
    };
    this.loadStart = this.loadStart.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setTime = this.setTime.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.videoError = this.videoError.bind(this);
    this.listenerCurrentPage = this.listenerCurrentPage.bind(this)
    this.initData = this.initData.bind(this)
    this.onBuffer = this.onBuffer.bind(this)
    this.getCommentData = this.getCommentData.bind(this)
  }
  componentWillMount() {
    this.initData()
    this.listenerCurrentPage()
   
  }
  componentDidMount() {
    this.initData()
    this.listenerCurrentPage()
    this.listenerLoadcomment()
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('ChangeCurrentPage')
  }
  listenerLoadcomment(){
    DeviceEventEmitter.addListener('loadcomment', () => {
      if (this.state.currentPage === this.state._index) {
        this.getCommentData()
      }
    })
  }
  initData() {
    if (this.state.currentPage === this.state._index) {
      this.setState({ isPlay: true })
      this.getCommentData()
    }else{
      this.setState({ isPlay: false })
    }
  }
  listenerCurrentPage() {
    DeviceEventEmitter.addListener('ChangeCurrentPage', (currentPage) => {
      if (currentPage === this.state._index) {
        this.getCommentData()
        this.setState({ isPlay: true ,currentPage: currentPage})
      }else{
        this.setState({isPlay:false, currentPage: currentPage})
      }
    })
  }

  getCommentData () {
    getComment(this.state.videoId).then(res => {
      if (res.code === 200) {
     
      if(res.data==null){
        this.setState({comment: {data:[]},videoId:this.state.videoId})
      }else{
        this.setState({comment: res})
      }
      }
    })
  }

  showVideoLoad(){
    this.refs.RNVideoLoad && this.refs.RNVideoLoad.showVideoLoad()
}
dissmissVideoLoad(){
   this.refs.RNVideoLoad && this.refs.RNVideoLoad.dissmiss(0.5)
}
  loadStart() {
    //console.log('视频开始加载');
    if(this.state.currentPage===this.state._index){
      this.showVideoLoad()
    }
  }
  setDuration(value) {
   // console.log('视频加载完成，即将播放');
  //  console.log(value.duration)
  if(this.state.currentPage===this.state._index){
    this.showVideoLoad()
  }
  }
  setTime(e) {
   // console.log('setTime');
   // console.log(currentTime, playableDuration, seekableDuration);
   if(this.state.currentPage===this.state._index){
    this.dissmissVideoLoad()
  }
  }
  onEnd() {
    //console.log('视频播放完成');
   playerCountAdd(this.state.videoId).then(resp=>{
     if(resp ===200){
       console.log('播放视频了一次');
     }
   })
   
  }
  videoError() {
   // console.log('视频播放出错');
   Alert.alert('视频播放出错,尝试重新播放')
  }
  onBuffer() {
   // console.log('视频正在缓冲');
    if(this.state.currentPage===this.state._index){
      this.showVideoLoad()
    }
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
      }}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => {
            Actions.pop()
          }}>
            <Image style={styles.iconStyle}
              source={require('./../../resources/images/icon/back_white.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            alert('点击转发')
          }}>
            <Image style={styles.iconStyle}
              source={require('./../../resources/images/icon/share_white.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end', top: scaleSize(400) }}>
          <View>
            <TouchableOpacity onPress={() => {
            collectVideo(this.state.videoId).then(res=>{
              if(res.code===200){
              Alert.alert("收藏成功")
              }else{
                Alert.alert(res.msg)
              }
            })
            }}>
              <Image style={[styles.iconStyle, {top: scaleSize(30)}]}
                source={require('./../../resources/images/icon/collect_white.png')} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              Actions.push('comment', {commentData: this.state.comment, videoId: this.state.videoId})
            }}>
              <Image style={styles.iconStyle}
                source={require('./../../resources/images/icon/comment_white.png')} />
              <Text style={styles.msgNumberStyle}>
                {this.state.comment.data.length > 10000 ? (((12345 - 12345 % 1000) / 10000 + 'W')) : (this.state.comment.data.length)}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              //赞一下
            let _praiseNum = this.state.praiseNum
            this.setState({praiseNum:this.state.praiseNum+1})
             praiseVideo(this.state.videoId).then(resp=>{
               if(resp.code!=200){
                this.setState({praiseNum:_praiseNum})
               }
             })
            } 
            }>
              <Image style={styles.iconStyle}
                source={require('./../../resources/images/icon/top_140.png')} />
              <Text style={styles.msgNumberStyle}>
                {(this.state.praiseNum) > 10000 ?
                  ((((this.state.praiseNum) - (this.state.praiseNum) % 1000) / 10000 + 'W')) :
                  ((this.state.praiseNum))}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              //踩一下
            let _trampleNum = this.state.trampleNum
            this.setState({trampleNum:this.state.trampleNum+1})
            trampleVideo(this.state.videoId).then(resp=>{
               if(resp.code!=200){
                this.setState({trampleNum:_trampleNum})
               }
             })
            }}>
              <Image style={styles.iconStyle}
                source={require('./../../resources/images/icon/trample_140.png')} />
              <Text style={styles.msgNumberStyle}>
                {(this.state.trampleNum) > 10000 ?
                  ((((this.state.trampleNum) - (this.state.trampleNum) % 1000) / 10000 + 'W')) :
                  ((this.state.trampleNum))}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.leftMsgStyle}>
          <TouchableOpacity onPress={() => { 
             followUser.person({'userId':this.props.dataItem.id})
          }} style={{width: scaleSize(140)}}>
            <Image style={styles.headerStyle}
              source={{uri:this.props.video.userBean.headimgUrl}} />
          </TouchableOpacity>
          <Text style={[styles.msgNumberStyle, { textAlign: 'auto', marginTop: scaleSize(-30)}]}
            numberOfLines={1}>@{this.props.video.userBean.userNickname}</Text>
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
        <RNVideoLoad ref='RNVideoLoad' />
        {(this.state.currentPage >= this.state._index -1) &&
          (this.state.currentPage <= this.state._index + 1)
          ? videoPlayer : noRenderVideo
        }</View>
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
    width: scaleSize(50),
    height: scaleSize(50),
    margin: 20
  },
  msgNumberStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: scaleFont(27),
    marginTop: scaleSize(-40)
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
    fontSize: scaleFont(23),
    marginTop: scaleSize(5)
  },
  headerStyle: {
    width: scaleSize(90),
    height: scaleSize(90),
    margin: 20,
    borderRadius: 50
  }
});
