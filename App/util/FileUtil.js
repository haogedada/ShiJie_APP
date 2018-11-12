class FileUtil{
 static creatjpegFile = (uri,name) =>({
        type : 'image/jpeg',
        uri : uri,
        name : name,
    })
    static creatPngFile = (uri,name)=>({
       type : 'image/png',
       uri : uri,
       name : name,
   })
   static creatVideoFile = (uri,name)=>({
        type : 'video/mp4',
        uri : uri,
        name : name,
})
}
export default FileUtil