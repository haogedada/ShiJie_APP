import React, {Component} from 'react'
import {Text, View, ScrollView,TouchableOpacity, Image, Button, FlatList, WebView,StyleSheet,RefreshControl} from 'react-native'
import Storagge from '../util/AsyncStorageUtil'
import {getVideo} from "../netWork/api"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: "",
            videoUser: "",
            isRef:false
        };
    }

   componentWillMount(){
      this.video();
   }
   video(){
        getVideo(2).then(req=>{
            console.log("视频:",req);
        });
   }
   onRef(){
       this.setState({
           isRef:true
       });
     setTimeout(()=>{
         console.log("首页刷新");
         this.setState({isRef:false});
     },2000);
   }
   
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView  
                refreshControl={<RefreshControl
                refreshing={this.setState.isRef}
                onRefresh={()=>this.onRef.bind(this)}
                tintColor='gary'
                />}>
               <Button  title='播放视频'/>
                </ScrollView>
            </View>
        )
    }
}
const homStyle=StyleSheet.create({})