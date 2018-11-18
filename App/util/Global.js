import React, { Component } from 'react';
import RNAlertView from '../components/dialog/RNAlertView'; //自定义弹框
import RNAlertLoad from '../components/dialog/RNAlertLoad'
import RNProgressDialog from '../components/dialog/RNProgressDialog'
 
//自定义Alert
global.RNAlert = RNAlertView;
global.RNAlertLoad = RNAlertLoad;
global.RNProgressDialog = RNProgressDialog;