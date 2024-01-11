import { APIRequestContext } from "playwright";
import { putRequest,patchRequest,postRequest } from "../infra/api/apiRequest";

export class ApiCalls{

    async performLogin(request:APIRequestContext,url: string, user:string,password:string){
        const data ={
            username: user,
            password: password
        }
        return await postRequest(url,data,undefined,request)
    }
}