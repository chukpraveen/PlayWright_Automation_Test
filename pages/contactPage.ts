import { Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
export class ContactPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Step 3: Submit Contact Form by clicking Submit button
    async submitContactForm() {
        await this.page.getByRole('link', { name: 'Submit', exact: true }).click();
    }

    //Step 4: Verify all errors on page
    async verifyErrors() {
        await expect(this.page.locator('.help-inline.ng-scope').nth(0)).toHaveText('Forename is required');        
        await expect(this.page.locator('.help-inline.ng-scope').nth(1)).toHaveText('Email is required');        
        await expect(this.page.locator('.help-inline.ng-scope').nth(2)).toHaveText('Message is required');
   }

   //Step 5: Populate all mandatory fields
    async populateMandatoryFields() {
        await this.page.fill('#forename', 'John Doe');
        await this.page.fill('#email', 'praveenchukkala29@gmail.com');
        await this.page.fill('#message', 'praveenchukkala29@gmail.com');
    }

    //Step 6: Validate errors are gone on Contact page
    async validateErrorsGone() {
        await expect(this.page.locator('.help-inline.ng-scope').nth(0)).toBeHidden();
        await expect(this.page.locator('.help-inline.ng-scope').nth(1)).toBeHidden();
        await expect(this.page.locator('.help-inline.ng-scope').nth(2)).toBeHidden();
  }

}