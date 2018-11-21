import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import {Actions} from 'react-native-router-flux'
let {width, height} = Dimensions.get("window")
export default class FansAndConcernItem extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <View>
      <TouchableOpacity style={styles.itemBoxStyle} onPress={()=>{
            Actions.person({'userId':this.props.dataItem.id})
      }}>
        <Image style={styles.avatar} source={{uri:this.props.dataItem.avatar}} />
        <View>
          <Text style={styles.nameStyle} numberOfLines={1}>{this.props.dataItem.name}</Text>
          <Text style={styles.signatureStyle} numberOfLines={1}>{this.props.dataItem.signature}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemBoxStyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#a5a5a5'
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