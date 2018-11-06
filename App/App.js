
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoot from './AppRoot'
import store from '../App/redux/store'
 class App extends Component<{}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Provider store={store}>
            <AppRoot />
        </Provider>
    );
  }
}
export default App;
