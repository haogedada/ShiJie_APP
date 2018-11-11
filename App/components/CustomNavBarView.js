import React, { Component } from 'react'
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {right} from '../redux/actions/rightHeader'
const propTypes = {
  title: PropTypes.string,
  rightText: PropTypes.string
}

 class CustomNavBarView extends Component {
  constructor (props) {
    super(props)
    this.rightHeader.bind(this)
  }

  rightHeader () {
    alert('点击了')
  }
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {Actions.pop()}}>
        <Image
          source={require('./../resources/images/icon/back.png')}
          style={styles.iconStyle} />
        </TouchableOpacity>
        <Text>{this.props.title}</Text>
        <TouchableOpacity
          onPress={this.rightHeader}>
          <Text style={styles.tightStyle}>{this.props.rightText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    rightHeader(){
      dispatch(right)
    }
  }
}
export default connect(mapDispatchToProps)(CustomNavBarView)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  tightStyle: {
    width: 29,
    marginRight: 20
  }
});

CustomNavBarView.propTypes = propTypes