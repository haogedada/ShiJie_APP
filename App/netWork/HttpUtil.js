import axios from 'axios' // 引入axios
import Storage from '../util/AsyncStorageUtil'
import CryptoJS from 'crypto-js'
import {key} from '../constants/base64Key'
import {Actions} from 'react-native-router-flux'

var HTTPUtil = {};


/**
 * 发起请求
 * @param {请求参数} options 
 */
async function initialRequest(options) {
    let token=" "
    token = await Storage.get('token');
    return new Promise((resolve, reject) => {
      let instance;
      let header;
    let isLogin = options.url.includes("login");
    if (token === null || token === " " || isLogin) {
      header = {
        'Content-Type': 'multipart/form-data'
      }
    } else {
      header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    }  
      axios.defaults.baseURL = 'http://www.haogedada.top/apiep';
      instance = axios.create({
        headers: header,
      })
      // 添加一个响应拦截器 
      axios.interceptors.response.use(response => {
        // Do something with response data 
        return response;
      }, error => {
        // Do something with response error 
        return Promise.reject(error);
      });
      // 添加一个请求拦截器 
      axios.interceptors.request.use(config=> {
        // Do something before request is sent 
        return config;
      },error=> {
          // Do something with request error 
          return Promise.reject(error);
        });
      instance(options)
        .then(response => { // then请求成功之后进行什么操作
          console.log(response.data);
          if(response.data.code===401){
            Actions.notLogin()
          }
          try{
            let data = response.data
            let str = decryptByDES(data.data,key.value)
            data.data = JSON.parse(str)
            console.log(data);
            resolve(data)
          }catch(error){
            resolve(response.data)
          }
          // 把请求到的数据发到引用请求的地方
        })
        .catch(error => {
          if (error.response.status === 400) { //400状态码,一些正常的响应
            console.log(error.response.data);
            resolve(error.response.data)
          }else if(error.request.code===401){
            Actions.notLogin()
          } else if (error.request) {
            // 发送请求但是没有响应返回 
            console.log(error.request);
          } else { // 其他错误 
            console.log('请求异常信息：'+error);
            reject(error)
          }  
        })
    })
}

HTTPUtil.get = (url, params) => {
  const method = 'get';
  let options = {
    url: url,
    method: method,
    params: params
  }
  return initialRequest(options)
}
HTTPUtil.post = (url, params) => {
  const method = 'post';
  let options = {
    url: url,
    method: method,
    params: params
  }
  return initialRequest(options)
}
HTTPUtil.put = (url, params) => {
  const method = 'put';
  let options = {
    url: url,
    method: method,
    data: params
  }
  return initialRequest(options)
}
HTTPUtil.delete = (url, params) => {
  const method = 'delete';
  let options = {
    url: url,
    method: method,
    params: params
  }
  return initialRequest(options)
}

HTTPUtil.upload = (url, data) => {
  const method = 'post';
  let options = {
    url: url,
    method: method,
    data: data
  }
  return initialRequest(options)
}

/**
 * 
 * @param {加密字符} ciphertext 
 * @param {加密密钥} key 
 */
function decryptByDES(ciphertext, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  // direct decrypt ciphertext
  var decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
      mode: CryptoJS.mode.ECB,
  //这一步 是来填写 加密时候填充方式 padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
export default HTTPUtil;


