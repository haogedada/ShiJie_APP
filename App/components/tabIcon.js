import React, { Component } from 'react';
import { View, Image, Text, StyleSheet,Dimensions } from 'react-native';
class TabIcon extends Component {
    constructor(props){
        super(props);       
    }

    render(){
        let selected=this.props.focused;
        let data={
            home:{
                title:"首页",
<<<<<<< HEAD
                icon: !selected ? require("../resources/images/icon/home.png") : require("../resources/images/icon/home_select.png")
            },
            friends: {
                title: "分类",
                icon: !selected ? require("../resources/images/icon/type.png") : require("../resources/images/icon/type_select.png")
            },
            add: {
                title: "添加",
                icon: !selected ? require("../resources/images/icon/add.png") : require("../resources/images/icon/add_select.png")
            },
            theaters:{
                title: "朋友",
                icon: !selected ? require("../resources/images/icon/friends.png") : require("../resources/images/icon/friends_select.png")
            },
            me:{
                title: "我",
                icon: !selected ? require("../resources/images/icon/me.png") : require("../resources/images/icon/me_select.png")
            }
      }
      let param=data[this.props.navigation.state.key];
        let icon = null;
        if (param.title === '添加') {
            return (
                <Image style={{width: 50, height: 50, resizeMode: 'contain'}} source={param.icon}/>
            )
        }
      return  <View style={styles.tabbarContainer}>
                <Image style={{ width: 25, height: 25,resizeMode:'contain' }} source={param.icon} />
          <Text style={[styles.tabbarItem, selected && {color: '#1296db'}]}>{param.title}</Text>
=======
                icon:!selected?require("../resources/images/router_flux/home.png"):require("../resources/images/router_flux/home_selected.png")
            },
            movies:{
                title:"电影",
                icon:!selected?require("../resources/images/router_flux/movies.png"):require("../resources/images/router_flux/movies_selected.png")
            },
            theaters:{
                title:"影院",
                icon:!selected?require("../resources/images/router_flux/theater.png"):require("../resources/images/router_flux/theater_selected.png")
            },
            me:{
                title:"我",
                icon:!selected?require("../resources/images/router_flux/me.png"):require("../resources/images/router_flux/me_selected.png")
            }
      }
      let param=data[this.props.navigation.state.key];
      return  <View style={styles.tabbarContainer}>
                <Image style={{ width: 25, height: 25,resizeMode:'contain' }} source={param.icon} />
                <Text style={[styles.tabbarItem,selected&&{color:'#F08519'}]}>{param.title}</Text>
>>>>>>> haogedada
              </View>
    }
}

const styles = StyleSheet.create({
    tabbarContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
<<<<<<< HEAD
        width: Dimensions.get('window').width / 5
=======
      width:Dimensions.get('window').width/4
>>>>>>> haogedada
    },
    tabbarItem:{  
      marginTop:5,    
      textAlign:"center"
    }
});

module.exports = TabIcon;