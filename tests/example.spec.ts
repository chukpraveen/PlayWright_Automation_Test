import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://jupiter.cloud.planittesting.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Jupiter Toys/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://jupiter.cloud.planittesting.com');

  // Click the get started link.
  await page.getByRole('link', { name: 'Start Shopping »' }).click();

  // click on Contact page
  await page.getByRole('link', { name: 'Contact', exact: true }).click();

  // Click the get started link.
  await page.getByRole('link', { name: 'Submit', exact: true }).click();

  await expect(page.locator('.help-inline.ng-scope').nth(0)).toHaveText('Forename is required');
  
  await expect(page.locator('.help-inline.ng-scope').nth(1)).toHaveText('Email is required');

  await expect(page.locator('.help-inline.ng-scope').nth(2)).toHaveText('Message is required');

  // Populate mandatory fields
  await page.fill('#forename', 'John Doe');

  await page.fill('#email', 'praveenchukkala29@gmail.com');

  await page.fill('#message', 'praveenchukkala29@gmail.com');

  //Validate errors are gone
  await expect(page.locator('.help-inline.ng-scope').nth(0)).toBeHidden();

  await expect(page.locator('.help-inline.ng-scope').nth(1)).toBeHidden();

  await expect(page.locator('.help-inline.ng-scope').nth(2)).toBeHidden();


});


