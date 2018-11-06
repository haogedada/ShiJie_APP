
import React from 'react';
import { Provider } from 'react-redux';
import HelloWorldApp from '../App/pages/HelloWorldApp'
import store from '../App/redux/store'
const App = () => (
  <Provider store={store}>
    <HelloWorldApp />
  </Provider>
);
export default App;
