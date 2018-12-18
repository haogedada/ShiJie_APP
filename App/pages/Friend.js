import React, {Component} from 'react'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FansAndConcernContain from '../components/friend/FansAndConcernContain';
import { getUserFansList, getUserFollowList } from '../netWork/api'
import Storage from '../util/AsyncStorageUtil'
import { DeviceEventEmitter,StyleSheet ,TouchableOpacity,Dimensions,View,Text} from 'react-native'
let { width, height } = Dimensions.get("window")
export default class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fansList: [],
            followList: [],
        }
    this.loadUserFriend = this.loadUserFriend.bind(this)
    this.refreshCallBack = this.refreshCallBack.bind(this)
    this.listenerLoadFriend = this.listenerLoadFriend.bind(this)
  }
  componentWillMount() {
    this.loadUserFriend()
  }
  componentDidMount() {
    this.listenerLoadFriend()
  }
  listenerLoadFriend() {
    DeviceEventEmitter.addListener('loadFriend', () => {
      this.loadUserFriend()
    })
    DeviceEventEmitter.addListener('clear_friend',()=>{
      this.setState({fansList:[],followList:[]})
    })
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener('loadFriend')
    DeviceEventEmitter.removeListener('clear_friend')
  }
  loadUserFriend() {
    getUserFollowList().then(_followList => {
      let newFollowList = [];
      _followList.data.forEach(item => {
        newFollowList.push({
          id: item.userId,
          name: item.userNickname,
          signature: item.bardianSign,
          avatar: item.headimgUrl
        })
      });
      this.setState({ followList: newFollowList })
    })
    getUserFansList().then(_fansList => {
      let newFansList = []
      _fansList.data.forEach(item => {
        newFansList.push({
          id: item.userId,
          name: item.userNickname,
          signature: item.bardianSign,
          avatar: item.headimgUrl
        })
      });
      this.setState({ fansList: newFansList})
    })
  }
  refreshCallBack(fansList, followList) {
    this.setState({ fansList: fansList, followList: followList })
  }
  render() {  
    return (
      <ScrollableTabView locked={false} tabBarUnderlineStyle={{ backgroundColor: '#1296db' }} tabBarActiveTextColor='#1296db'>
        <FansAndConcernContain refreshCallBack={this.refreshCallBack}
          data={this.state.fansList} tabLabel="粉丝" />
        <FansAndConcernContain locked={false} refreshCallBack={this.refreshCallBack}
          data={this.state.followList} tabLabel="关注" />
      </ScrollableTabView>
    )
  }
}
const styles =StyleSheet.create({
 
})