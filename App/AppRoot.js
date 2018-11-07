<<<<<<< HEAD
import React, {Component} from 'react';
=======
import React, { Component } from 'react';
>>>>>>> haogedada
import PropTypes from 'prop-types';
import {
    View,
    Text,
    BackAndroid,
    StyleSheet
} from 'react-native';
<<<<<<< HEAD
import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst} from 'react-native-router-flux';
import {connect} from 'react-redux';
import TabIcon from './components/tabIcon';
//导入各个界面page文件
import Hello from './pages/HelloWorldApp'
import Test from './test'

import Login from './pages/Login'
=======
import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import TabIcon from './components/tabIcon';
//导入各个界面page文件
import Hello from './pages/HelloWorldApp'
import Register from './pages/Register'
>>>>>>> haogedada

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
<<<<<<< HEAD
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
          this.props.dispatch(action);
          return defaultReducer(state, action);
        };
    }

    onExitApp(){
        BackAndroid.exitApp();
        return true;
    }
    render() {
        return (
            <Router onExitApp={this.onExitApp} 
                    createReducer={ this.createReducer.bind(this) }
                    scenes={ scenes }
             >       
            </Router >
        )
    }    
>>>>>>> haogedada
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#fff',
<<<<<<< HEAD
        height: 64
=======
        height:64
>>>>>>> haogedada
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#fff'
    },
    titleStyle: {
        color: '#fff'
<<<<<<< HEAD
    }
=======
    },
>>>>>>> haogedada
})

const scenes = Actions.create(
    <Scene key="root" hideNavBar={true}>
<<<<<<< HEAD
        {/*登录*/}
        <Scene key="Login" component={Login} hideNavBar={false} />
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
                   titleStyle={styles.titleStyle}/>        
            {/*分类*/}
            <Scene key="friends"
                   hideNavBar={true}
                   component={Hello}
                   icon={TabIcon}
                   titleStyle={styles.titleStyle}/>
            {/*添加视屏按钮*/}
            <Scene key="add"
                   hideNavBar={true}
                   component={Hello}
                   icon={TabIcon}
                   titleStyle={styles.titleStyle}/>
             {/*朋友*/}
            <Scene key="theaters"
                   hideNavBar={true}
                   component={Hello}
                   icon={TabIcon}
                   titleStyle={styles.titleStyle}/>
            {/*我的*/}
            <Scene key="me"
                   hideNavBar={true}
                   component={Test}
                   icon={TabIcon}
                   titleStyle={styles.titleStyle}/>
        </Scene>
=======
        <Scene key="register" component={Register} initial hideNavBar={true} />
        <Scene key="tabbar"
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
                    titleStyle={styles.titleStyle}/>

                <Scene key="movies"
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
>>>>>>> haogedada
    </Scene>
)
export default connect()(AppRoot);