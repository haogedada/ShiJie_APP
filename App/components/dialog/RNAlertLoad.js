import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
export default class RNAlertLoad extends Component {
  constructor(props){
    super(props);
    this.state = ({
      isShow:false,
    })
  }
  render() {
      if (!this.state.isShow) {
          return (<View></View>);
      }else {
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
                  onRequestClose={() => {}}>
                  <View style = {styles.container}>
                      <View style = {styles.AlertView}>
                          <View style = {{justifyContent:'center', alignItems:'center', height:30}}>
                          <Progress.CircleSnail color={['red', 'green', 'blue', 'yellow']} />
                          </View>
                          <View style = {{justifyContent:'center', alignItems:'center', height:50}}>
                          <Text style = {{fontSize:16, color:'grey'}}>{this.props.content}</Text>
                          </View>
                      </View>
                  </View>
              </Modal>
          )
      };
  }
  //显示
  showLoad(){
    this.setState({
        isShow:true, 
    })
  }
  //消失弹窗
    dissmiss = (delay) => {
    // 延时0.5,据说体验比较好
        let duration = 0;
        if (delay == null || delay <= 0){
            duration = 3;
        }else {
            duration = delay;
        }
        this.timer = setTimeout(() => {
            this.setState({
                isShow:false,
            });
            this.timer && clearTimeout(this.timer);
        },duration*1000);
    }
}
const styles = StyleSheet.create({
    container:{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      flex:1,
      backgroundColor:'rgba(0,0,0,0.5)',
    },
    AlertView:{
      backgroundColor:'white',
      borderRadius:10,
      borderWidth:1,
      height:140,
      marginLeft:30,
      marginRight:30,
      borderColor:'lightgrey',
      justifyContent: 'center',
      alignItems:'center'
    }
})