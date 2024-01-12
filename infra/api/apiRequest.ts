import { APIRequestContext, request } from "@playwright/test"


const putRequest = async (url:string,body:any) => {
    const myRequest = await request.newContext()
    return await myRequest.put(url,{
    data:body,
   })      
}

const postRequest = async (url: string, body: any, headers?: Record<string, string>,availableRequest?:APIRequestContext) => {
    const requestOptions: Record<string, any> = {
        data: body,
    };
    if (headers) {
        requestOptions.headers = headers;
    }
    if (availableRequest){
        return await availableRequest.post(url,requestOptions);
    }
    const newRequest = await request.newContext();
    return await newRequest.post(url, requestOptions);
};

const patchRequest = async (url:string,) => {
    const myRequest = await request.newContext()
    return await myRequest.patch(url,{
   })      
}

export{putRequest,postRequest,patchRequest}