import React, { Component } from 'react'
import { Text, View, FlatList,Alert } from 'react-native'
import FansAndConcernItem from './FansAndConcernItem';
import { getUserFansList, getUserFollowList } from '../../netWork/api'

export default class FansAndConcernContain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false,
      fansList: [],
      followList: [],
    }
    this.onRefresh = this.onRefresh.bind(this)
   this.loadUserFriend = this.loadUserFriend.bind(this)
  }
//请求数据
 async loadUserFriend() {
  getUserFollowList().then(_followList=>{
    let newFollowList = [];
    _followList.data.forEach(item => {
      newFollowList.push({
        id: item.userId,
        name: item.userNickname,
        signature: item.bardianSign,
        avatar: item.headimgUrl
      })
    });
    this.setState({followList: newFollowList})
  })
     getUserFansList().then(_fansList=>{
      let newFansList = []
      _fansList.data.forEach(item => {
        newFansList.push({
          id: item.userId,
          name: item.userNickname,
          signature: item.bardianSign,
          avatar: item.headimgUrl
        })
      });
      this.setState({fansList:newFansList})
     })
}
  // 下拉刷新功能
  onRefresh () {
    // 请求数据
    this.loadUserFriend()
    if(this.state.fansList.length>0&&
      this.state.followList.length>0){
      this.props.refreshCallBack(this.state.fansList,this.state.followList)
      this.setState({isRefreshing:false})
    }else{
      this.setState({isRefreshing:false})
    }
  }
  render() {
    _keyExtractor = (item, index) => index;
    return (
      <FlatList
      data={this.props.data}
      renderItem={({item}) => <FansAndConcernItem dataItem={item}/>}
      keyExtractor={item => item.id.toString()}
      refreshing={this.state.isRefreshing}
      onRefresh={this.onRefresh}
    />
    )
  }
}
