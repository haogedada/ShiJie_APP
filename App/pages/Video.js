import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions ,ScrollView} from 'react-native'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
let {
    width,
    height
} = Dimensions.get('window');
export default class Video extends Component {
    render() {
        return (
                <ScrollView >
                    <VideoPlayer  />
                    <VideoPlayer  />
                    <VideoPlayer  />
                </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    VideoPlayer: {
        width: width,
        height: height,
    }
});