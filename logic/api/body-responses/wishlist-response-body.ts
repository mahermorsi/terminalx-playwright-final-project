export interface WishlistResponse {
    data: {
        addProductsToWishlist: {
            changed: number;
            anyWishlist: {
                items_count: number;
                items: WishlistItem[];
            };
        };
    };
}

export interface WishlistItem {
    id: number;
}

export async function wrapWishlistResponse(responseJson: any): Promise<WishlistResponse> {
        return await responseJson.json()

}