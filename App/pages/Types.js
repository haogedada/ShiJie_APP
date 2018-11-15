import React, {Component} from 'react'
import {
    View,
    FlatList,
    Text,
    RefreshControl,
    Image,
    ScrollView,
    TouchableOpacity,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native'
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
            typeKey: [],
            typeValue: [],
            isRef: false,
            selectColor: []
        }
        ;

        this.selectedIndex = 0
    }

    componentWillMount() {
        // 标题
        getTypes().then(item => {
            //key
            let titleKey = [];
            //value
            let titleValue = [];
            console.log(item.data);
            let type = item.data;
            for (let i of type) {
                // console.log("类型:", i);
                let spilt = i.split(":");
                // console.log("拆分:", spilt[0], spilt[1]);
                titleKey.push(spilt[0])
                titleValue.push(spilt[1])
            }
            let sortKey = [];
            let sortValue = [];
            let userSelectColor = [];
            for (let i = 0; i < titleValue.length; i++) {
                if (i === 0) {
                    userSelectColor.push("#9ec6ff")
                } else {
                    userSelectColor.push("#ff5fb2")
                }
            }

            //倒序
            for (let i = titleValue.length - 1; i > 0; i--) {

                sortKey.push(titleKey[i]);
                sortValue.push(titleValue[i])
            }

            this.setState({
                typeKey: sortKey,
                typeValue: sortValue,
                selectColor: userSelectColor
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
        let key = this.state.typeKey;
        let value = this.state.typeValue;
        let color = this.state.selectColor;
        let tipsArray = new Array();

        for (let i = 0; i < key.length; i++) {
            let index = i;
            let element = (<Text
                onPress={() => {
                    let selecteds = new Array();
                    for (let i = 0; i < value.length; i++) {
                        if (i === index) {
                            selecteds.push("rgb(0,0,0)")
                        } else {
                            selecteds.push("rgb(111,111,111)")
                        }
                    }
                    this.selectedIndex = index;
                    this.setState({
                        userSelectColor: selecteds
                    });
                    if (index < key - 4) {
                        this.refs.scrollView.scrollTo({x: width / 4 * index, animated: true})
                    } else {
                        this.refs.scrollView.scrollToEnd({animated: true})
                    }
                }
                }
                key={index} style={[classStyle.classTitleText, {color: this.state.selectColor[index]}]}
            >
                {value[i]}
            </Text>);
            tipsArray.push(element)
        }
        return tipsArray
    };


    /**
     * 刷新页面
     */
    onRefreshLoading() {
        this.setState({isRef: true});
        setTimeout(() => {
            console.log("等待2s");
            this.setState({isRef: false})
        }, 2000);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {/* 标题栏 */}
                <View style={{flex: 1}}>
                    <ScrollView
                        ref={'scrollView'}

                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {this.titleData()}
                    </ScrollView>

                </View>
                {/* 数据 */}
                <View style={{flex: 9, backgroundColor: "#ee2115"}}>
                    <ScrollView
                        refreshControl={<RefreshControl
                            refreshing={this.state.isRef}
                            onRefresh={
                                this.onRefreshLoading.bind(this)
                            }
                            tintColor='#fff'
                        />}>

                    </ScrollView>
                </View>
            </View>
        );
    }
}
const
    classStyle = StyleSheet.create({
        classTitleText: {
            width: width / 4,
            height: 50,
            lineHeight: 50,
            textAlign: "center",
            borderColor: "#fff",
            borderWidth: 1
        }
    });