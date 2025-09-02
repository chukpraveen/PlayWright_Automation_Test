import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Step 1: Navigate to URL
    async navigateToURL() {
        await this.page.goto('http://jupiter.cloud.planittesting.com');
    }         

    //Step 2: Navigate to Contact Page
    async navigateToContactPage() {
        await this.page.getByRole('link', { name: 'Contact', exact: true }).click();
    }

    //Step 2.1: Navigate to Shop Page
    async navigateToShoptPage() {
        await this.page.getByRole('link', { name: 'Shop', exact: true }).click();
    }
}
