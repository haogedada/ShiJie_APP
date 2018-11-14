class FileUtil {
    static creatFile(uri, name) {
        if (uri.includes('jpg')) {
            return {
                type: 'image/jpeg',
                uri: uri,
                name: name,
            }
        } else if (uri.includes('png')) {
            return {
                type: 'image/png',
                uri: uri,
                name: name,
            }
        } else if (uri.includes('mp4')) {
            return {
                type: 'video/mp4',
                uri: uri,
                name: name,
            }
        }

    }
    static creatjpegFile = (uri, name) => ({
        type: 'image/jpeg',
        uri: uri,
        name: name,
    })
    static creatPngFile = (uri, name) => ({
        type: 'image/png',
        uri: uri,
        name: name,
    })
    static creatVideoFile = (uri, name) => ({
        type: 'video/mp4',
        uri: uri,
        name: name,
    })
}
export default FileUtil