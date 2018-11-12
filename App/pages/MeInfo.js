import React, {Component} from 'react'
import {ScrollView, View, Image, Text, Button, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class MeInfo extends Component {
    //构造函数
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={meInfoStyle.meInfoPrevent}>
                <View style={meInfoStyle.meInfoLogin}>
                    <Image style={meInfoStyle.meInfoImage} source={require('../resources/images/icon/add.png')}/>
                    <Text>MeInfo.js</Text>
                    <Button title="个人中心" onPress={() => {
                        Actions.Login();
                    }}/>
                    <Text>被关注人数:</Text>
                </View>
                <View style={meInfoStyle.meInfoFriend}>
                    <Text style={meInfoStyle.meInfoFocus} onPress={() => {

                    }}>我的关注</Text>
                    <Text style={meInfoStyle.meInfoFans} onPress={() => {

                    }}>我的粉丝</Text>
                </View>
            </View>
        );
    }
}
const meInfoStyle = StyleSheet.create({
    meInfoFocus: {
        height: 40,

        borderWidth: 1,
        borderColor: "#ff394a"
    },
    meInfoFans: {
        height: 40,
        borderColor: "#ff5fb2",
        borderWidth: 1


    },
    meInfoPrevent: {
        flex: 1
    },
    meInfoLogin: {
        flex: 2,

    }, meInfoFriend: {
        flex: 3,
        borderWidth: 1,
        borderColor: "#b1e7ff"
    },
    meInfoImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        borderColor: "#9ec6ff",
        borderWidth: 1
    }
});