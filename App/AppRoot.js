import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  BackAndroid,
  StyleSheet
} from 'react-native';
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TabIcon from './components/tabIcon';
//导入各个界面page文件
import Hello from './pages/HelloWorldApp'

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
      </Router >
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
    <Scene key="hello" component={Hello} title="首页" hideNavBar={true} />
    <Scene key="tabbar"
      initial
      tabs={true}
      tabBarPosition="bottom"
      showLabel={false}
      tabBarStyle={styles.tabBarStyle}
      tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
      titleStyle={styles.titleStyle}>
      <Scene key="home"
        hideNavBar={true}
        component={Hello}
        icon={TabIcon}
        titleStyle={styles.titleStyle} />
      <Scene key="friends"
        hideNavBar={true}
        component={Hello}
        icon={TabIcon}
        titleStyle={styles.titleStyle} />
      <Scene key="add"
        hideNavBar={true}
        component={Hello}
        icon={TabIcon}
        titleStyle={styles.titleStyle} />
      <Scene key="theaters"
        hideNavBar={true}
        component={Hello}
        icon={TabIcon}
        titleStyle={styles.titleStyle} />

      <Scene key="me"
        hideNavBar={true}
        component={Hello}
        icon={TabIcon}
        titleStyle={styles.titleStyle} />
    </Scene>
  </Scene>
)
export default connect()(AppRoot);