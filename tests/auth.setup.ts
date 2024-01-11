// auth.setup.ts
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {

    //await page.context().storageState({ path: authFile });
});