import { APIRequestContext } from "playwright";
import { putRequest,patchRequest,postRequest } from "../../infra/api/apiRequest";
import configJson from '../../config.json'
import urlJson from '../../url.json'

export class ApiCalls{

    async performLogin(request:APIRequestContext,url: string, user:string,password:string){
        const data ={
            username: user,
            password: password
        }
        return await postRequest(url,data,undefined,request)
    }
    async updatePersonalInformation(data:any){
        const headers={
            "Content-Type" : "application/json",
            "Cookie":configJson.cookie
        }
        return await postRequest(urlJson.api.APIUpdateInfoUrl,data,headers)
    }

    async addItemsToWishlist(itemsList:string[]){
        const data ={
            "sku":itemsList
        }
        return await postRequest(urlJson.api.APIWishListUrl,data)
    }
    async removeAllitemsFromWishList(idList:number[])
    {
        idList.forEach(async (num)=>{
            const data ={
                "id": num
            }
            await postRequest(urlJson.api.APIDeletewishListUrl,data)
        } )
    }
}