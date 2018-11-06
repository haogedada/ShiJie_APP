import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
          <View style={{flex:1,alignItems: 'center',justifyContent:'center'}}>
          <Text>Hello world!</Text> 
               <Text style={{fontSize:20}}>首页</Text>
           </View>
    );
  }
}
