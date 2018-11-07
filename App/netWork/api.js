import HttpUtil from './HttpUtil'
import {url} from '../constants/url'

export function login(params){
    HttpUtil.get(url.URL_LOGIN,params)
}