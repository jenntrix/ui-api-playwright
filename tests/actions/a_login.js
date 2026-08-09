import { expect } from '@playwright/test';
import { orangeLoginPage } from '../pages/p_login';

export class orangeLoginAction {
    
    constructor(page){
        this.page = page;
        this.orangeLoginPage = new orangeLoginPage(page);
    }

     //Valid login to OrangeHRM
     async baseLogin() {
        await this.orangeLoginPage.usernameInput.fill(process.env.BASE_USERNAME);
        await this.orangeLoginPage.passwordInput.fill(process.env.BASE_PASSWORD);
        await this.orangeLoginPage.loginButton.click();
     }

     //Invalid login to OrangeHRM
     async invalidLogin() {
        await this.orangeLoginPage.usernameInput.fill('invalid_user');
        await this.orangeLoginPage.passwordInput.fill('invalid_password');
        await this.orangeLoginPage.loginButton.click();
     }

}