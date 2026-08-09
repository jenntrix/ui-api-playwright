import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { orangePIMPage } from '../pages/p_pim';

export class orangePIMAction { 

    constructor(page){
        this.page = page;
        this.orangePIMPage = new orangePIMPage(page);
    }

    async addEmployee() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const employeeId = faker.string.alphanumeric(5);

        await this.orangePIMPage.menuPIMButton.click();
        await this.orangePIMPage.addButton.click();
        await this.orangePIMPage.firstNameInput.fill(firstName);
        await this.orangePIMPage.lastNameInput.fill(lastName);
        await this.orangePIMPage.employeeID.fill(employeeId);
        await this.orangePIMPage.saveButton.click();

        await expect(this.orangePIMPage.personalDetailsTitle).toBeVisible();
        await expect(this.orangePIMPage.newEmployeeAdded).toHaveText(`${firstName} ${lastName}`);

    }

    async missingEmployeInfo() {
        await this.orangePIMPage.menuPIMButton.click();
        await this.orangePIMPage.addButton.click();
        await this.orangePIMPage.saveButton.click();

        await expect(this.orangePIMPage.errorRequiredText).toHaveCount(2);
    }

    async getUserFromTable() {
        await this.orangePIMPage.menuPIMButton.click();
        await expect(this.orangePIMPage.pimTitle).toBeVisible();
        const employeeId = await this.orangePIMPage.usersTable.innerText();

        await this.orangePIMPage.employeeID.fill(employeeId.split('\n')[0].trim());
        await this.orangePIMPage.searchButton.click();
        await this.orangePIMPage.editButton.first().click();

        await expect(this.orangePIMPage.personalDetailsTitle).toBeVisible();
    }

    async updateEmployeeInfo() {
        await this.getUserFromTable();
        const middleName = faker.person.firstName();

        await this.orangePIMPage.middleNameInput.click();
        await this.orangePIMPage.middleNameInput.fill(middleName);
        await this.orangePIMPage.saveButton.first().click();

       await expect(this.orangePIMPage.SuccessMessage).toBeVisible();
    }

    async cancelAddingEmployee() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const employeeId = faker.string.alphanumeric(5);

        await this.orangePIMPage.menuPIMButton.click();
        await this.orangePIMPage.addButton.click();

        await this.orangePIMPage.firstNameInput.fill(firstName);
        await this.orangePIMPage.lastNameInput.fill(lastName);
        await this.orangePIMPage.employeeID.fill(employeeId);

        await this.orangePIMPage.cancelButton.click();

        await this.orangePIMPage.employeeID.fill(employeeId);
        await this.orangePIMPage.searchButton.click();
        await expect(this.orangePIMPage.usersTableResult).toHaveCount(0);
    }
}