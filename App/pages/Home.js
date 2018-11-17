import React, {Component} from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Button,
    FlatList,
    WebView,
    Dimensions,
    StyleSheet,
    RefreshControl,
    ViewPagerAndroid
} from 'react-native'
import Storagge from '../util/AsyncStorageUtil'
import {getHomeDate} from "../netWork/api"
import HomeShow from '../components/HomeShow'
import Error from '../components/typePage/error'

const {width, height} = Dimensions.get("window");
const titleJson = [{
    id: 0,
    name: "热门"
},
    {
        id: 1,
        name: "推荐"
    }
    , {
        id: 2,
        name: "最新"
    }
]
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRef: false,
            titleColor: [],
            switch: true,
            clickSwitch: 1,
            isPage: true,
            defaultSearch: '请输入搜索类型',
            page: 1
        }
    }

    netWork(page) {
        getHomeDate(page).then(req => {
            console.log("首页数据:", req);
        })
    }

    componentWillMount() {
        let select = [];
        for (let i = 0; i < titleJson.length; i++) {
            if (i === 1) {
                select.push({
                    btc: "#515dff",
                    btw: 4,
                    col: "#515dff",
                    fontSize: 18
                })
            } else {
                select.push({
                    btc: "#fff",
                    btw: 0,
                    col: "#6a6e6d",
                    fontSize: 16
                })
            }
        }
        this.setState({
                titleColor: select
            }
        );
        this.netWork(this.state.page);
    }

    homTitle() {
        let clickTitle = [];
        return titleJson.map((item, index) => {
            return (<View style={homeStyle.titleView}>
                <Text key={index.id} onPress={() => {
                    for (let i = 0; i < titleJson.length; i++) {
                        if (i === index) {
                            clickTitle.push({
                                btc: "#515dff",
                                btw: 4,
                                col: "#515dff",
                                fontSize: 18
                            })
                            this.setState({
                                clickSwitch: index
                            });
                            this.refs.viewPage.setPage(index);
                        } else {
                            clickTitle.push({
                                btc: "#fff",
                                btw: 0
                                , col: "#6a6e6d",
                                fontSize: 16
                            })
                        }
                    }
                    this.setState({
                        titleColor: clickTitle,
                    });
                }
                } style={[homeStyle.titleContent, {
                    borderBottomColor: this.state.titleColor[index].btc,
                    borderBottomWidth: this.state.titleColor[index].btw,
                    fontSize: this.state.titleColor[index].fontSize,
                    color: this.state.titleColor[index].col
                }]}>{item.name}</Text>
            </View>);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.clickSwitch !== this.state.clickSwitch) {
            console.log("重新渲染", nextState.clickSwitch, this.state.clickSwitch);
            return true;
        } else {
            return true;
        }
    }

    titleBar(e) {
        let clickTitle = [];
        for (let i = 0; i < titleJson.length; i++) {
            if (i === e) {
                clickTitle.push({
                    btc: "#515dff",
                    btw: 4,
                    col: "#515dff",
                    fontSize: 18
                })
            } else {
                clickTitle.push({
                    btc: "#fff",
                    btw: 0,
                    col: "#6a6e6d",
                    fontSize: 16
                })
            }
        }
        this.setState({
            titleColor: clickTitle
        });
    }

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

    pageView() {
        return titleJson.map((item, index) => {
            return (<View style={homeStyle.pageStyle} key={index}>
                <ScrollView
                    refreshControl={<RefreshControl
                        refreshing={this.state.isRef}
                        onRefresh={
                            this.onRefreshLoading.bind(this)
                        }
                    />
                    }>
                    <Text>{item.name}{index}</Text>
                </ScrollView>
            </View>);
        })
    }

    isVideoView() {
        return (
            <View style={[homeStyle.barOuter]}>
                <View style={[homeStyle.barTitle]}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isPage: false
                        });
                    }}>
                        <Image style={homeStyle.search}
                               source={require('../resources/images/icon/search.png')}/></TouchableOpacity>
                    {this.homTitle()}
                    <Image style={homeStyle.search} source={require('../resources/images/icon/comment.png')}/>
                </View>
                <ViewPagerAndroid
                    ref="viewPage"
                    style={homeStyle.viewPager}
                    initialPage={this.state.clickSwitch}
                    onPageSelected={(event) => {
                        this.titleBar(event.nativeEvent.position);
                    }}
                    onPageScrollStateChanged={() => {
                    }}>
                    {this.pageView()}
                </ViewPagerAndroid>
            </View>
        );
    }

    _onPress() {
        this.refs.InputText.focus();
    }

    isSearch() {
        return (<View style={[homeStyle.barOuter]}>

            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => {
                    }}>
                        <Image style={homeStyle.search}
                               source={require('../resources/images/icon/search.png')}/></TouchableOpacity>
                </View>
                <View style={{flex: 5}}>
                    <TextInput
                        ref={'InputText'}
                        onPress={this._onPress.bind(this)}
                        onChangeText={(query) => {
                            this.setState({
                                defaultSearch: query
                            });
                        }}
                        style={{borderBottomColor: "#6a6e6d", borderBottomWidth: 1, height: 50}}
                        defaultValue={this.state.defaultSearch}/>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isPage: true
                        });
                    }}>
                        <Text style={{
                            // backgroundColor: "#ff5fb2",
                            height: 50,
                            textAlign: 'center',
                            textAlignVertical: "center"
                        }}>取消</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 9, backgroundColor: "#ff5fb2"}}>
                <Text>{this.state.defaultSearch}</Text>
            </View>
        </View>)
    }

    render() {
        return (<View style={[homeStyle.barOuter]}>
                {this.state.isPage ? this.isVideoView() : this.isSearch()}
            </View>
        )
    }
}
const homeStyle = StyleSheet.create({
    viewPager: {
        flex: 9
    },
    pageStyle: {
        alignItems: 'center',
        padding: 20,
    },
    titleView: {flex: 1},
    titleContent: {
        height: 50,
        textAlign: "center",
        textAlignVertical: "center"

    },
    search: {
        height: 50,
        width: 40
    },
    barOuter: {
        flex: 1
    },
    barTitle: {
        flex: 1,
        flexDirection: "row",
        // backgroundColor: "#515dff"
    },
    barContent:
        {
            flex: 9,
            backgroundColor: "#515dff"
        }
})