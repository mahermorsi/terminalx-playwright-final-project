export interface AddressBodyResponse{
    data: {
        createCustomerAddress: {
             id: number
        }
    }
}

export async function wrapAddressResponse(responseJson: any): Promise<AddressBodyResponse | null> {
    return await responseJson.json()
}