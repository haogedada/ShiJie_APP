import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppRoot from './AppRoot'
import store from '../App/redux/store'

import Storage from './util/AsyncStorageUtil'
import {login} from './netWork/api'

class App extends Component<{}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <AppRoot/>
            </Provider>
        );
    }
}

export default App;
