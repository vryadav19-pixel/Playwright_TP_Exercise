import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutbutton: Locator;
  readonly firstname: Locator;
  readonly lastname: Locator;
  readonly postalcode: Locator;
  readonly continuebutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutbutton = page.locator('button[name=checkout]');
    this.firstname = page.locator('input[name=firstName]');
    this.lastname = page.locator('input[name=lastName]');
    this.postalcode = page.locator('input[id=postal-code]');
    this.continuebutton = page.locator('//input[@value="Continue"]');
    
  }
  
  async checkoutPage() {
    await this.checkoutbutton.click();
    await this.firstname.fill('Anna');
    await this.lastname.fill('Smith');
    await this.postalcode.fill('12345');
    await this.continuebutton.click();
  }

}