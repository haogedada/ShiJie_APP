import React, { Component } from 'react'
import {
    Text, View, Modal, TouchableOpacity, Image, TextInput, Dimensions,
    Button, TouchableHighlight, StyleSheet, RefreshControl,Alert
} from 'react-native'
import { getVideo } from "../netWork/api"
import { Actions } from 'react-native-router-flux';
import * as Progress from 'react-native-progress';
let { width, height } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: "",
            videoUser: "",
            isRef: false,
        };
    }
    _show =()=>{
        this.refs.RNAlert && this.refs.RNAlert.show('标题','文本内容');
    }
    showProgressBar(){
        this.refs.RNProgressDialog && this.refs.RNProgressDialog.showProgressBar()
    }
 
    _sure=()=>{
      Alert.alert('点击了确定')
    }
    _cancel=()=>{
    Alert.alert('点击了取消')
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Progress.Bar progress={0.2} width={200} />
                <Progress.Pie progress={0.4} size={50} />
                <Progress.Circle size={30} indeterminate={true} />
                <Progress.CircleSnail color={['red', 'green', 'blue', 'yellow']} />
                <RNAlert ref='RNAlert' comformBtnTitle='确定' cancleBtnTitle={'取消'}
                        alertTitle={'文本标题'} alertContent={'content'} comformClik={() => { this._sure() }}
                        dissmissClick={() => { this._cancel() }}/>
                 <RNProgressDialog ref='RNProgressDialog' content={'上传中'} 
                 dissmissClick={() => { this._cancel() }} progress={0.3} btnTxt={'取消'}/>
                    <Text style={styles.welcome} onPress={() => this._show()}>
                        点我->弹出框 </Text>
                         <Text style={styles.welcome} onPress={() => this.showLoad()}>
                         点我->加载框 </Text>
                         <Text style={styles.welcome} onPress={() => this.showProgressBar()}>
                         点我->进度框 </Text>
                         </View>
                         
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },

})