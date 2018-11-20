import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { scaleFont, scaleSize } from './../../util/Adaptive'
import SonComment from './SonComment';
import Time from '../../util/DateUtil'
export default class CommentScrollItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHideSonComment: true,
    }

    this.sonCommentHideOrShow = this.sonCommentHideOrShow.bind(this)
  }

  sonCommentHideOrShow() {
    this.setState({
      isHideSonComment: !this.state.isHideSonComment
    })  
  }

  render() {
    let sonComments = this.props.comment.comments.map((item, index) => {
      return (<SonComment sonCommentHideOrShow={this.sonCommentHideOrShow} sonComment={item} key={index} />)
    })
    let timestamp = Date.parse(new Date(this.props.comment.comment.txtCreatTime));
   return (
      <View style={styles.commentStyle}>
        <View style={{ flex: 1 }}>
          <Image style={styles.headerStyle}
            source={{ uri: this.props.comment.comment.userBean.headimgUrl }}></Image>
        </View>
        <View style={styles.rightBoxStyle}>
          <TouchableWithoutFeedback onPress={() => {
            this.props.inputUpdateState(this.props.comment.comment.userBean.userNickname, 
              this.props.comment.comment.userId)
          }}>
            <View>
              <Text style={styles.nameStyle}>{this.props.comment.comment.userBean.userNickname}</Text>
              <Text style={styles.replyStyle}>{this.props.comment.comment.txtContext}</Text>
              <Text style={styles.dateStyle}>{Time.getFormatTime(timestamp)}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.praiseStyle}>
              <Image style={styles.iconStyle}
                source={require('./../../resources/images/icon/top.png')} />
              <Text style={styles.sonCommentNumStyle}>{this.props.comment.comment.commentatorTipNum}</Text>
            </View>
            <View style={styles.praiseStyle}>
              <Image style={styles.iconStyle}
                source={require('./../../resources/images/icon/trample.png')} />
              <Text style={styles.sonCommentNumStyle}>{this.props.comment.comment.commentatorTrampleNum}</Text>
            </View>
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
    paddingVertical: scaleSize(5)
  },
  sonCommentNumStyle: {
    color: '#fff',
    fontSize: scaleFont(26)
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
  }
})