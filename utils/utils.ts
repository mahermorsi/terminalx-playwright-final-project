export const parseBodyToJSON = (object: Object)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}