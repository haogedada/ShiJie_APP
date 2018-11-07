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
