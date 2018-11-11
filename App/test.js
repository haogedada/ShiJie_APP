import React, {Component} from "react"
import {View, Text, Button,TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
export default class Test extends Component {
    render() {
        return (
            <View style={{flexDirection:'column'}}>
                <Button
                onPress={() => {
                    // alert("点击")
                    Actions.Login()
                }}
                title="登录"/>
                <Button
                onPress={() => {
                    Actions.userMsg()
                }}
                title="获取个人信息"/>
            </View>
            
        );
    }
}