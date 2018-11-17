import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, DeviceEventEmitter } from "react-native"
import { Actions } from 'react-native-router-flux'

const { height, width } = Dimensions.get("window");
export default class ShowDatils extends Component {
  constructor(props) {
    super(props);
  }

  showDetails() {
    let data = this.props.data.list;
    // console.log("data数据:", data);
    let dataList = [];
    let userDate = [];
    return data.map((item, index) => {
      return (
        <View style={styles.showDatilsStyle} key={index}>
          <TouchableOpacity onPress={() => {
            Actions.ClickVideoShowDetails();
            DeviceEventEmitter.emit("left", data);
          }}>
            {/* <Text>昵称:{item.videoBean.userBean.userNickname}</Text> */}
            {/* <Text>描述:{item.videoBean.videoContent}</Text> */}
            <Text style={styles.titleStyle}>{item.videoBean.videoTitle}</Text>
            <View style={styles.imageBoxStyle}>
              <Image style={styles.ImageStyle}
                source={{ uri: item.videoBean.videoCoverUrl }}
                resizeMode='cover' />
            </View>
            <View style={styles.msgStyle}>

              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/eye.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoBean.playerCount}</Text>
              </View>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/top.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoBean.videoTipNum}</Text>
              </View>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/trample.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoBean.videoTrampleNum}</Text>
              </View>
              <View style={[styles.iconAndNumStyle, { flex: 8, justifyContent: 'flex-end' }]}>
                <Text style={{ color: '#fff', marginRight: 5 }}>{item.videoBean.videoTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    })
  }

  render() {
    return (
      <View>
        {this.showDetails()}
      </View>);
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
  }
})