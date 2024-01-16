import { test, expect } from '@playwright/test';
import { BrowserWrapper } from '../infra/ui/generic-browser-wrapper';
import urlJson from '../url.json'
import { AddressPage } from '../logic/page object model/address-page';
import { ApiCalls } from '../logic/api/api-calls';
import { setAddressInfoObject } from '../logic/api/body-requests/address-body-request';
import { wrapAddressResponse } from '../logic/api/body-responses/address-body-response';


test.describe.serial('addresses test', () => {
    let browserWrapper: BrowserWrapper;
    let addressPage: AddressPage;
    let addressIDlist:number[];
    let apiCall: ApiCalls;

    test.beforeEach(async () => {
        apiCall=new ApiCalls();
        browserWrapper = new BrowserWrapper();
        addressPage = await browserWrapper.createNewPage(AddressPage)
        await browserWrapper.navigateTo(urlJson.ui.AddressesUrl)
    });
    test.afterEach(async () => {
        await apiCall.removeAllAddresses(addressIDlist)
        await browserWrapper.reloadPage();
        await browserWrapper.
            closeBrowser();
    })
    test("add 2 addresses -> validate two addresses are added in the page", async () => {
        // ARRANGE
        addressIDlist = []
        const address1 = setAddressInfoObject("Assaf","Tzahi","101","051","עכו","IL",["דרך הים","5",""])
        const address2 = setAddressInfoObject("Gotech","Company","101","051","נתניה","IL",["החשמונאים","23",""])

        // ACT
        const firstAddressResponse = await wrapAddressResponse(await apiCall.addNewAddress(address1))
        if (firstAddressResponse) {addressIDlist.push(firstAddressResponse.data.createCustomerAddress.id)}

        const secondAddressResponse =await wrapAddressResponse(await apiCall.addNewAddress(address2))
        if (secondAddressResponse) {addressIDlist.push(secondAddressResponse.data.createCustomerAddress.id)}

        // ASSERT
        expect(await addressPage.getTotalCountOfAddresses()).toBeGreaterThanOrEqual(addressIDlist.length)
    })

    test("add 2 addresses -> remove 1 -> validate only one left", async () => {
        // ARRANGE
        addressIDlist = []
        const address1 = setAddressInfoObject("Shiraz","asd","101","051","עכו","IL",["דרך הים","5",""])
        const address2 = setAddressInfoObject("Gotech","Company","101","051","נתניה","IL",["החשמונאים","23",""])

        // ACT
        const firstAddressResponse = await wrapAddressResponse(await apiCall.addNewAddress(address1))
        if (firstAddressResponse) {addressIDlist.push(firstAddressResponse.data.createCustomerAddress.id)}

        const secondAddressResponse =await wrapAddressResponse(await apiCall.addNewAddress(address2))
        if (secondAddressResponse) {addressIDlist.push(secondAddressResponse.data.createCustomerAddress.id)}
     
        await apiCall.removeSpecificAddress(addressIDlist[0])
       
        // ASSERT
        expect(await addressPage.getTotalCountOfAddresses()).toBe(1)
    })
})