import React, {Component} from 'react'
import {Text, View, ScrollView, TouchableOpacity, Image, Button, FlatList, WebView} from 'react-native'
import Storagge from '../util/AsyncStorageUtil'
import {getVideo} from "../netWork/api"

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: "",
            videoUser: "",
        };
        this.dataSource = [{
            key: 1,
            value: '数据1'
        }
            ,

            {
                key: 10,
                value: '数据1'
            }
            ,

            {
                key: 0,
                value: '数据1'
            }
            ,

            {
                key: 2,
                value: '数据1'
            }
            ,

            {
                key: 3,
                value: '数据1'
            }
            ,

            {
                key: 4,
                value: '数据1'
            }
            ,

            {
                key: 5,
                value: '数据1'
            }
            ,

            {
                key: 6,
                value: '数据1'
            }
            ,

            {
                key: 7,
                value: '数据1'
            }
            ,

            {
                key: 8,
                value: '数据1'
            }
            ,

            {
                key: 9,
                value: '数据1'
            }
        ]
    }

    async componentDidMount() {
        let saveVideo = await Storagge.get("videoInfo");
        getVideo(2);
        this.setState({
            videoData: saveVideo.data,
            videoUser: this.state.videoData.userBean
        });
        console.log(saveVideo);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView onScroll={
                    () => {
                        console.log('刷新');
                    }
                }>
                    <FlatList renderItem={
                        (item) => {
                            return (<Text
                                style={{
                                    height: 40,
                                    lineHeight: 40,
                                    marginTop: 10,
                                    backgroundColor: "#ff5fb2",
                                    color: "#fff"

                                }}
                            >item</Text>);
                        }
                    }
                              data={this.dataSource}
                              ItemSeparatorComponent={() => {
                                  return (<View></View>);
                              }}
                    />
                </ScrollView>
            </View>
        )
    }
}
