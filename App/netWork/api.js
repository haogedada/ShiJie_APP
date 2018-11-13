import HttpUtil from './HttpUtil'
import {
    url
} from '../constants/url'
import Storage from '../util/AsyncStorageUtil'

export async function updateInfo(parms) {
    console.log("修改个人信息参数:", parms);
}

export async function login(params) {
    await HttpUtil.post(url.URL_LOGIN, params).then(req => {
        Storage.save("loginInfo", req);
        console.log("保存数据:", req);
    });
}

export function register(params) {
    return HttpUtil.post(url.URL_REGISTER, params)
}

/**
 * 请求个人信息数据
 */
export function getInfo() {

    HttpUtil.get(url.URL_USERMSG).then(req => {
        Storage.save("infoMsg", req);
        console.log("获取个人资料", req);
    });
}

export function getVideo(params) {
    HttpUtil.get(url.URL_VIDEO + "/" + params).then(req => {
        Storage.save("videoInfo", req)
        console.log("视屏信息", req);
    })
}

export function promptEmail(params) {
    return HttpUtil.get(url.URL_PROMPTEMAIL, params)
}

export function promptUserName(params) {
    return HttpUtil.get(url.URL_PROMPTNAME, params)
}

export function promptUserMsg() {
    return HttpUtil.get(url.URL_USERMSG)
}

export function modifyUserMsg(params) {
    return HttpUtil.upload(url.URL_MODIFYUSER, params)
}