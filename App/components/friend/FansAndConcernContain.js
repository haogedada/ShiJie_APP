import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FansAndConcernItem from './FansAndConcernItem';

export default class FansAndConcernContain extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
    this.onRefresh.bind(this)
  }
  // 下拉刷新功能
  onRefresh () {
    this.setState({isRefreshing: true})
    // 请求数据
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
