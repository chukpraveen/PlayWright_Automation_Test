import { Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { HomePage } from "../pages/homePage";
import { ContactPage } from "../pages/contactPage";
import { link } from "fs";



test('Test Case 1:Contact Form Validation', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);  

    // Step 1: Navigate to URL
    await homePage.navigateToURL();

    // Step 2: Navigate to Contact Page
    await homePage.navigateToContactPage();

    // Step 3: Submit Contact Form by clicking Submit button
    await contactPage.submitContactForm();

    // Step 4: Verify all errors on page
    await contactPage.verifyErrors();

    // Step 5: Populate all mandatory fields
    await contactPage.populateMandatoryFields();

    // Step 6: Validate errors are gone on Contact page
    await contactPage.validateErrorsGone();
});

test('Test Case 2:Contact Form Run 5 times', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

    for (let i = 0; i < 5; i++) {
        console.log(`Test Run #${i} started`);

        // Step 1: Navigate to URL
        await homePage.navigateToURL();

        // Step 2: Navigate to Contact Page
        await homePage.navigateToContactPage();

        // Step 3: Submit Contact Form by clicking Submit button
        await contactPage.submitContactForm();

        // Step 4: Verify all errors on page
        await contactPage.verifyErrors();

        // Step 5: Populate all mandatory fields
        await contactPage.populateMandatoryFields();

        // Step 6: Validate errors are gone on Contact page
        await contactPage.validateErrorsGone();

        console.log(`Test Run #${i} completed successfully\n`);       
        
    } 
});

test('Test Case 3:Cart verify products calculations', async ({ page }) => {
    const homePage = new HomePage(page);
    const contactPage = new ContactPage(page);

     // Step 1: Navigate to URL
        await homePage.navigateToURL();

        // Step 2.1: Navigate to Shop Page
        await homePage.navigateToShoptPage();

        // "Stuffed Frog" to click on Buy button 2 time
        await page.locator('li:has(h4:has-text("Stuffed Frog"))').getByRole('link', { name: 'Buy' }).click();
       
        await page.locator('li:has(h4:has-text("Stuffed Frog"))').getByRole('link', { name: 'Buy' }).click();

        // "Fluffy Bunny" to click on Buy button 5 time
        await page.locator('li:has(h4:has-text("Fluffy Bunny"))').getByRole('link', { name: 'Buy' }).click();       
        await page.locator('li:has(h4:has-text("Fluffy Bunny"))').getByRole('link', { name: 'Buy' }).click();
        await page.locator('li:has(h4:has-text("Fluffy Bunny"))').getByRole('link', { name: 'Buy' }).click();
        await page.locator('li:has(h4:has-text("Fluffy Bunny"))').getByRole('link', { name: 'Buy' }).click();
        await page.locator('li:has(h4:has-text("Fluffy Bunny"))').getByRole('link', { name: 'Buy' }).click();

        // "Valentine Bear" to click on Buy button 3 time
        await page.locator('li:has(h4:has-text("Valentine Bear"))').getByRole('link', { name: 'Buy' }).click();       
        await page.locator('li:has(h4:has-text("Valentine Bear"))').getByRole('link', { name: 'Buy' }).click();
        await page.locator('li:has(h4:has-text("Valentine Bear"))').getByRole('link', { name: 'Buy' }).click();

        // Click on Cart link
        await page.getByRole('link', { name: 'Cart' }).click();

        // Verify the total price for each product
        const stuffedFrogUnitPrice = await page.locator('tr:has-text("Stuffed Frog")').locator('td').nth(1).textContent();
        const stuffedFrogQuantity = await page.locator('tr:has-text("Stuffed Frog")').locator('input[name="quantity"]').inputValue();
        const stuffedFrogTotalPrice = await page.locator('tr:has-text("Stuffed Frog")').locator('td').nth(3).textContent();

         console.log("Stuffed Frog Unit price ",stuffedFrogUnitPrice);    
         console.log("Stuffed Frog Quantity ",stuffedFrogQuantity);    
         console.log("Stuffed Frog Total price ",stuffedFrogTotalPrice);    

        const fluffyBunnyUnitPrice = await page.locator('tr:has-text("Fluffy Bunny")').locator('td').nth(1).textContent();
        const fluffyBunnyQuantity = await page.locator('tr:has-text("Fluffy Bunny")').locator('input[name="quantity"]').inputValue();
        const fluffyBunnyTotalPrice = await page.locator('tr:has-text("Fluffy Bunny")').locator('td').nth(3).textContent();

        console.log(fluffyBunnyUnitPrice);    
        console.log(fluffyBunnyQuantity);    
        console.log(fluffyBunnyTotalPrice); 

        const valentineBearUnitPrice = await page.locator('tr:has-text("Valentine Bear")').locator('td').nth(1).textContent();
        const valentineBearQuantity = await page.locator('tr:has-text("Valentine Bear")').locator('input[name="quantity"]').inputValue();
        const valentineBearTotalPrice = await page.locator('tr:has-text("Valentine Bear")').locator('td').nth(3).textContent();


        console.log(valentineBearUnitPrice);    
        console.log(valentineBearQuantity);    
        console.log(valentineBearTotalPrice); 

        // Calculate expected total prices
        const stuffedFrogExpectedTotal = (parseFloat(stuffedFrogUnitPrice!.replace('$', '')) * parseInt(stuffedFrogQuantity));
        console.log(stuffedFrogExpectedTotal); 
        const fluffyBunnyExpectedTotal = (parseFloat(fluffyBunnyUnitPrice!.replace('$', '')) * parseInt(fluffyBunnyQuantity));
        console.log(fluffyBunnyExpectedTotal); 
        const valentineBearExpectedTotal = (parseFloat(valentineBearUnitPrice!.replace('$', '')) * parseInt(valentineBearQuantity));
        console.log(valentineBearExpectedTotal); 

        // // Assert total prices
        expect(stuffedFrogTotalPrice).toBe(`$${stuffedFrogExpectedTotal}`);
        console.log(stuffedFrogTotalPrice); 
        console.log(stuffedFrogExpectedTotal); 
        expect(fluffyBunnyTotalPrice).toBe(`$${fluffyBunnyExpectedTotal}`);
        console.log(fluffyBunnyTotalPrice); 
        console.log(fluffyBunnyExpectedTotal); 
        expect(valentineBearTotalPrice).toBe(`$${valentineBearExpectedTotal}`);
        console.log(valentineBearTotalPrice); 
        console.log(valentineBearExpectedTotal);

        // Verify the overall total price
        const totalValueText = await page.locator('strong.total').textContent();
        const overallTotalPrice = parseFloat(totalValueText!.replace('Total:', '').trim());        
        const overallExpectedTotal = stuffedFrogExpectedTotal + fluffyBunnyExpectedTotal + valentineBearExpectedTotal;
        console.log(overallTotalPrice);
        console.log(overallExpectedTotal);
        expect(overallTotalPrice).toBe(overallExpectedTotal);
       
});