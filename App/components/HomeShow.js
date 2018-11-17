import React, {Component} from 'react';
import {View, Text, PanResponder, Button, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity} from 'react-native'
import {PullList, PullView} from 'react-native-pullview'
import {getVideoTypesCount, getTypes} from '../netWork/api'

export default class HomeShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newDate: [],
            page: 1
        }
    }


    render() {
        return (
            <View style={{backgroundColor:"#515dff"}}>

            </View>
        );
    }
}
const showStyle = StyleSheet.create({
    showText: {
        height: 50,
        lineHeight: 50,
        textAlign: "center",
        backgroundColor: "#6a6e6d",
        marginTop: 5

    }
});