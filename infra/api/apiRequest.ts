import { request } from "@playwright/test"


const putRequest = async (url:string,body:any) => {
    const myRequest = await request.newContext()
    return await myRequest.put(url,{
    data:body,
   })      
}

const postRequest = async (url:string,body:any) => {
    const myRequest = await request.newContext()
    return await myRequest.post(url,{
    data:body,
   })      
}


const patchRequest = async (url:string,) => {
    const myRequest = await request.newContext()
    return await myRequest.patch(url,{
   })      
}

export{putRequest,postRequest,patchRequest}