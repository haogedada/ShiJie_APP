import React, { Component } from 'react'
import ScrollableTabView  from 'react-native-scrollable-tab-view'
import FansAndConcernContain from '../components/friend/FansAndConcernContain';

export default class Friend extends Component {
  render() {
    return (
      <ScrollableTabView tabBarUnderlineStyle={{backgroundColor: '#1296db'}} tabBarActiveTextColor='#1296db'>
        <FansAndConcernContain data={modeData} tabLabel="粉丝"/>
        <FansAndConcernContain data={modeData} tabLabel="关注" />
      </ScrollableTabView>
    )
  }
}
// 模拟的数据
const modeData = [
  {
    id: 1,
    name: '小李',
    signature: '我是大神士大夫士大夫撒旦是阀手动速度速度阀手动阀手动发射点发射点发射点发射点阀手动是的发射点阀手动发第三方速度f',
    avatar: '/App/resources/images/router_flux/logo.png'
  },
  {
    id: 2,
    name: '里斯',
    signature: '里斯才是大神',
    avatar: '/App/resources/images/router_flux/logo.png'
  },
  
  
]