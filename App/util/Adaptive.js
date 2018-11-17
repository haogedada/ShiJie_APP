import { Dimensions, PixelRatio } from 'react-native'

const defaultPixel = 2

const wDp = Math.round(750 / defaultPixel)

const hDp = Math.round(1334 / defaultPixel)

const deviceWidthDp = Dimensions.get('window').width; // 设备屏幕宽度

const deviceHeightDp = Dimensions.get('window').height; // 设备屏幕高度

const fontScale = PixelRatio.getFontScale(); // 字体大小缩放比例

const pixelRatio = PixelRatio.get(); // 设备像素密度

const scale = Math.min(deviceHeightDp / hDp, deviceWidthDp / wDp); // 获取缩放比例

export const scaleFont = (size) => {

  return Math.round((size * scale) / fontScale / defaultPixel);

};

export const scaleSize = (size) => {

  return Math.round((size * scale) / defaultPixel);

}
export const scaleDp = (size) => {

  return Math.round(size * pixelRatio / defaultPixel);

}
