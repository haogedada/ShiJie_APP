import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { scaleFont, scaleSize } from './../../util/Adaptive'
import Time from '../../util/DateUtil'

export default class SonComment extends Component {
  render() {
    let timestamp = Date.parse(new Date(this.props.sonComment.txtCreatTime));
    return (
      <View style={styles.sonCommentStyle}>
        <Text style={styles.nameStyle}>{this.props.sonComment.userBean.userNickname}
          <Text style={{ color: '#fff' }}> 回复</Text>
        </Text>
        <Text style={styles.replyStyle}>{this.props.sonComment.txtContext}</Text>
        <Text style={styles.dateStyle}>{Time.getFormatTime(timestamp)}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  sonCommentStyle: {
    flexDirection: 'column',
    width: scaleSize(450),
    marginBottom: scaleSize(20)
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
  }
})