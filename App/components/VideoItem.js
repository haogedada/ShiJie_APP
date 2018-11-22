import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { scaleSize, scaleFont } from './../util/Adaptive'
const { width, height } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'

export default class VideoItem extends Component {
  render() {
    return (
      <View style={homeStyle.videoItemStyle}>
        <View style={homeStyle.coverStyle}>
          <Text style={homeStyle.videoTitleStyle}>{this.props.video.videoTitle}</Text>
          <TouchableOpacity onPress={() => {
            Actions.video({ index: this.props.videoIndex + 1, videoList: this.props.videoList })
          }}>
            <Image style={homeStyle.coverImgStyle}
              source={{ uri: this.props.video.videoCoverUrl }}
              resizeMode='cover'
            />
          </TouchableOpacity>
        </View>
        <View style={homeStyle.textBoxStyle}>
          <View style={homeStyle.userMsgStyle}>
            <Image source={{ uri: this.props.video.userBean.headimgUrl }}
              style={homeStyle.headStyle} />
            <Text style={homeStyle.userNameStyle}>{this.props.video.userBean.userNickname}</Text>
          </View>
          <View style={homeStyle.msgRightBoxStyle}>
            <View style={homeStyle.topStyle}>
              <Image source={require('./../resources/images/icon/top_select.png')}
                style={homeStyle.topImageStyle} />
              <Text style={homeStyle.topTextStyle}>{this.props.video.videoTipNum}</Text>
            </View>
            <View style={homeStyle.trampleStyle}>
              <Image source={require('./../resources/images/icon/tread_select.png')}
                style={homeStyle.trampleImageStyle} />
              <Text style={homeStyle.trampleTextStyle}>{this.props.video.videoTrampleNum}</Text>
            </View>
            <View style={homeStyle.timeStyle}>
              <Text style={homeStyle.timeTextStyle}>时长: {this.props.video.videoTime}</Text>
            </View>
          </View>

        </View>

      </View>
    )
  }
}

const homeStyle = StyleSheet.create({
  viewPager: {
    flex: 9
  },
  pageStyle: {
    alignItems: 'center',
  },
  titleView: { flex: 1 },
  titleContent: {
    height: 50,
    textAlign: "center",
    textAlignVertical: "center"
  },
  search: {
    height: 40,
    width: 40
  },
  barOuter: {
    flex: 1
  },
  barTitle: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "#515dff"
  },
  barContent:
  {
    flex: 9,
    backgroundColor: "#515dff"
  },
  videoItemStyle: {
    flex: 1,
    flexDirection: 'column',
    padding: scaleSize(10),
    marginVertical: scaleSize(10),
    backgroundColor: '#fff',
    borderRadius: 8
  },
  coverStyle: {

  },
  videoTitleStyle: {
    color: '#fff',
    fontSize: scaleFont(25),
    zIndex: 1,
    position: 'absolute',
    top: scaleSize(10),
    left: scaleSize(10),
    right: scaleSize(10)
  },
  coverImgStyle: {
    width: width - scaleSize(20),
    height: (width - scaleSize(20)) / 2,
    borderRadius: 5
  },
  textBoxStyle: {
    flexDirection: 'row',
    paddingVertical: scaleSize(10),
    justifyContent: 'space-between'
  },
  userMsgStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headStyle: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: 25
  },
  userNameStyle: {
    marginLeft: scaleSize(8),
    fontSize: scaleFont(20)
  },

  msgRightBoxStyle: {
    flexDirection: 'row',
  },
  topStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trampleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleSize(25)
  },
  timeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleSize(25)
  },
  topImageStyle: {
    width: scaleSize(50),
    height: scaleSize(50)
  },
  trampleImageStyle: {
    width: scaleSize(50),
    height: scaleSize(50)
  },
  topTextStyle: {
    fontSize: scaleFont(20)
  },
  trampleTextStyle: {
    fontSize: scaleFont(20)
  },
  timeTextStyle: {
    fontSize: scaleFont(20)
  }
})