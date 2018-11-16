import React, {Component} from 'react'
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    Button,
    FlatList,
    WebView,
    Dimensions,
    StyleSheet,
    RefreshControl
} from 'react-native'
import Storagge from '../util/AsyncStorageUtil'
import {getVideo} from "../netWork/api"

const {width, height} = Dimensions.get("window");
const titleJson = [{
    id: 1,
    name: "推荐"
},
    {
        id: 2,
        name: "热门"
    }
]
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRef: false,
            titleColor: []
        }
    }

    componentWillMount() {
        let select = [];
        for (let i = 0; i < titleJson.length; i++) {
            if (i === 0) {
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
    }


    homTitle() {
        let clickTitle = [];
        return titleJson.map((item, index) => {
            return (<View style={homeStyle.titleView}>
                <Text onPress={() => {
                    for (let i = 0; i < titleJson.length; i++) {
                        if (i === index) {
                            clickTitle.push({
                                btc: "#515dff",
                                btw: 4,
                                col: "#515dff",
                                fontSize: 18
                            })
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
                        titleColor: clickTitle
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

    /**
     * 刷新
     */
    onRef() {
        this.setState({
            isRef: true
        });
        setTimeout(() => {
            this.setState({isRef: false});
        }, 2000);
    }

    render() {
        return (
            <View style={homeStyle.barOuter}>
                <View style={[homeStyle.barTitle]}>
                    <Image style={homeStyle.search} source={require('../resources/images/icon/search.png')}/>
                    {this.homTitle()}
                    <Image style={homeStyle.search} source={require('../resources/images/icon/comment.png')}/>
                </View>
                <View style={[homeStyle.barContent]}>
                    <ScrollView
                        refreshControl={<RefreshControl
                            refreshing={this.setState.isRef}
                            onRefresh={() => this.onRef.bind(this)}
                            tintColor='gary'
                        />}>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const homeStyle = StyleSheet.create({
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
    }, title: {},
    barContent:
        {
            flex: 9,
            backgroundColor:
                "#6a6e6d"
        }
})