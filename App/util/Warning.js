import {Alert} from 'react-native';

/**
 *用户进行敏感操作时的提示
 */
/**
 * 警告
 * @param str 对象的方式
 */
export function prompt(str) {
    Alert.alert(str.title, str.text, [
        {
            text: "确认", onPress: () => {
            }
        },
        {
            text: "取消", onPress: () => {
            }
        }
    ])
}
