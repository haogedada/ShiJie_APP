import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    DeviceEventEmitter,
    Button,
    StyleSheet,
    ScrollView,
    Alert,
    FlatList
} from 'react-native'
import {prompt} from "../util/Warning";
import {updateInfo} from "../netWork/api";

export default class UpdateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            sex: '',
            birthday: '',
            sign: "",
            imgfile: ''

        }
    }

    componentWillUnmount() {
        this.deEmitter.remove();
    }

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener("update", a => {
            this.setState({
                nickname: a.userNickName,
                sex: a.userSex,
                birthday: a.userBirthday,
                sign: a.bardianSign,
                imgfile: a.headimgUrl
            });
            alert("触发事件");
        });
    }

    render() {
        return (
            <View>
                <Text>修改个人信息</Text>
                <TouchableOpacity onPress={
                    () => {
                        this.setState({
                            imgfile: ''
                        });
                        alert("图片");
                    }
                }>
                    <Image style={updateStyle.updateImage}
                           source={{uri: this.state.imgfile}}/>
                </TouchableOpacity>
                <TextInput style={updateStyle.updateText} onChange={(text) => {
                    this.setState({
                        nickName: text
                    });
                }} defaultValue={this.state.nickname}/>
                <TextInput style={updateStyle.updateText} onChange={(text) => {
                    this.setState({
                        sex: text
                    });
                }} defaultValue={this.state.sex}/>
                <TextInput style={updateStyle.updateText} onChange={(text) => {
                    this.setState({
                        birthday: text
                    });
                }} defaultValue={this.state.birthday}/>
                <TextInput style={updateStyle.updateText} onChange={(text) => {
                    this.setState({
                        sign: text
                    });
                }}
                           defaultValue={this.state.sign}/>
                <TouchableOpacity onPress={() => {
                    Alert.alert("确认修改", "你想好了吗?", [
                        {
                            text: "确认", onPress: () => {
                                updateInfo({
                                    nickname: this.state.nickname,
                                    sex: this.state.sex,
                                    birthday: this.state.birthday,
                                    sign: this.state.sign,
                                    imgfile: this.state.imgfile
                                })
                            }
                        },
                        {
                            text: "取消", onPress: () => {

                            }
                        }
                    ])
                }
                }>
                    <Text>
                        确认修改
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const updateStyle = StyleSheet.create({
    updateText: {
        marginTop: 10,
        borderWidth: 1,
        borderBottomColor: "#6a6e6d"
    },
    updateImage: {
        height: 50,
        width:
            50,
        borderRadius:
            50,
        borderColor:
            "#ee2115",
        borderWidth:
            1
    }
})