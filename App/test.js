import React, {Component} from "react"
import {View, Text, Button} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class Test extends Component {
    render() {
        return (
            <View><Button
                onPress={() => {
                    alert("点击")
                    Actions.Login()
                }}
                title="登录"/>
            </View>
        );
    }
}