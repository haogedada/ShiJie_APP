import React, {Component} from 'react'
import {View, FlatList, Text,RefreshControl, Image, ScrollView, TouchableOpacity, Button, StyleSheet, Dimensions} from 'react-native'
import {getTypes, getVideoTypesCount} from "../netWork/api";
import Video from 'react-native-video';

const {
    width,
    height
} = Dimensions.get('window');
const titleList = [""]
export default class Classification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: [],
            //所有视屏
            videoTypeList: [],
            //分类视屏
            videoList: [],
            isRef:false
         
        };
     
    }
    componentWillMount() {
// 标题
        getTypes().then(item => {
            let keyValue = [];
            console.log(item.data);
            let type = item.data;
            for (let i of type) {
                // console.log("类型:", i);
                let spilt = i.split(":");
                // console.log("拆分:", spilt[0], spilt[1]);
                keyValue.push({
                    id: spilt[0],
                    name: spilt[1]
                })
            }
            this.setState({
                typeList: keyValue
            });
        });
        //视屏
        getVideoTypesCount().then(req => {
            this.setState({
                videoTypeList: req.data.videoTypeList
            });
        })
    }

    /**
     * 显示分类列表属性
     * @returns {*}
     */
    titleData() {
        let title = this.state.typeList;

        return title.map(item => {
            // console.log(item.id);
            return (<Text onPress={() => {
                this.titleClick(item);
            }} key={item.id} style={classStyle.classTitleText}>{item.name}</Text>);
        });
    }



  
    titleClick(item) {
        console.log("点击的元素", item.name,item.id);
    }
    /**
     * 刷新页面
     */
    onRefreshLoaging(){
    this.setState({isRef:true});
        setTimeout(()=>{
            console.log("等待2s");
          this.setState({isRef:false})
        },2000);   
    
    }
    render() {
        return (
            <View style={{flex: 1}}>
            {/* 标题栏 */}
                <View style={{flex: 1}}>
                    <ScrollView 
                    style={classStyle.classTitle}
                     showsHorizontalScrollIndicator={false} 
                     horizontal={true}>
                        {this.titleData()}
                    </ScrollView>
                </View>
                {/* 数据 */}
                <View style={{flex: 9}}>
                    <ScrollView 
                    refreshControl={ <RefreshControl
                    refreshing={this.state.isRef}
                    onRefresh={
                        this.onRefreshLoaging.bind(this)
                    }
                    tintColor='#fff'
                    
                    />} >
                   
                    </ScrollView>
                </View>
            </View>
        );
    }
}
const classStyle = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    infoImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#000"
    },
    allImage: {
        height: 10,
        width: 10
    },
    parentVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    childVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    parent: {
        borderColor: "#fff",
        borderWidth: 1,

    },
    child: {
        borderColor: "#ee2115",
        borderWidth: 1,
        marginTop: 5
    },
    outer: {
        borderColor: "#9ec6ff",
        borderWidth: 1
    },
    title: {
        flex: 1,
        backgroundColor: '#73c0ff',
        textAlign: "center",
        lineHeight: 40,
        height: 40,
        borderColor: "#ee2115",
        borderWidth: 2
    },


    classText: {
        height: 40,
        lineHeight: 40,
        backgroundColor: "#ff5fb2",
        color: "#fff"
    },
    classTitle: {
        backgroundColor: "#73c0ff",
        maxHeight: 30
    },
    classTitleText: {
        width: width/4,
        height: 30,
        lineHeight: 30,
        textAlign: "center",
        borderColor: "#fff",
        borderWidth: 1
    }
});