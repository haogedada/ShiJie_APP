import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import {promptUserMsg} from '../netWork/api'
class HelloWorldApp extends Component {
  constructor(props) {
    super(props)
   
  }
  render() {
    function test(){
      promptUserMsg()
    }
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button  title="Hello world!" onPress={test  }/>
        <Text style={{ fontSize: 20 }}>11</Text>
      </View>
    );
  }
}
export default (HelloWorldApp)
