export class orangePIMPage {
    
    constructor(page) {
        this.page = page;

        this.menuPIMButton = this.page.getByRole('link', { name: 'PIM' });

        this.addButton = this.page.getByRole('button', { name: 'Add' });

        this.addEmployeeTitle = this.page.getByRole('heading', { name: 'Add Employee' });

        this.firstNameInput = this.page.getByPlaceholder('First Name');

        this.middleNameInput = this.page.getByPlaceholder('Middle Name');

        this.lastNameInput = this.page.getByPlaceholder('Last Name');

        this.employeeID = this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');

        this.saveButton = this.page.getByRole('button', { name: 'Save' });

        this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });

        this.searchButton = this.page.getByRole('button', { name: 'Search' });

        this.personalDetailsTitle = this.page.getByRole('heading', { name: 'Personal Details' });

        this.pimTitle = this.page.getByRole('heading', { name: 'PIM' });

        this.newEmployeeAdded = this.page.locator('h6.--strong');

        this.errorRequiredText = this.page.getByText('Required', { exact: true });

        this.usersTable = this.page.getByRole('row').nth(4);

        this.editButton = this.page.locator('button').filter({has: page.locator('i.bi-pencil-fill')});

        this.usersTableResult = this.page.getByRole('row').nth(0);

        this.SuccessMessage = this.page.getByText('Success', { exact: true });

    }

}