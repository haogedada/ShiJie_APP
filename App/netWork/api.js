import HttpUtil from './HttpUtil'
import {url} from '../constants/url'

export function login(params) {
    return HttpUtil.post(url.URL_LOGIN, params);
}
