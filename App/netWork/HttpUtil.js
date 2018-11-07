import axios from 'axios' // 引入axios

var HTTPUtil = {};
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
      

