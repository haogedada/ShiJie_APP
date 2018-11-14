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
        }

    }

    async componentDidMount() {
        let saveVideo = await Storagge.get("videoInfo");

        this.setState({
            videoData: saveVideo.data,
            videoUser: this.state.videoData.userBean
        });

    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView>
                    <Text>首页</Text>
                </ScrollView>
            </View>
        )
    }
}
