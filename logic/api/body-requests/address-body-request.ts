import { parseBodyToJSON } from "../../../utils/utils";

export interface AddressInfoObject{
    input: {
        firstname: string;
        lastname: string;
        postcode: string;
        telephone: string;
        city: string;
        country_id: string;
        street: string[];
        
    };
}

export const setAddressInfoObject =(
        firstname: string,
        lastname: string,
        postcode: string,
        telephone: string,
        city: string,
        country_id: string,
        street: string[],
): AddressInfoObject=>{
    const result= {
        input:{
        firstname: firstname,
        lastname: lastname,
        postcode: postcode,
        telephone: telephone,
        city: city,
        country_id: country_id,
        street: street
        }
    }
    return parseBodyToJSON(result)
}
