import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { ApiCalls } from '../logic/api/api-calls';
import { setPersonalInfoObject } from '../logic/api/body-requests/personal-information-object';
import { flipBirthDate, parseBodyToJSON } from '../utils/utils';
import { AccountPage } from '../logic/page object model/account-page';


test.describe.serial('update personal information test', () => {
    let browserWrapper: BrowserWrapper;
    let accountPage: AccountPage
    test.beforeEach(async () => {
        browserWrapper = new BrowserWrapper();
        accountPage = await browserWrapper.createNewPage(AccountPage)
        await browserWrapper.navigateTo(urlJson.ui.editInfoUrl)
    });
    test.afterEach(async () => {
        await browserWrapper.
            closeBrowser();
    })
    const testCases = [
        { firstName: "Tzahi", lastName: "Assaf", birthDate: "02/02/1982" },
        { firstName: "Maher", lastName: "Morsi", birthDate: "10/22/1997" }
        
    ];
    testCases.forEach(({ firstName, lastName, birthDate })=>{
    test( `updating personal information - firstName: ${firstName}, lastName: ${lastName}, birthDate: ${birthDate}`, async()=>{
            
        // ARRANGE
            const apiCalls = new ApiCalls();
            const expectedBirthDate = flipBirthDate(birthDate);
            const requestObject = setPersonalInfoObject(
                firstName,
                lastName,
                "0533376659",
                false,
                false,
                "mahermorsi@gmail.com",
                1,
                birthDate
            );
            const dataJson = await parseBodyToJSON(requestObject);

            // ACT
            await apiCalls.updatePersonalInformation(dataJson);

            // ASSERT
            await browserWrapper.reloadPage();
            expect(await accountPage.getUpdatedFirstName()).toContain(firstName.toLowerCase());
            expect(await accountPage.getUpdatedLastName()).toContain(lastName);
            expect(await accountPage.getUpdatedBirthDate()).toContain(expectedBirthDate);
        });
    });
});
