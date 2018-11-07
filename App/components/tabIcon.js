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
                title: "我的",
                icon:!selected?require("../resources/images/router_flux/me.png"):require("../resources/images/router_flux/me_selected.png")
            }
      }
      let param=data[this.props.navigation.state.key];
      return  <View style={styles.tabbarContainer}>
                <Image style={{ width: 25, height: 25,resizeMode:'contain' }} source={param.icon} />
                <Text style={[styles.tabbarItem,selected&&{color:'#F08519'}]}>{param.title}</Text>
              </View>
    }
}

const styles = StyleSheet.create({
    tabbarContainer:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      width:Dimensions.get('window').width/4
    },
    tabbarItem:{  
      marginTop:5,    
      textAlign:"center"
    }
});

module.exports = TabIcon;