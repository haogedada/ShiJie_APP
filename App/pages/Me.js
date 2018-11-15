import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    Button,
    PanResponder,
    DeviceEventEmitter,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    getUserInfo,
    getCollections,
    getHome
} from '../netWork/api';
import {
    Actions
} from 'react-native-router-flux';
import Storage from '../util/AsyncStorageUtil';
import MeHome from '../components/meCollectionHome/MeHome';
import MeCollection from '../components/meCollectionHome/MeCollection';
import ScrollableTabView, {
    ScrollableTabBar,
    DefaultTabBar
} from 'react-native-scrollable-tab-view';

let {
    width,
    height
} = Dimensions.get('window');
export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: false,
            userInfo: {},
            home: [],
            coll: [],
            homeVideo: [],
            collHome: true
        };
        this.getInfo = this.getInfo.bind(this);
        this.loadMyVideo = this.loadMyVideo.bind(this);
        this.listenerLoadUser = this.listenerLoadUser.bind(this)
    }
    componentWillMount() {
        this.getInfo();
        this.loadMyVideo();
    }

    componentDidMount() {
        this.listenerLoadUser()
        this.listenerLogin()
    }
    loadMyVideo() {
        //作品
        getHome().then((req) => {
            this.setState({
                home: req.data
            });
        });
    }

    // 组件销毁前移除事件监听 
    componentWillUnmount() {
        DeviceEventEmitter.removeListener('login')
        DeviceEventEmitter.removeListener('loadUser')
    }
    async getInfo() {
        let loginState = await Storage.get('loginState')
        if (loginState) {
            getUserInfo().then(info => {
                if (info) {
                    this.setState({ loginState: true, userInfo: info.data })
                }
            })
        } else {
            this.setState({ loginState: false })
        }
    }

    listenerLoadUser() {
        DeviceEventEmitter.addListener("loadUser", () => {
            this.getInfo()
            this.loadMyVideo()
        })
    }
    listenerLogin() {
        DeviceEventEmitter.addListener("login", () => {
            this.setState({ loginState: true })
            this.getInfo()
        });
    }
    render() {
        let login = (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3 }}>
                    <TouchableOpacity onPress={
                        () => {
                            Actions.userMsg();
                        }
                    }>
                        <Image source={{ uri: this.state.userInfo.headimgUrl }} style={meStyle.noLoginImage} />
                        <Text>
                            {this.state.userInfo.userNickname}
                        </Text>
                    </TouchableOpacity>
                    <Text>{this.state.userInfo.bardianSign} </Text>
                    <Button title="注销" onPress={() => {
                        Storage.save('loginState', false);
                        Storage.save('user', null);
                        Storage.save('token', null);
                        this.setState({
                            loginState: false
                        });
                    }} />
                </View>
                <View style={{ flex: 1, backgroundColor: "#000" }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    collHome: true
                                });
                            }}>
                                <Text style={meStyle.home}>
                                    我的作品
                                </Text>
                            </ TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    collHome: false
                                });
                            }}>
                                <Text style={meStyle.coll}>
                                    我的收藏
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 5 }}>
                    {this.state.collHome ? <MeHome home={this.state.home} /> : <MeCollection />}
                </View>
            </View>
        );
        let noLogin = (
            <View>
                <TouchableOpacity onPress={() => {
                    Actions.Login();
                }}>
                    <Image style={meStyle.noLoginImage} source={require('../resources/images/icon/me.png')} />
                    <Text> 登录/注册 </Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <View style={{ flex: 1 }}>
                {this.state.loginState ? login : noLogin}
            </View>
        );
    }
}
const meStyle = StyleSheet.create({
    noLoginImage: {
        height: 60,
        width: 60,
        borderWidth: 1,
        borderColor: '#ee2115',
        borderRadius: 50
    },
    coll: {
        height: 30,
        lineHeight: 30,
        width: width / 2,
        textAlign: 'center',
        backgroundColor: '#6a6e6d',
        color: '#fff'
    },
    home: {
        backgroundColor: '#9ec6ff',
        color: '#6a6e6d',
        height: 30,
        lineHeight: 30,
        width: width / 2,
        textAlign: 'center'
    },
    collList: {
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 3,
        borderRadius: 4
    }
});