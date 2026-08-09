export class orangeLoginPage {
    
    constructor(page) {
        this.page = page;

        this.usernameInput = this.page.getByPlaceholder("Username");
        
        this.passwordInput = this.page.getByPlaceholder("Password");

        this.loginButton = this.page.getByRole('button', { name: 'Login' });

        this.dashboardTitle = this.page.getByRole('heading', { name: 'Dashboard' });

        this.invalidCredsError= this.page.locator('.oxd-alert-content-text');
    }

}