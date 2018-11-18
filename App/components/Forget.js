import React, {Component} from 'react'
import {View, Button, Keyboard, Text, Alert, Dimensions, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {verfly, forgetPassword, promptUserName} from '../netWork/api'
import UserName from './userName'
import Pass from './pass'
import UserMsg from "../pages/UserMsg";

const {height, width} = Dimensions.get("window")
export default class Forget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchInput: true
        }
        Keyboard.addListener("keyboardDidShow", () => {
        })
        Keyboard.addListener("keyboardDidHide", () => {
        })
    }


    render() {
        return (
            <View>
                {this.state.switchInput ? <UserName/> : <Pass/>}

                <Button title={"切换"} onPress={() => {
                    this.setState({
                        switchInput: false
                    });
                }}/>

            </View>
        );
    }
}


