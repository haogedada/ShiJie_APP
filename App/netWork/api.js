import HttpUtil from './HttpUtil'
import {url} from '../constants/url'

export function forgetPassword(params) {
    // console.log("参数", params);
    return HttpUtil.put(url.URL_FORGET + "?username=" + params.username + "&password=" + params.password + "&code=" + params.code
    )
}

export function verfly(params) {
    // console.log("请求路劲:",url.URL_USERNAME, params);
    return HttpUtil.get(url.URL_EMAILCODE, params)
}

export function getComment(params) {
    return HttpUtil.post(url.URL_COMENT, params)

}

export function getHome() {
    return HttpUtil.get(url.URL_USERHOME);
}

export function getCollections() {
    return HttpUtil.get(url.URL_COLLECTIONS);
}

export function getTypes() {
    return HttpUtil.get(url.URL_ALLVIDEOTYPE);
}

export function getVideoTypesCount(params) {
    return HttpUtil.get(url.URL_VIDEOTYPE + "/" + params.info + "&&" + params
        .count + "?videoType=" + params.type
    );
}

export function getHomeDate(parms) {
    return HttpUtil.get(url.URL_HOME + "/" + parms + "&&4");
}

export function login(params) {
    return HttpUtil.post(url.URL_LOGIN, params);
}

export function register(params) {
    return HttpUtil.post(url.URL_REGISTER, params)
}

/**
 * 请求个人信息数据
 */
export function getUserInfo() {
    return HttpUtil.get(url.URL_USERMSG);
}

export function getVideo(params) {
    return HttpUtil.get(url.URL_VIDEO + "/" + params);
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

export function getUserFansList() {
    return HttpUtil.get(url.URL_FANSLIST)
}

export function getUserFollowList() {
    return HttpUtil.get(url.URL_FOLLOWLIST)
}

export function upLoadVideo(params) {
    return HttpUtil.upload(url.URL_UPLOADVIDEO, params)
}