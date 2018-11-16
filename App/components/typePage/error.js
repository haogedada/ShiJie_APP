import React, {Component} from "react";
import {View, Text, StyleSheet, D, Dimensions} from 'react-native'

const {
    width,
    height
} = Dimensions.get('window');
export default class Error extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <View>
                <Text style={{
                    height: height,
                    width: width,
                    textAlign: "center",
                    textAlignVertical: "center"
                }}>╮(╯﹏╰）╭没有这个类型的视频</Text>
            </View>);
    }
}