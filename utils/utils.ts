import { WishlistResponse, WishlistItem } from "../logic/api/body-responses/wishlist-response-body";

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
