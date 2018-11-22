import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, ScrollView, Animated, Easing, TextInput, ToastAndroid ,DeviceEventEmitter} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { scaleFont, scaleSize } from './../util/Adaptive'
import CommentScrollItem from '../components/Comment/CommentScrollItem';
import { commentVideo, getComment } from './../netWork/api'
const { width, height } = Dimensions.get('window')

export default class commentData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder: '说点什么...',
      txtId: '',
      isShowAndHide: true,
      videoId: this.props.videoId,
      commentContext: '',
      commentData: this.props.commentData.data
    }
    this.moveAnimated = new Animated.Value(0);
    this.fadeInAnimated = new Animated.Value(0);
    this.inputUpdateState = this.inputUpdateState.bind(this)
    this.sendComment = this.sendComment.bind(this)
  }

  componentDidMount() {
    this.enterAnimated()
  }
  /**
   * 动画
   */
  enterAnimated() {
    Animated.parallel([
      Animated.timing(this.moveAnimated, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(this.fadeInAnimated, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start()
  }

  inputUpdateState(userName, txtId) {
    this.setState({
      placeholder: `回复${userName}`,
      txtId: txtId
    })
    let comment = this.refs.comment;
    comment.focus();
  }

  sendComment() {
    if (this.state.userId === '') {
      commentVideo(this.state.videoId, { content: this.state.commentContext }).then(res => {
        if (res.code === 200) {
          DeviceEventEmitter.emit('loadcomment')
          getComment(this.state.videoId).then(res => {
            if (res.code === 200) {
              this.setState({ commentData: res.data })
            }
          })
        } else {
          ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        }
      })
    } else {
      commentVideo(this.state.videoId + '/' + this.state.txtId, { content: this.state.commentContext }).then(res => {
        if (res.code === 200) {
          DeviceEventEmitter.emit('loadcomment')
          getComment(this.state.videoId).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.setState({ commentData: res.data })
            }
          })
        } else {
          ToastAndroid.show(res.msg, ToastAndroid.SHORT)
        }
      })
    }
    let comment = this.refs.comment;
    comment.blur()
  }

  render() {
    let commentsy = this.state.commentData.length === 0 ?
      (<Text style={styles.noCommentStyle}>暂时还没有评论</Text>) :
      this.state.commentData.map((item, index) => {
        return (
          <CommentScrollItem inputUpdateState={this.inputUpdateState} comment={item} key={index}></CommentScrollItem>
        )
      })
    return (
      <Animated.View style={[styles.commentBox, {
        transform: [
          {
            translateY: this.moveAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [height * 0.76, 0]
            })
          }
        ],
        opacity: this.fadeInAnimated
      }]}>
        <View style={styles.closeFontBoxStyle}>
          <Text style={styles.closeFontStyle}>评论 {this.state.commentData.length === 0 ?
            0 :
            this.state.commentData.length}</Text>
          <Text style={styles.closeFontStyle} onPress={() => {
            Actions.pop()
          }}>✖</Text>
        </View>
        <View>
          <ScrollView>
            {commentsy}
          </ScrollView>
        </View>
        <View style={styles.inputViewStyle}>
          <TextInput placeholder={this.state.placeholder}
            placeholderTextColor='#e8e8e8'
            style={styles.inputStyle}
            multiline={true}
            onChangeText={(value) => { this.setState({ commentContext: value }) }}
            defaultValue={this.state.commentContext}
            onBlur={() => {
              this.setState({ isShowAndHide: true, placeholder: '说点什么...', userId: null, commentContext: '' })
            }}
            onFocus={() => this.setState({ isShowAndHide: false })}
            ref='comment' />
          <Text onPress={this.sendComment} style={[styles.showText, this.state.isShowAndHide ? styles.isHide : styles.isShow]}>发送</Text>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  commentBox: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'column',
    height: height * 0.76,
    width: width,
    backgroundColor: '#160733',
    paddingBottom: scaleSize(170)
  },
  closeFontBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeFontStyle: {
    color: '#fff',
    fontSize: scaleFont(39),
    margin: 15,
  },
  inputViewStyle: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: '#0b031b',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputStyle: {
    fontSize: scaleFont(28),
    color: '#fff',
    paddingVertical: 10,
    flex: 6
  },
  showText: {
    fontSize: scaleFont(28),
    color: '#fff',
    paddingVertical: 10,
    flex: 1,
    textAlign: 'center',
  },
  isShow: {
    display: 'flex'
  },
  isHide: {
    display: 'none'
  },
  noCommentStyle: {
    color: '#fff',
    fontSize: scaleFont(30),
    textAlign: 'center'
  }
})