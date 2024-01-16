import { APIResponse } from "playwright"

export interface AddressBodyResponse{
    data: {
        createCustomerAddress: {
             id: number
        }
    }
}

export async function wrapAddressResponse(responseJson: APIResponse): Promise<AddressBodyResponse> {
    return await responseJson.json()
}