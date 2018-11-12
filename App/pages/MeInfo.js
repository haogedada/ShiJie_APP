import React, {Component} from 'react'
import {ScrollView, DeviceEventEmitter,View, Image, Text, Button, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Storage from '../util/AsyncStorageUtil'

export default class MeInfo extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            msgInfo: ""
        }
    }

    async componentDidMount() {
        let msg = await Storage.get("infoMsg");
        this.setState({
            msgInfo: msg.data
        })
        console.log(
            "个人信息管理中心", msg
        );
    }

    render() {
        return (
            <View style={meInfoStyle.meInfoPrevent}>
                <View>
                    <Text> 用户头像</Text><Image style={meInfoStyle.userImage}
                                             source={{uri: this.state.msgInfo.headimgUrl}}/>
                    <Text>用户名:
                        <Text>{this.state.msgInfo.userNickname}</Text>
                    </Text>
                    <Text>邮箱:
                        <Text>{this.state.msgInfo.userEmail}</Text>
                    </Text>
                    <Text>出生日期:
                        <Text>{this.state.msgInfo.userBirthday}</Text>
                    </Text>
                    <Text>性别:
                        <Text>{this.state.msgInfo.userSex}</Text>
                    </Text>
                    <Text>出生日期:
                        <Text>{this.state.msgInfo.bardianSign}</Text>
                    </Text>
                </View>

                <Button title="注销登录" onPress={() => {
                    Storage.save("token", null);
                    Storage.save("infoMsg", null);
                    Actions.home();
                    DeviceEventEmitter.emit("exit","注销")
                }
                }/>
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