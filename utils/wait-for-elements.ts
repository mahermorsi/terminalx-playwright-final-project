import { Locator } from "playwright";

export const waitForElementToBeVisible = async (locator:Locator,time:number,retry:number):Promise<boolean> => {

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

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}