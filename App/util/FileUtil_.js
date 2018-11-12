// import RNFS from 'react-native-fs';
// class File{

//     /**
//      * 读取文件
//      * @param {文件路径} path 
//      */
//     static readFile(path) {
//       return RNFS.readFile(path,'utf8')
//        .then((result)=>{
//            return result
//        }).catch(err=>{
//            console.log(err);
//        })
//     }
//     /**
//      * 获取文件路径
//      * @param {文件名} fileName 
//      */
//         static getPath(fileName){
//             return 'file://'.concat(fileName)
//         }
//         /**
//          * 
//          * @param {文件是否存在} path 
//          */
//         static isFilePathExists(path){
//            return RNFS.exists(path).then(value=>{
//                return value
//             }).catc(err=>{
//                 console.log(err);
                
//             })
//         }
//         /**
//          * 复制文件
//          * @param {被复制文件路径} path 
//          * @param {目的路径} destPath 
//          */
//         static copyFile(path,destPath){
//             return RNFS.copyFile(path,destPath).then(()=>{
//                 console.log("复制成功");
//                 return "成功"
//             }).catch(err=>{
//                 console.log("复制失败:",err);
//                 return "失败"
//             });
//         }
//         /**
//          * 创建文件夹
//          * @param {文件夹路径} path 
//          * @param {配置} options 
//          */
//         static mkDir(path,options){
//             return RNFS.mkdir(path,options).then(res =>res).catch(err=>{
//                 console.log(err);
//             });
//         }


// }

// export default File;

