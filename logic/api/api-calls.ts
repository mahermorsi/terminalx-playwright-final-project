import { APIRequestContext } from "playwright";
import { postRequest } from "../../infra/api/apiRequest";
import urlJson from '../../url.json'
import { PersonalInfoObject } from "./body-requests/personal-information-object";
import { AddressInfoObject } from "./body-requests/address-body-request";

export class ApiCalls{

    async performLogin(request:APIRequestContext,url: string, user:string,password:string){
        const data ={
            username: user,
            password: password
        }
        return await postRequest(url,data,undefined,request)
    }

    async updatePersonalInformation(data:PersonalInfoObject){
        return await postRequest(urlJson.api.APIUpdateInfoUrl,data)
    }

    async addNewAddress(data:AddressInfoObject){
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