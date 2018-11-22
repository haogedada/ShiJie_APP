import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { scaleFont, scaleSize } from './../../util/Adaptive'
import SonComment from './SonComment';
import Time from '../../util/DateUtil'
import { topComment, trampleComment } from './../../netWork/api'
export default class CommentScrollItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHideSonComment: true,
      commentObj: this.props.comment,
      topNum: this.props.comment.comment.commentatorTipNum,
      trampleNum: this.props.comment.comment.commentatorTrampleNum
    }

    this.sonCommentHideOrShow = this.sonCommentHideOrShow.bind(this)
    this.topCommentFun = this.topCommentFun.bind(this)
    this.trampleCommentFun = this.trampleCommentFun.bind(this)

  }

  sonCommentHideOrShow() {
    this.setState({
      isHideSonComment: !this.state.isHideSonComment
    })
  }

  topCommentFun() {
    let preveTopState = this.state.topNum
    this.setState({ topNum: this.state.topNum + 1 })
    topComment(this.state.commentObj.comment.txtId).then(res => {
      if (!res.code === 200) {
        this.setState({ topNum: preveTopState })
      }
    })
  }

  trampleCommentFun() {
    let prevetrampleState = this.state.trampleNum
    this.setState({ trampleNum: this.state.trampleNum + 1 })
    trampleComment(this.state.commentObj.comment.txtId).then(res => {
      if (!(res.code === 200)) {
        this.setState({ trampleNum: prevetrampleState })
      }
    }).catch(err => this.setState({ trampleNum: prevetrampleState }))
  }

  render() {
    let sonComments = this.props.comment.comments.map((item, index) => {
      return (<SonComment sonComment={item} key={index} />)
    })
    let timestamp = Date.parse(new Date(this.state.commentObj.comment.txtCreatTime));
    return (
      <View style={styles.commentStyle}>
        <View style={{ flex: 1 }}>
          <Image style={styles.headerStyle}
            source={{ uri: this.state.commentObj.comment.userBean.headimgUrl }}></Image>
        </View>
        <View style={styles.rightBoxStyle}>
          <TouchableWithoutFeedback onPress={() => {
            this.props.inputUpdateState(this.state.commentObj.comment.userBean.userNickname,
              this.state.commentObj.comment.txtId)
          }}>
            <View>
              <Text style={styles.nameStyle}>{this.state.commentObj.comment.userBean.userNickname}</Text>
              <Text style={styles.replyStyle}>{this.state.commentObj.comment.txtContext}</Text>
              <Text style={styles.dateStyle}>{Time.getFormatTime(timestamp)}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={this.topCommentFun}
            >
              <View style={styles.praiseStyle}>
                <Image style={styles.iconStyle}
                  source={require('./../../resources/images/icon/top.png')} />
                <Text style={styles.sonCommentNumStyle}>{this.state.topNum}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.trampleCommentFun}
            >
              <View style={styles.praiseStyle}>
                <Image style={styles.iconStyle}
                  source={require('./../../resources/images/icon/trample.png')} />
                <Text style={styles.sonCommentNumStyle}>{this.state.trampleNum}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.replyFontStyle}>
              <TouchableOpacity onPress={this.sonCommentHideOrShow}>
                <View style={styles.praiseStyle}>
                  <Image style={styles.iconStyle}
                    source={require('./../../resources/images/icon/comment.png')} />
                  <Text style={styles.sonCommentNumStyle}>
                    {this.props.comment.comments.length}条回复{this.state.isHideSonComment ? 'ˇ' : 'ˆ'}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={this.state.isHideSonComment ? styles.hide : styles.show}>
                {sonComments}
                <TouchableOpacity onPress={this.sonCommentHideOrShow}>
                  <Text style={styles.putStyle}>收起ˆ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  commentStyle: {
    flexDirection: 'row',
    margin: 15,
  },
  headerStyle: {
    width: scaleSize(60),
    height: scaleSize(60),
    borderRadius: 50
  },
  rightBoxStyle: {
    flex: 7,
    borderBottomWidth: 0.3,
    borderBottomColor: '#999',
    paddingBottom: 10
  },
  nameStyle: {
    color: '#e8e8e8',
    fontSize: scaleFont(26),
    marginBottom: scaleSize(7)
  },
  replyStyle: {
    color: '#fff',
    fontSize: scaleFont(32),
    marginBottom: scaleSize(5)
  },
  dateStyle: {
    color: '#999',
    fontSize: scaleFont(26),
  },
  iconStyle: {
    width: scaleSize(30),
    height: scaleSize(30)
  },
  praiseStyle: {
    flexDirection: 'row',
    marginRight: scaleSize(12),
    paddingVertical: scaleSize(5),
    alignItems: 'center'
  },
  sonCommentNumStyle: {
    color: '#fff',
    fontSize: scaleFont(26),
    lineHeight: scaleSize(30),
    paddingVertical: scaleSize(5)
  },
  replyFontStyle: {
    paddingHorizontal: scaleSize(13),
    backgroundColor: 'rgba(225, 225, 225, 0.1)',
    borderRadius: scaleSize(15),
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'flex'
  },
  putStyle: {
    textAlign: 'right',
    color: '#e8e8e8',
    marginBottom: scaleSize(10)
  }
})