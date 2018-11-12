import React, {Component} from 'react'
import {View, Text, Image, ScrollView, TouchableOpacity, Button, StyleSheet, Dimensions} from 'react-native'

const titleList = [""]
export default class Classification extends Component {
    constructor(props) {
        super(props);
        console.log(123);
    }

    render() {
        return (
            <View>
                <ScrollView style={classStyle.classTitle} horizontal={true}>
                    <Text style={classStyle.classTitleText}>推荐</Text>
                    <Text style={classStyle.classTitleText}>娱乐</Text>
                    <Text style={classStyle.classTitleText}>美食</Text>
                    <Text style={classStyle.classTitleText}>音乐</Text>
                    <Text style={classStyle.classTitleText}>科技</Text>
                    <Text style={classStyle.classTitleText}>电影</Text>
                    <Text style={classStyle.classTitleText}>体育</Text>
                    <Text style={classStyle.classTitleText}>世界</Text>
                    <Text style={classStyle.classTitleText}>社会</Text>
                    <Text style={classStyle.classTitleText}>生活</Text>
                    <Text style={classStyle.classTitleText}>汽车</Text>
                    <Text style={classStyle.classTitleText}>商业</Text>
                </ScrollView>
                < ScrollView>
                    < View>
                        <Text>
                            发布名：
                        </Text>
                        <Image source={require("../resources/images/icon/comment.png")}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const classStyle = StyleSheet.create({
    classText: {
        height: 40,
        lineHeight: 40,
        backgroundColor: "#ff5fb2",
        color: "#fff"
    },
    classTitle: {
        backgroundColor: "#73c0ff",
        maxHeight: 30
    },
    classTitleText: {
        width: 50,
        height: 30,
        lineHeight: 30,
        textAlign: "center",
        borderColor: "#fff",
        borderWidth: 1
    }
});