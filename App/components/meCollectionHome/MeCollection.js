import React, { Component } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, 
  Alert,RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { getCollections,cancelCollectVideo } from "../../netWork/api";
const { width, height } = Dimensions.get('window')
import {Actions} from 'react-native-router-flux'
export default class MeCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coll: []
    }
  }

  componentWillMount() {
    this.getFetch();
  }

  getFetch() {
    getCollections().then(req => {
      this.setState({
        coll: req.data
        ,isRefreshing:false
      });
    }
    )
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true
    });
      this.getFetch()
  }

  loadingView() {
    return this.state.coll.map((item, index) => {
      return (
        <View style={styles.showDatilsStyle} key={index}>
          <TouchableOpacity onPress={() => {
            Actions.video({ 'index': index+1,'videoList':this.state.coll})
          }}>
           <TouchableOpacity onPress={()=>{
               Alert.alert('提示', '你确定要取消收藏这个视频?',
                [{text: '确定', onPress: () =>{
                  cancelCollectVideo(item.videoId).then(res=>{
                      if(res.code===200){
                        Alert.alert('成功')
                        Actions.me()
                      }else{
                        Alert.alert(res.msg)
                      }
                    })}}, 
                {text: '取消', onPress: () =>{return}}])
            }}>
              <Text>取消收藏</Text>
            </TouchableOpacity>
            <Text style={styles.titleStyle}>{item.videoTitle}</Text>
            <View style={styles.imageBoxStyle}>
              <Image style={styles.ImageStyle}
                source={{ uri: item.videoCoverUrl }}
                resizeMode='cover' />
            </View>
            <View style={styles.msgStyle}>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/eye.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.playerCount}</Text>
              </View>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/top.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoTipNum}</Text>
              </View>
              <View style={styles.iconAndNumStyle}>
                <Image source={require('./../../resources/images/icon/trample.png')}
                  style={{ width: 20, height: 20, marginTop: 3 }} />
                <Text style={styles.textStyle}>{item.videoTrampleNum}</Text>
              </View>
              <View style={[styles.iconAndNumStyle, { flex: 8, justifyContent: 'flex-end' }]}>
                <Text style={{ color: '#fff', marginRight: 5 }}>{item.videoTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

      );
    });
  }

  render() {
    return (<View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />}
      >
        {this.loadingView()}
      </ScrollView>
    </View>);
  }
}
const styles = StyleSheet.create({
  showDatilsStyle: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10
  },
  imageBoxStyle: {

  },
  ImageStyle: {
    width: width - 20,
    height: (width - 20) / 2,
    borderRadius: 5
  },
  msgStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: -35,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  textStyle: {
    color: '#fff',
    lineHeight: 35,
    fontSize: 16
  },
  titleStyle: {
    color: '#fff',
    fontSize: 18,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1
  },
  iconAndNumStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  }
})