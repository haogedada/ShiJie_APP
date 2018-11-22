import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, RefreshControl, Alert,ListView } from 'react-native'
import { getUser, followUser } from '../netWork/api'
import VideoItem from './../components/VideoItem'
import { scaleSize, scaleFont } from './../util/Adaptive'
const { width, height } = Dimensions.get("window");
export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { videos: [] },
      isRefreshing: false
    }
    this.loadUser = this.loadUser.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }
  componentWillMount() {
    this.loadUser()
  }
  loadUser() {
    getUser(this.props.userId).then(res => {
      if (res.code === 200) {
        this.setState({
          userInfo: res.data,
          isRefreshing: false
        })
      }
    })
  }
  _onRefresh() {
    this.setState({
      isRefreshing: true
    })
    this.loadUser()
  }
  render() {
    let videoItem
    if (this.state.userInfo.videos.length > 0) {
      videoItem = this.state.userInfo.videos.map((item, index) => (<VideoItem key={index} video={item}
        videoList={this.state.userInfo.videos} videoIndex={index} />))
    } else {
      videoItem = () => (<View><Text>这个人好懒....没有作品</Text></View>)
    }
    return (
<<<<<<< HEAD
      <View style={styles.userInfo}>
       <View style={{alignContent:'center',justifyContent:'center'}}><Image style={{width:50,height:50}} source={{uri:this.state.userInfo.heardUrl}}/></View>
       <Text>昵称:{this.state.userInfo.nickName ==null ? `这个人好懒....什么都没写`:this.state.userInfo.nickName }</Text>
       <View style={styles.userInfo_num}>
       <Text>关注:{this.state.userInfo.followNum}</Text>
       <Text>粉丝:{this.state.userInfo.fansNum}</Text>
       <TouchableOpacity onPress={()=>{
         followUser(this.props.userId).then(res=>{
           if(res.code === 200){
            Alert.alert('关注成功')
           }else{
            Alert.alert(res.msg)
           }
         })
       }}>
         <Text>关注他</Text>
       </TouchableOpacity>
       </View>
       <View style={{height: 1,width: '100%', backgroundColor: 'lightgrey'}}></View>
       <View><Text>他的作品: {this.state.userInfo.videoNum}个</Text></View>
       <View style={{height: 1,width: '100%', backgroundColor: 'lightgrey'}}></View>
       <ScrollView
         refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#fff"
            progressBackgroundColor="#fff"
          />}
       >
         {videoItem}
       </ScrollView>
      </View>
=======
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh}
          tintColor="#fff"
          progressBackgroundColor="#fff"
        />}
    >
        <View style={styles.userInfo}>
          <View style={styles.coverStyle}>
            <Image style={styles.coverImgStyle}
              source={{ uri: this.state.userInfo.heardUrl }} />
          </View>
          <View style={styles.headStyle}>
            <Text style={styles.headTextStyle}>粉丝:{this.state.userInfo.fansNum}</Text>
            <Image style={styles.headImageStyle} source={{ uri: this.state.userInfo.heardUrl }} />
            <Text style={styles.headTextStyle}>关注:{this.state.userInfo.followNum}</Text>
          </View>
          <View style={styles.nameAndSignStyle}>
            <Text style={styles.nameStyle}>{this.state.userInfo.nickName == null ? `无名氏` : this.state.userInfo.nickName}</Text>
            <Text style={styles.signStyle}>{this.state.userInfo.bardianSign == null ? `这个人好懒....什么都没写` : this.state.userInfo.bardianSign}</Text>
          </View>
          <View style={styles.userInfo_num}>
            <TouchableOpacity onPress={() => {
              followUser(this.props.userId).then(res => {
                if (res.code === 200) {
                  Alert.alert('关注成功')
                } else {
                  Alert.alert(res.msg)
                }
              })
            }}>
              <Text style={styles.userInfoStyle}>关注</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 1, width: '100%', backgroundColor: 'lightgrey', }}></View>
          <View>
            <Text style={styles.herVideosStyle}>他有{this.state.userInfo.videoNum}个作品</Text>
          </View>
          <View style={{ height: 1, width: '100%', backgroundColor: 'lightgrey' }}></View>
            {videoItem}
        </View>
        </ScrollView>
>>>>>>> 944d08bfa995a3dd3b8dc7ad2d1b2a30d6d2f8b0
    )
  }
}
const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'column'
  },
  coverStyle: {
    position: 'absolute'
  },
  coverImgStyle: {
    width: width,
    height: scaleSize(400)
  },
  headStyle: {
    flexDirection: 'row',
    height: scaleSize(400),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headTextStyle: {
    color: '#fff',
    marginVertical: scaleSize(50),
    marginHorizontal: scaleSize(30),
    lineHeight: scaleSize(40),
    backgroundColor: 'red',
    paddingHorizontal: scaleSize(10),
    borderRadius: scaleSize(10),
    fontSize: scaleFont(18)
  },
  headImageStyle: {
    width: scaleSize(130),
    height: scaleSize(130),
    borderRadius: 50,
    marginVertical: scaleSize(20)
  },
  nameAndSignStyle: {
    padding: scaleSize(15),
    marginBottom: scaleSize(10)
  },
  nameStyle: {
    fontSize: scaleFont(45),
    color: '#000'
  },
  signStyle: {
    fontSize: scaleSize(40)
  },
  userInfo_num: {
    alignItems: 'center'
  },
  userInfoStyle: {
    fontSize: scaleFont(30),
    backgroundColor: 'red',
    color: '#fff',
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(10),
    borderRadius: scaleSize(10),
    marginBottom: scaleSize(20)
  },
  herVideosStyle: {
    textAlign: 'center',
    fontSize: scaleFont(30),
    paddingVertical: scaleSize(10)
  }
})
