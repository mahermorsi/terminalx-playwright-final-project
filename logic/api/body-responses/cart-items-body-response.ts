import { APIResponse } from "playwright"

export interface AddCartBodyResponse{
    data: {
        addAnyProductsToAnyCart: {
            total_quantity: number
        }
    }
}

export async function wrapCartBodyResponse(responseJson: APIResponse): Promise<AddCartBodyResponse> {
    return await responseJson.json()
}