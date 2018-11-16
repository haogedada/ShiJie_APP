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
    DeviceEventEmitter,
    Dimensions,
    TouchableOpacity,
     RefreshControl
} from 'react-native';
import {
    getUserInfo,
    getHome
} from '../netWork/api';
import {
    Actions
} from 'react-native-router-flux';
import Storage from '../util/AsyncStorageUtil';
import MeHome from '../components/meCollectionHome/MeHome';
import MeCollection from '../components/meCollectionHome/MeCollection';

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
            collHome: true,
            isRef: false,
            isSwitch: true
        };
        this.getInfo = this.getInfo.bind(this);
        this.loadMyVideo = this.loadMyVideo.bind(this);
        this.listenerLoadUser = this.listenerLoadUser.bind(this)
        this.listenerLogin = this.listenerLogin.bind(this)
        this.onRefreshLoading = this.onRefreshLoading.bind(this)
    }
    componentWillMount() {
        this.getInfo();
        this.loadMyVideo();
    }

    componentDidMount() {
        this.listenerLoadUser()
        this.listenerLogin()
    }
    // 组件销毁前移除事件监听 
    componentWillUnmount() {
        DeviceEventEmitter.removeListener('login')
        DeviceEventEmitter.removeListener('loadUser')
    }
    loadMyVideo() {
        //作品
        getHome().then((req) => {
            this.setState({
                home: req.data
            });
        });
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

    /**
     * 刷新页面
     */
    onRefreshLoading() {
        this.setState({isRef: true});
        setTimeout(() => {
            console.log("等待2s");
            this.setState({isRef: false})
        }, 2000);
    }

    render() {
        let coll;
        let home;
        if (this.state.collHome) {
            coll = {
                // backgroundColor: '#9ec6ff',
                color: '#515dff',
                lineHeight: 36,
                textAlign: 'center',
                borderBottomWidth: 2,
                borderColor: "#515dff"
            }
            home = {
                // backgroundColor: '#9ec6ff',
                color: '#6a6e6d',
                lineHeight: 36,
                textAlign: 'center'
                // borderBottomWidth: 2,
                // borderColor: "#6a6e6d"
            }
        } else {
            home = {
                // backgroundColor: '#9ec6ff',
                color: '#515dff',
                lineHeight: 36,
                textAlign: 'center',
                borderBottomWidth: 2,
                borderColor: "#515dff"
            }
            coll = {
                // backgroundColor: '#9ec6ff',
                color: '#6a6e6d',
                lineHeight: 36,
                textAlign: 'center'
                // borderBottomWidth: 2,
                // borderColor: "#6a6e6d"
            }
        }
        let login = (
            <View style={meStyle.loginBoxStyle}>
                <View style={meStyle.headerBox}>
                    <TouchableOpacity onPress={() => {
                        Actions.userMsg()
                    }}
                        style={meStyle.headerLeftStyle}>
                        <Image source={{ uri: this.state.userInfo.headimgUrl }} style={meStyle.noLoginImage} />
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: '500' }}>{this.state.userInfo.userNickname}</Text>
                            <Text>{this.state.userInfo.bardianSign} </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center' }}>
                        <Button title="注销" onPress={() => {
                            Storage.save('loginState', false);
                            Storage.save('user', null);
                            Storage.save('token', null);
                            this.setState({
                                loginState: false
                            });
                        }} />
                    </View>
                </View>
                <View style={{ height: 36, width: width * 0.85, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ collHome: true })
                        }}>
                            <Text style={coll}>我的作品</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ collHome: false })
                        }}>
                            <Text style={home}>我的收藏</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <ScrollView
                        refreshControl={<RefreshControl
                            refreshing={this.state.isRef}
                            onRefresh={
                                this.onRefreshLoading.bind(this)
                            }
                        />
                        }
                    >
                        {this.state.collHome ? <MeHome home={this.state.home} /> : <MeCollection />}
                    </ScrollView>
                </View>
            </View>
        );
        let noLogin = (
            <View style={{ marginTop: 10, paddingBottom: 10, borderBottomWidth: 0.5 }}>
                <TouchableOpacity onPress={() => {
                    Actions.Login();
                }}
                    style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
                    <Image style={meStyle.noLoginImage} source={require('../resources/images/icon/me.png')} />
                    <Text style={{ fontSize: 17 }}> 登录/注册 </Text>
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
        borderRadius: 50,
        marginRight: 15
    },
    coll: {
        lineHeight: 36,
        textAlign: 'center',
        // backgroundColor: '#6a6e6d',
        color: '#6a6e6d'
    },
    home: {
        // backgroundColor: '#9ec6ff',
        color: '#6a6e6d',
        lineHeight: 36,
        textAlign: 'center'
    },
    collList: {
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 3,
        borderRadius: 4
    },
    loginBoxStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.85,
        borderBottomWidth: 0.5,
        marginBottom: 15
    },
    headerLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});