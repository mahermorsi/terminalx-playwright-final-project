export interface PersonalInfoObject {
    input: {
        firstname: string;
        lastname: string;
        telephone: string;
        change_password: boolean;
        is_subscribed: boolean;
        email: string;
        gender: number;
        date_of_birth: string;
    };
}
export const setPersonalInfoObject = (
    firstname: string,
    lastname: string,
    telephone: string,
    change_password: boolean,
    is_subscribed: boolean,
    email: string,
    gender: number,
    date_of_birth: string
): PersonalInfoObject => {
    return {
        input: {
            firstname: firstname,
            lastname: lastname,
            telephone: telephone,
            change_password: change_password,
            is_subscribed: is_subscribed,
            email: email,
            gender: gender,
            date_of_birth: date_of_birth
        }
    }
}
