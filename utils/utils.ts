export const parseBodyToJSON = (object: Object)=>{
    const str= JSON.stringify(object)
    return JSON.parse(str)
}

export function flipBirthDate(birthday: string): string {
    const [month, day, year] = birthday.split('/');
    const flippedBirthdate = `${day}/${month}/${year}`;
    return flippedBirthdate;
}
