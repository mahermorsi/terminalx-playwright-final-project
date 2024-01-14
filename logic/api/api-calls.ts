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
        return await postRequest(urlJson.api.APIUpdateInfoUrl,data)
    }
    async addNewAddress(data:any){
        return await postRequest(urlJson.api.APIAddAddressUrl,data)
    }
    async removeAllAddresses(idList:number[])
    {
        idList.forEach(async (num)=>{
            const data ={
                "id": num
            }
            await postRequest(urlJson.api.APIDeleteAddressUrl,data)
        } )
    }
    async removeSpecificAddress(id:number)
    {
        const data ={
            "id": id
        }
        await postRequest(urlJson.api.APIDeleteAddressUrl,data) 
    }

    async addItemsToWishlist(itemsList:string[]){
        const data ={
            "sku":itemsList
        }
        return await postRequest(urlJson.api.APIWishListUrl,data)
    }
    async addItemToCart(item:string){
        const data = {
            cart_items: [
                {
                    data: {
                        quantity: 1,
                        any_sku: item
                    }
                }
            ]
        }
        return await postRequest(urlJson.api.APIAddCartUrl,data)
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