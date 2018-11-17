import React, { Component } from 'react'
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions
} from 'react-native'
import { getTypes, getVideoTypesCount } from "../netWork/api";
import Video from 'react-native-video';
import ShowDatils from "../components/typePage/ShowDatils";
import Error from "../components/typePage/error";

const {
  width,
  height
} = Dimensions.get('window');
const titleList = [""]
export default class Classification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeKey: [],
      typeValue: [],
      isRef: false,
      selectColor: [],
      typeVideo: [],
      showHidden: false
    }
    this.getTypesVideo("hot");
  }

  componentWillMount() {
    // 标题
    getTypes().then(item => {
      //key
      let titleKey = [];
      //value
      let titleValue = [];
      // console.log(item.data);
      let type = item.data;
      for (let i of type) {
        // console.log("类型:", i);
        let spilt = i.split(":");
        // console.log("拆分:", spilt[0], spilt[1]);
        titleKey.push(spilt[0])
        titleValue.push(spilt[1])
      }
      let sortKey = [];
      let sortValue = [];
      let userSelectColor = [];
      for (let i = 0; i < titleValue.length; i++) {
        if (i === 0) {
          userSelectColor.push({
            col: "#515dff",
            bc: "#515dff",
            bw: 4
          })
        } else {
          userSelectColor.push({
            col: "#6a6e6d",
            bc: "#fff",
            bw: 0
          })
        }
      }
      //倒序
      for (let i = titleValue.length - 1; i > 0; i--) {
        sortKey.push(titleKey[i]);
        sortValue.push(titleValue[i])
      }
      this.setState({
        typeKey: sortKey,
        typeValue: sortValue,
        selectColor: userSelectColor
      });
    });

  }

  /**
   * 获取不同类型的视频信息
   * @param params
   */
  getTypesVideo(params) {
    // console.log("请求参数:", params);
    getVideoTypesCount({ videoType: params }).then(req => {
      if (req.data === null) {
        this.setState({
          showHidden: false
        });
      } else {
        this.setState({
          showHidden: true,
          typeVideo: req.data
        });
      }
      // console.log("videoType:", req);
    });
  }

  /**
   * 用户点击对应的标题获取值
   * @param clickTitle
   */
  userClickTypeTitle(clickTitle) {
    this.getTypesVideo(clickTitle);
  }

  /**
   * 显示分类列表属性
   * @returns {*}
   */
  titleData() {
    let key = this.state.typeKey;
    let value = this.state.typeValue;
    let color = this.state.selectColor;
    let styleList = [];
    return value.map((item, index) => {
      return <Text key={index} onPress={() => {
        this.refs.scrollView.scrollTo({ x: width / 4 * index, animated: true })
        for (let i = 0; i < key.length; i++) {
          if (i === index) {
            styleList.push({
              col: "#515dff",
              bc: "#515dff",
              bw: 4
            })
            this.userClickTypeTitle(key[i]);
          } else {
            styleList.push({
              col: "#6a6e6d",
              bc: "#fff",
              bw: 0
            })
          }
        }
        this.setState({
          selectColor: styleList
        });
      }
      } style={[classStyle.classTitleText, {
        color: this.state.selectColor[index].col,
        borderBottomColor: this.state.selectColor[index].bc,
        borderBottomWidth: this.state.selectColor[index].bw
      }]}>{item}</Text>
    })
  };

  /**
   * 刷新页面
   */
  onRefreshLoading() {
    this.setState({ isRef: true });
    setTimeout(() => {
      // console.log("等待2s");
      this.setState({ isRef: false })
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* 标题栏 */}
        <View style={{ backgroundColor: '#fff', marginBottom: 15 }}>
          <ScrollView
            ref={'scrollView'}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            {this.titleData()}
          </ScrollView>
        </View>
        {/* 数据 */}
        <View style={{ flex: 9 }}>
          <ScrollView
            refreshControl={<RefreshControl
              refreshing={this.state.isRef}
              onRefresh={
                this.onRefreshLoading.bind(this)
              }
              tintColor='#fff'
            />}>
            {this.state.showHidden ? <ShowDatils data={this.state.typeVideo} /> : <Error />}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const classStyle = StyleSheet.create({
  classTitleText: {
    width: width / 4,
    height: 50,
    lineHeight: 50,
    textAlign: "center",
  }
});