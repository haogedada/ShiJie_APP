import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    BackAndroid,
    StyleSheet,
    Alert
} from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TabIcon from './components/tabIcon';
//导入各个界面page文件
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home';
import Types from './pages/Types';
import UploadVideo from './pages/UploadVideo';
import Friend from './pages/Friend';
import NotLogin from './pages/NotLogin';
import Me from './pages/Me';
import MeInfo from './pages/MeInfo'
import CustomNavBarView from './components/CustomNavBarView';
import UpdateInfo from './pages/UpdateInfo'
import UserMsg from './pages/UserMsg'
import {loadData} from './util/LoadDataUtil'
class AppRoot extends Component {
    static propTypes = {
        dispatch: PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    createReducer(params) {
        const defaultReducer = Reducer(params);
        return (state, action) => {
            this.props.dispatch(action);
            return defaultReducer(state, action);
        };
    }

    onExitApp() {
        BackAndroid.exitApp();
        return true;
    }

    render() {
        return (
            <Router onExitApp={this.onExitApp}
                createReducer={this.createReducer.bind(this)}
                scenes={scenes}
            >
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#fff',
        height: 64
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#fff'
    },
    titleStyle: {
        color: '#fff'
    },
    navStyle: {
        shadowRadius: 0
    }
})
const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        {/*登录*/}
        <Scene key="Login" component={Login} hideNavBar={false} title='登陆' navBar={CustomNavBarView} />
        {/*注册*/}
        <Scene key="Register" component={Register} hideNavBar={false} title='注册' navBar={CustomNavBarView} />
        {/*个人中心*/}
        <Scene key="MeInfo" component={MeInfo} hideNavBar={true} navBar={CustomNavBarView} />
        {/*修改人信息*/}
<<<<<<< HEAD
        <Scene key="UpdateInfo" component={UpdateInfo} hideNavBar={true} navBar={CustomNavBarView}/>
        <Scene key="UserMsg" component={UserMsg} hideNavBar={true} navBar={CustomNavBarView}/>
=======
        <Scene key="UpdateInfo" component={UpdateInfo} hideNavBar={true} navBar={CustomNavBarView} />
>>>>>>> haogedada
        <Scene key="notLogin" component={NotLogin} hideNavBar={false} title='未登录' navBar={CustomNavBarView} />
        <Scene key="userMsg" component={UserMsg} hideNavBar={false} title='修改资料' navBar={CustomNavBarView} />
        <Scene key="firstLogin" component={UserMsg} hideNavBar={false} title='请完善个人资料' navBar={CustomNavBarView} />
        <Scene key="tabbar"
            initial
            tabs={true}
            tabBarPosition="bottom"
            showLabel={false}
            tabBarOnPress={(action) => {
                let next = action.navigation.state.key
                loadData(next);
                Actions[next].call()
            }
            }
            tabBarStyle={styles.tabBarStyle}
            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
            titleStyle={styles.titleStyle}>
            {/*首页*/}
            <Scene key="home"
                hideNavBar={true}
                component={Home}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*分类*/}
            <Scene key="types"
                hideNavBar={true}
                component={Types}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*添加视屏按钮*/}
            <Scene key="uploadVideo"
                hideNavBar={true}
                component={UploadVideo}
                title='上传视频'
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*朋友*/}
            <Scene key="friends"
                hideNavBar={true}
                component={Friend}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*我的*/}
            <Scene key="me"
                hideNavBar={true}
                component={Me}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
        </Scene>
    </Scene>
)
export default connect()(AppRoot);