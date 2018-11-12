import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
<<<<<<< HEAD
  View,
  Text,
  BackAndroid,
  StyleSheet
} from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
=======
    BackAndroid,
    StyleSheet
} from 'react-native';
import {
    Scene, Router, TabBar, Tabs, Modal, Schema, Actions, Reducer, ActionConst
    ,Stack


} from 'react-native-router-flux';
>>>>>>> haogedada
import { connect } from 'react-redux';
import TabIcon from './components/tabIcon';
//导入各个界面page文件
import Register from './pages/Register'
import Login from './pages/Login'
<<<<<<< HEAD
import Home from './pages/Home';
import Types from './pages/Types';
import UploadVideo from './pages/UploadVideo';
import Friend from './pages/Friend';
import Me from './pages/Me';
import CustomNavBarView from './components/CustomNavBarView';
=======
import UserMsg from './pages/UserMsg'


>>>>>>> haogedada
class AppRoot extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

<<<<<<< HEAD
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
=======
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
>>>>>>> haogedada
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
<<<<<<< HEAD
  <Scene key="root" hideNavBar={true}>
    {/*登录*/}
    <Scene key="Login" component={Login} hideNavBar={false} title='登陆' navBar={CustomNavBarView} />
    <Scene key="Register" component={Register} hideNavBar={false} title='注册' navBar={CustomNavBarView} />
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
=======
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
                component={Hello}
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
>>>>>>> haogedada
    </Scene>
  </Scene>
)
export default connect()(AppRoot);