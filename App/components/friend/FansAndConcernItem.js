import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

let {width, height} = Dimensions.get("window")
export default class FansAndConcernItem extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <TouchableOpacity style={styles.itemBoxStyle}>
        <Image style={styles.avatar} source={{uri:this.props.dataItem.avatar}} />
        <View>
          <Text style={styles.nameStyle} numberOfLines={1}>{this.props.dataItem.name}</Text>
          <Text style={styles.signatureStyle} numberOfLines={1}>{this.props.dataItem.signature}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  itemBoxStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 50
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#000',
    width: width * 0.8
  },
  signatureStyle: {
    fontSize: 12,
    width: width * 0.75

  }
})