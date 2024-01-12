// auth.setup.ts
import { test as setup } from '@playwright/test';
import configJson from '../config.json'
import urlJson from '../url.json'
import { ApiCalls } from '../logic/api/api-calls';

setup('authenticate', async ({request}) => {
    const apiCall= new ApiCalls();
    await apiCall.performLogin(request,urlJson.ui.loginUrl,configJson.user,configJson.password)
    await request.storageState({ path: configJson.authFile });
});