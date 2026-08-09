import { expect, test } from '@playwright/test';
import { orangeLoginAction } from '../../actions/a_login';
import { orangeLoginPage } from '../../pages/p_login'
import { orangePIMAction } from '../../actions/a_pim';

test.describe('OrangeHRM UI Tests', () => {
    let loginAction;
    let loginPage;
    let PIMAction;

    test.beforeEach(async ({ context, page }) => {
        loginAction = new orangeLoginAction(page);
        loginPage = new orangeLoginPage(page);
        PIMAction = new orangePIMAction(page);

        await context.clearCookies();
        await page.goto(process.env.BASE_URL);
    });

    test('TC-UI-001 - Login with valid credentials', async ({ page }) => {
        await loginAction.baseLogin();
        await expect(loginPage.dashboardTitle).toBeVisible();
    });

    test('TC-UI-002 - Login with invalid credentials', async ({ page }) => {
        await loginAction.invalidLogin();
        await expect(loginPage.invalidCredsError).toHaveText('Invalid credentials');
    });

    test('TC-UI-003 - Add a new employee with valid mandatory data', async ({ page }) => {
            await loginAction.baseLogin();
            await PIMAction.addEmployee();
    });

    test('TC-UI-004 - Add employee without mandatory fields', async ({ page }) => {
            await loginAction.baseLogin();
            await PIMAction.missingEmployeInfo();
    });

    test('TC-UI-005 - Search for an employee by unique employee ID', async ({ page }) => {
            await loginAction.baseLogin();
            await PIMAction.getUserFromTable();
    });

    test('TC-UI-006 - Update an employee’s personal information', async ({ page }) => {
            await loginAction.baseLogin();
            await PIMAction.updateEmployeeInfo();
    });

    test('TC-UI-007 - Verify canceling employee creation does not create a record', async ({ page }) => {
            await loginAction.baseLogin();
            await PIMAction.cancelAddingEmployee();
    });
}); 