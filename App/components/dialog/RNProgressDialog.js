import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
export default class RNProgressDialog extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isShow: false,
        })
    }
    render() {
        if (!this.state.isShow) {
            return (<View></View>);
        } else {
            return (
                <Modal
                    visible={this.state.isShow}
                    //显示是的动画默认none
                    //从下面向上滑动slide
                    //慢慢显示fade
                    animationType={'fade'}
                    //是否透明默认是不透明 false
                    transparent={true}
                    //关闭时调用
                    onRequestClose={() => { }}>
                    <View style={styles.container}>
                        <View style={styles.AlertView}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 35 }}>
                                <Progress.Bar progress={(this.props.progress/100)} width={200} />
                                <Text style={{ fontSize: 16, color: 'grey',paddingTop:2 }}>{this.props.progress + "%"}</Text>                            
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: 45,paddingTop:5 }}>
                                <Text style={{ fontSize: 18 }}>{this.props.content}</Text>
                            </View>
                            <View style={{height: 1,width: '100%', backgroundColor: 'lightgrey'}}></View>
                             <TouchableOpacity onPress={() => { this.dissmiss(0.5); this.props.dissmissClick ? this.props.dissmissClick() : null }} 
                                style={{width:'100%', height: 40, justifyContent: 'center', alignItems: 'center'}}>
                               <Text style={{ fontSize: 18, color: 'red', justifyContent: 'center', alignItems: 'center' }}>
                               取消</Text>
                             </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )
        };
    }
    //显示
    showProgressBar() {
        this.setState({
            isShow: true,
        })
    }
    //消失弹窗
    dissmiss = (delay) => {
        // 延时0.5,据说体验比较好
        let duration = 0;
        if (delay == null || delay <= 0) {
            duration = 3;
        } else {
            duration = delay;
        }
        this.timer = setTimeout(() => {
            this.setState({
                isShow: false,
            });
            this.timer && clearTimeout(this.timer);
        }, duration * 1000);
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    AlertView: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        height: 160,
        marginLeft: 30,
        marginRight: 30,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center'
    }
})