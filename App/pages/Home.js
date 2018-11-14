import React, {Component} from 'react'
import {Text, View, ScrollView,TouchableOpacity, Image, Button, FlatList, WebView,RefreshControl} from 'react-native'
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
        getVideo().then(req=>{
            console.log("视频:",req);
        });
   }
   onRef(){
       this.setState({
           isRef:true
       });
       setTimeout(()=>{
            this.loading();
           this.setState({
               isRef:false
           });
       },2000)
   }
loading(){
    alert("刷新");
}
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView  refreshControl={<RefreshControl
                refreshing={this.setState.isRef}
                onRefresh={()=>this.onRef()}
                tintColor='gary'
                />}>
                  <View>
                      <Text>1231546131</Text>
                      <Text>1231546131</Text>
                      <Text>1231546131</Text>
                  </View>
                </ScrollView>
            </View>
        )
    }
}
