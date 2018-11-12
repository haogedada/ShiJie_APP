import HttpUtil from './HttpUtil'
import {url} from '../constants/url'

export function login(params){
   return HttpUtil.post(url.URL_LOGIN,params)
}
export function register(params){
   return HttpUtil.post(url.URL_REGISTER,params)
}
export function promptEmail(params){
    return HttpUtil.get(url.URL_PROMPTEMAIL,params)
}
export function promptUserName(params){
    return HttpUtil.get(url.URL_PROMPTNAME,params)
}
export function promptUserMsg(){
    return HttpUtil.get(url.URL_USERMSG)
}
export function modifyUserMsg(params){
    return HttpUtil.upload(url.URL_MODIFYUSER,params)
}
export function getUserFansList(){
    return HttpUtil.get(url.URL_FANSLIST)
}
export function getUserFollowList(){
    return HttpUtil.get(url.URL_FOLLOWLIST)
}

