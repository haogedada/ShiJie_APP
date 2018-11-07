import axios from 'axios' // 引入axios

var HTTPUtil = {};
<<<<<<< HEAD
const getToken = () => {
    let token = " " //从缓存文件中获取token
    if (token === null || token === '') {
        console.log(2);
        return null;
    } else {
        return null;
    }
}

function initialRequest(options) {
    // alert("HttpUtil.js" + options);
    //返回一个Promises对象
    return new Promise((resolve, reject) => {
        let instance;
        let header;
        if (getToken() === null || getToken() === " ") {
            header = {
                'Content-Type': 'application/json'
            }
        } else {
            header = {
                'Content-Type': 'application/json',
                'Authorization': getToken() // token从全局变量那里传过来
            }
        }
        instance = axios.create({
            headers: header,
        })
        instance(options)
            .then(response => { // then请求成功之后进行什么操作
                console.info(response.data);
                resolve(response.data) // 把请求到的数据发到引用请求的地方
                return response.data;
            })
            .catch(error => {
                console.log('请求异常信息：' + error)
                reject(error)
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

export default HTTPUtil;
=======
//从缓存文件中获取token
const getToken = () => {
  let token = " "
  if (token === null || token === '') {
    console.log(2);
    return null;
  } else {
    return null;
  }
}
/**
 * 发起请求
 * @param {请求参数} options 
 */
function initialRequest(options) {
  return new Promise((resolve, reject) => {
    let instance;
    let header;
    if (getToken() === null || getToken() === " ") {
      header = {
        'Content-Type': 'multipart/form-data'
      }
    } else {
      header = {
        'Content-Type': 'multipart/form-data',
        'Authorization': getToken() // token从全局变量那里传过来
      }
    }
    axios.defaults.baseURL = 'http://www.haogedada.top/api';
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
        resolve(response.data) // 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        if (error.response.status === 400) { //400状态码,一些正常的响应
          console.log(error.response.data);
          resolve(error.response.data)
        }else if (error.request) {
          // 发送请求但是没有响应返回 
          console.log(error.request);
        } else { // 其他错误 
          console.log('请求异常信息：'+error);
          reject(error)
        } 
>>>>>>> haogedada
      
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
export default HTTPUtil;


