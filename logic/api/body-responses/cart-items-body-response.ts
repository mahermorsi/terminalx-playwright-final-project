export interface AddCartBodyResponse{
    data: {
        addAnyProductsToAnyCart: {
            total_quantity: number
        }
    }
}

export async function wrapCartBodyResponse(responseJson: any): Promise<AddCartBodyResponse | null> {
    return await responseJson.json()
}