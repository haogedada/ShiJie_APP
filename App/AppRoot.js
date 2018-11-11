import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BackAndroid,
    StyleSheet
} from 'react-native';
import {
    Scene, Router, TabBar, Tabs, Modal, Schema, Actions, Reducer, ActionConst
    ,Stack


} from 'react-native-router-flux';
import { connect } from 'react-redux';
import TabIcon from './components/tabIcon';
//导入各个界面page文件
import Hello from './pages/HelloWorldApp'
import Test from './test'
import Register from './pages/Register'
import Login from './pages/Login'
import Friend from './pages/Friend'
import UserMsg from './pages/UserMsg'
import FriendList from './components/Friend/FriendList'

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
    }
})
const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
        {/*登录*/}
        <Scene key="Login" component={Login} hideNavBar={false} />
        <Scene key="Register" component={Register} hideNavBar={false} />
        <Scene key="userMsg" component={UserMsg} hideNavBar={false} />
        <Scene key="tabbar"
            initial
            tabs={true}
            tabBarPosition="bottom"
            showLabel={false}
            tabBarStyle={styles.tabBarStyle}
            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
            titleStyle={styles.titleStyle}>
            {/*首页*/}
            <Scene key="home"
                hideNavBar={true}
                component={Hello}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*分类*/}
            <Scene key="types"
                hideNavBar={true}
                component={Hello}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*添加视屏按钮*/}
            <Scene key="uploadVideo"
                hideNavBar={true}
                component={Hello}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
            {/*朋友*/}
            <Scene key="friends"
                hideNavBar={true}
                component={Friend}
                icon={TabIcon}
                titleStyle={styles.titleStyle}
 
            >
              
            </Scene>
            {/*我的*/}
            <Scene key="me"
                hideNavBar={true}
                component={Test}
                icon={TabIcon}
                titleStyle={styles.titleStyle} />
        </Scene>
    </Scene>
)
export default connect()(AppRoot);