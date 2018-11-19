import React, { Component } from 'react'
import PropTypes from 'prop-types'; 
import {
    Text, View, StyleSheet, Dimensions, ScrollView, ViewPagerAndroid,
    DeviceEventEmitter
} from 'react-native'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'
let {
    width,
    height
} = Dimensions.get('window');
export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.index,
        };
        this._renderPagers = this._renderPagers.bind(this);
        this._onPageSelected = this._onPageSelected.bind(this);
    }
    _renderPagers() {
        const videoList = this.props.videoList;
        if (videoList === null || videoList.length === 0) {
            return null;
        }
        let len = videoList.length;
        let pagers = [];
        if (len === 1) {
            pagers.push(this._renderPagerItem(videoList[0], 0));
        } else {
            // 最后一页插入到第 0 个位置
            pagers.push(this._renderPagerItem(videoList[len - 1], 0));
            for (let i = 0; i < len; i++) {
                pagers.push(this._renderPagerItem(videoList[i], i + 1))
            }
            // 第 0 页插入到最后一个位置
            pagers.push(this._renderPagerItem(videoList[0], len + 1));
        }
        return pagers;
    }
    _renderPagerItem(video, key) {
        return (
            <View key={key} style={{ flex: 1, flexDirection: 'row' }}>
                <VideoPlayer video={video} _index={key} currentPage={this.state.currentPage} />
            </View>
        );
    }
    _onPageSelected(e) {
        const len = this.props.videoList.length;
        if (len === 1) {
            return;
        }
        let position = e.nativeEvent.position;
        let currentPage;
        if (position === 0) {
            // 当到第 0 页时跳转到倒数第二页
            currentPage = len - 1;
            this.viewPager.setPage(len);
        } else if (position === len + 1) {
            // 当到最后一页时跳转到第一页
            currentPage = 0;
            this.viewPager.setPage(1);
        } else {
            currentPage = position - 1;
        }
        DeviceEventEmitter.emit('ChangeCurrentPage', position)
        this.setState({
            currentPage: currentPage
        });
    }
    render() {
        return (
            <View>
                <ViewPagerAndroid
                    initialPage={this.props.index}
                    style={{ height: height ,backgroundColor: '#464748'}}
                    ref={viewPager => { this.viewPager = viewPager; }}
                    onPageSelected={this._onPageSelected}
                    pageMargin={10}
                    peekEnabled={true}
                >
                    {this._renderPagers()}
                </ViewPagerAndroid>
            </View>
        );
    }
}
Video.propTypes={
    index:PropTypes.number.isRequired,
    videoList:PropTypes.arrayOf(PropTypes.object)
}
const styles = StyleSheet.create({
    
});