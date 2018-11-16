import React, {Component} from 'react'
import {View, Text, DeviceEventEmitter} from 'react-native'

export default class ClickVideoShowDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
            alert('收到通知：' + a);
        });
    }
    componentWillUnmount() {
        this.deEmitter.remove();
    }
    render() {
        return (<View>
            <Text>视频详情页面</Text>
        </View>);
    }
}