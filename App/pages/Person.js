import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,Image,TouchableOpacity,ScrollView,RefreshControl } from 'react-native'
import {getUser,followUser} from '../netWork/api'
const { width, height } = Dimensions.get("window");
export default class Person extends Component {
  constructor(props){
    super(props);
    this.state ={
      userInfo:{videos:[]},
      isRefreshing:false
    }
    this.loadUser = this.loadUser.bind(this)
  }
  componentWillMount(){
    this.loadUser()
  }
  loadUser(){
   getUser(this.props.userId).then(res=>{
     if(res.code===200){
       this.setState({
         userInfo:res.data,
         isRefreshing:false
       })
     }
   })
  }
  _onRefresh(){
    this.loadUser()
  }
  render() {
    let videoItem
    if(this.state.userInfo.videos.length>0){
      videoItem = this.state.userInfo.videos.map((item,index) =>( <VideoItem key={index} video={item} />)) 
    }else{
      videoItem =()=>(<View><Text>这个人好懒....没有作品</Text></View>)
    }
    return (
      <View style={styles.userInfo}>
       <View style={{alignContent:'center',justifyContent:'center'}}><Image style={{width:50,height:50}} source={{uri:this.state.userInfo.heardUrl}}/></View>
       <Text>昵称:{this.state.userInfo.nickName ==null ? `这个人好懒....`:this.state.userInfo.nickName }</Text>
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
    )
  }
}
const styles = StyleSheet.create({
  userInfo:{
    flexDirection:'column'
  },
  userInfo_num:{
    flexDirection:'row'
  },
})
