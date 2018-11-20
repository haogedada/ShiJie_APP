import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { scaleFont, scaleSize } from './../../util/Adaptive'

export default class SonComment extends Component {
  render() {
    return (
      <View style={styles.sonCommentStyle}>
        <Text style={styles.nameStyle}>{this.props.sonComment.userBean.userNickname}
          <Text style={{ color: '#fff' }}> 回复</Text>
        </Text>
        <Text style={styles.replyStyle}>{this.props.sonComment.txtContext}</Text>
        <Text style={styles.dateStyle}>{this.props.sonComment.txtCreatTime.substr(0, 10)}</Text>
        <TouchableOpacity onPress={this.props.sonCommentHideOrShow}>
          <Text style={styles.putStyle}>收起ˆ</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  sonCommentStyle: {
    flexDirection: 'column',
    width: scaleSize(450)
  },
  nameStyle: {
    color: '#e8e8e8',
    fontSize: scaleFont(26),
    marginBottom: scaleSize(7)
  },
  replyStyle: {
    color: '#fff',
    fontSize: scaleFont(31),
    marginBottom: scaleSize(5)
  },
  dateStyle: {
    color: '#999',
    fontSize: scaleFont(25),
    marginBottom: scaleSize(7)
  },
  putStyle: {
    textAlign: 'right',
    color: '#e8e8e8',
    marginBottom: scaleSize(10)
  }
})