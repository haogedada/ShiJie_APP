import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  FlatList,
  WebView,
  Dimensions,
  StyleSheet,
  RefreshControl,
  ViewPagerAndroid,
  DeviceEventEmitter
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { getHomeDate } from "../netWork/api"
import { loadData } from '../util/LoadDataUtil'
import { scaleSize, scaleFont } from './../util/Adaptive'
const { width, height } = Dimensions.get("window");
const titleJson = [{
  id: 0,
  name: "最新"
},
{
  id: 1,
  name: "推荐"
}
  , {
  id: 2,
  name: "热门"
}
]
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRef: false,
      titleColor: [],
      switch: true,
      clickSwitch: 1,
      isPage: true,
      defaultSearch: '请输入搜索类型',
      page: 1,
      hotList: '',
      recomList: '',
      newList: '',
      all: ""
    }
  }

  componentWillMount() {
    this.netWork(this.state.page);
    let select = [];
    for (let i = 0; i < titleJson.length; i++) {
      if (i === 1) {
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

  /**
   * 渲染标题
   * @returns {any[]}
   */
  homTitle() {
    let clickTitle = [];
    return titleJson.map((item, index) => {
      return (<View style={homeStyle.titleView} key={index}>
        <Text key={index.id} onPress={() => {
          for (let i = 0; i < titleJson.length; i++) {
            if (i === index) {
              clickTitle.push({
                btc: "#515dff",
                btw: 4,
                col: "#515dff",
                fontSize: 18
              })
              this.setState({
                clickSwitch: index
              });
              this.refs.viewPage.setPage(index);
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
            titleColor: clickTitle,
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
   * 网络请求
   * @param page
   */
  netWork(page) {
    getHomeDate(page).then(req => {
      this.setState({ all: req.data.concat(this.state.all) });
      console.log(this.state.all)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.clickSwitch !== this.state.clickSwitch) {
      // console.log("重新渲染", nextState.clickSwitch, this.state.clickSwitch);
      return true;
    } else {
      return true;
    }
  }

  /**
   * 标题
   * @param e
   */
  titleBar(e) {
    let clickTitle = [];
    for (let i = 0; i < titleJson.length; i++) {
      if (i === e) {
        clickTitle.push({
          btc: "#515dff",
          btw: 4,
          col: "#515dff",
          fontSize: 18
        })
      } else {
        clickTitle.push({
          btc: "#fff",
          btw: 0,
          col: "#6a6e6d",
          fontSize: 16
        })
      }
    }
    this.setState({
      titleColor: clickTitle,
      clickSwitch: e
    });
  }

  /**
   * 下拉刷新页面
   */
  onRefreshLoading() {
    this.setState({ isRef: true });
    setTimeout(() => {
      this.setState({
        isRef: false,
        page: this.state.page + 1
      })
      this.netWork(this.state.page)
    }, 2000);
  }

  /**
   * 上拉加载
   * @private
   */
  _onEndfresh() {
    this.setState({ isRef: true });
    setTimeout(() => {
      this.setState({
        isRef: false,
        page: this.state.page + 1
      })
      this.netWork(this.state.page);
      //滚动条会滚到顶部
      this.refs.totop.scrollTo({ x: 0, y: 0, animated: true });
    }, 2000);
  }

  handleScroll(e) {
    let scrollH = e.nativeEvent.contentSize.height;
    let y = e.nativeEvent.contentOffset.y;
    let height = e.nativeEvent.layoutMeasurement.height;
    if (scrollH - height < y) {
      this._onEndfresh();
    }
  }

  /**
   * 渲染视频页面
   * @returns {any[]}
   */
  pageView() {
    return titleJson.map((item, index) => {
      return (<View style={homeStyle.pageStyle} key={index}>
        <ScrollView
          ref={"totop"}
          onScroll={(e) => {
            this.handleScroll(e)
          }
          }
          refreshControl={<RefreshControl
            refreshing={this.state.isRef}
            onRefresh={
              this.onRefreshLoading.bind(this)
            }
          />
          }>{this.renderDate(index)}
        </ScrollView>
      </View>);
    })
  }

  /**
   * 详细信息
   * @param num
   * @returns {*}
   */
  renderDate(num) {

    let str = this.state.all;
    for (let i = this.state.clickSwitch; i < str.length; i++) {
      if (i === this.state.clickSwitch) {
        return str[i].map((item, index) => {
          return (
            <View key={index} style={homeStyle.videoItemStyle}>
              <View style={homeStyle.coverStyle}>
                <Text style={homeStyle.videoTitleStyle}>{item.videoTitle}</Text>
                <TouchableOpacity onPress={() => {
                  Actions.video({ index: index + 1, videoList: str[i] })
                }}>
                  <Image style={homeStyle.coverImgStyle}
                    source={{ uri: item.videoCoverUrl }}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              </View>
              <View style={homeStyle.textBoxStyle}>
                <View style={homeStyle.userMsgStyle}>
                  <Image source={{ uri: item.userBean.headimgUrl }}
                    style={homeStyle.headStyle} />
                  <Text style={homeStyle.userNameStyle}>{item.userBean.userNickname}</Text>
                </View>
                <View style={homeStyle.msgRightBoxStyle}>
                  <View style={homeStyle.topStyle}>
                    <Image source={require('./../resources/images/icon/top_select.png')}
                      style={homeStyle.topImageStyle} />
                    <Text style={homeStyle.topTextStyle}>{item.videoTipNum}</Text>
                  </View>
                  <View style={homeStyle.trampleStyle}>
                    <Image source={require('./../resources/images/icon/tread_select.png')}
                      style={homeStyle.trampleImageStyle} />
                    <Text style={homeStyle.trampleTextStyle}>{item.videoTrampleNum}</Text>
                  </View>
                  <View style={homeStyle.timeStyle}>
                    <Text style={homeStyle.timeTextStyle}>时长: {item.videoTime}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })
      }
    }
  }

  isVideoView() {
    return (
      <View style={[homeStyle.barOuter]}>
        <View style={[homeStyle.barTitle]}>
          {/*搜索*/}
          {/* <TouchableOpacity onPress={() => {
            this.setState({
              isPage: false
            });
          }}>
            <Image style={homeStyle.search}
              source={require('../resources/images/icon/search.png')} /></TouchableOpacity>
          标题栏 */}
          {this.homTitle()}
          {/*上传视频*/}
          <TouchableOpacity
            onPress={
              () => {
                loadData('uploadVideo')
                Actions.uploadVideo();
              }
            }>
            <Image style={homeStyle.search} source={require('../resources/images/icon/came.png')} />
          </TouchableOpacity>
        </View>
        <ViewPagerAndroid
          ref="viewPage"
          style={homeStyle.viewPager}
          initialPage={this.state.clickSwitch}
          pageMargin={10}
          onPageSelected={(event) => {
            this.titleBar(event.nativeEvent.position);
          }}
          onPageScrollStateChanged={() => {
          }}>
          {this.pageView()}
        </ViewPagerAndroid>
      </View>
    );
  }

  _onPress() {
    this.refs.InputText.focus();
  }

  isSearch() {
    return (<View style={[homeStyle.barOuter]}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => {
            this.setState({
              isPage: true
            });
          }}>
            <Text style={{
              // backgroundColor: "#ff5fb2",
              height: 50,
              textAlign: 'center',
              textAlignVertical: "center"
            }}>取消</Text></TouchableOpacity>
        </View>
        {/*搜索*/}
        <View style={{ flex: 5 }}>
          <TextInput
            ref={'InputText'}
            onPress={this._onPress.bind(this)}
            onChangeText={(query) => {
              this.setState({
                defaultSearch: query
              });
            }}
            style={{ borderBottomColor: "#6a6e6d", borderBottomWidth: 1, height: 50 }}
            defaultValue={this.state.defaultSearch} />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => {
          }}>
            <Text style={{
              // backgroundColor: "#ff5fb2",
              height: 50,
              textAlign: 'center',
              textAlignVertical: "center",
              borderLeftColor: "#6a6e6d",
              borderBottomColor: "#6a6e6d",
              borderBottomWidth: 1,
              borderLeftWidth: 1
            }}>确认</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{
        flex: 9,
      }}>
        <Text>{this.state.defaultSearch}</Text>
      </View>
    </View>)
  }

  render() {
    return (<View style={[homeStyle.barOuter]}>
      {/*是否渲染搜索页面*/}
      {this.state.isPage ? this.isVideoView() : this.isSearch()}
    </View>
    )
  }
}
const homeStyle = StyleSheet.create({
  viewPager: {
    flex: 9
  },
  pageStyle: {
    alignItems: 'center',
  },
  titleView: { flex: 1 },
  titleContent: {
    height: 50,
    textAlign: "center",
    textAlignVertical: "center"
  },
  search: {
    height: 40,
    width: 40
  },
  barOuter: {
    flex: 1
  },
  barTitle: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "#515dff"
  },
  barContent:
  {
    flex: 9,
    backgroundColor: "#515dff"
  },
  videoItemStyle: {
    flex: 1,
    flexDirection: 'column',
    padding: scaleSize(10),
    marginVertical: scaleSize(10),
    backgroundColor: '#fff',
    borderRadius: 8
  },
  coverStyle: {

  },
  videoTitleStyle: {
    color: '#fff',
    fontSize: scaleFont(25),
    zIndex: 1,
    position: 'absolute',
    top: scaleSize(10),
    left: scaleSize(10),
    right: scaleSize(10)
  },
  coverImgStyle: {
    width: width - scaleSize(20),
    height: (width - scaleSize(20)) / 2,
    borderRadius: 5
  },
  textBoxStyle: {
    flexDirection: 'row',
    paddingVertical: scaleSize(10),
    justifyContent: 'space-between'
  },
  userMsgStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headStyle: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: 25
  },
  userNameStyle: {
    marginLeft: scaleSize(8),
    fontSize: scaleFont(20)
  },

  msgRightBoxStyle: {
    flexDirection: 'row',
  },
  topStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trampleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleSize(25)
  },
  timeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scaleSize(25)
  },
  topImageStyle: {
    width: scaleSize(50),
    height: scaleSize(50)
  },
  trampleImageStyle: {
    width: scaleSize(50),
    height: scaleSize(50)
  },
  topTextStyle: {
    fontSize: scaleFont(20)
  },
  trampleTextStyle: {
    fontSize: scaleFont(20)
  },
  timeTextStyle: {
    fontSize: scaleFont(20)
  }
})