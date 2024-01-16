import { WishlistResponse, WishlistItem } from "../logic/api/body-responses/wishlist-response-body";
import { Locator } from "playwright";

export class DateTimeFormat {
    public static getCurrentDateTime(): string {
      const currentDateTime: Date = new Date();
      return currentDateTime.toISOString().slice(0, -1) + 'Z';
    }
  }

export const parseBodyToJSON = (object: Object)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}

export function flipBirthDate(birthday: string): string {
    const [month, day, year] = birthday.split('/');
    const flippedBirthdate = `${day}/${month}/${year}`;
    return flippedBirthdate;
}

export function getListOfWishlistItemsID(response:WishlistResponse){
    const anyWishList = response.data.addProductsToWishlist.anyWishlist
    return anyWishList.items.map((item:WishlistItem) => item.id);
}

export function extractNumberFromString(priceString: string): number {

    const numericString = priceString.replace(/[^\d.]/g, '').trim();
    const numericValue = parseFloat(numericString);
    return isNaN(numericValue) ? 0 : numericValue;
}


export const waitForElementToBeVisible = async (locator:Locator,time = 500,retry = 100):Promise<boolean> => {
    
    while(retry >0){
       if(await locator.isVisible()){
        return true
       }
       retry = retry-1
       await delay(time)
    }
    return false
}

export const waitForElementToBeEnabled = async (locator:Locator,time:number,retry:number):Promise<boolean> => {

    while(retry >0){
       if(await locator.isEnabled()){
        return true
       }
       retry = retry-1
       await delay(time)
    }
    return false
}

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
