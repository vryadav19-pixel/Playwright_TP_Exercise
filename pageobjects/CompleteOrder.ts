import { Locator, Page, expect } from '@playwright/test';

export class CompleteOrderPage {
  readonly page: Page;
  readonly cartitems: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly totalprice: Locator;
  readonly finishbutton: Locator;
  readonly menubutton: Locator;
  readonly logoutlink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartitems = page.locator('.inventory_item_name');
    this.paymentInformation = page.getByText('SauceCard #31337');
    this.shippingInformation = page.getByText('Free Pony Express Delivery!');
    this.totalprice = page.locator('.summary_total_label');
    this.finishbutton = page.locator('[data-test="finish"]');
    this.menubutton = page.getByRole('button', { name: 'Open Menu' })
    this.logoutlink = page.getByRole('link', { name: 'Logout' })
    
  }
  
  async CompleteOrderPage() {
    await expect(this.cartitems).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Onesie']);
    await expect(this.paymentInformation).toBeVisible();
    await expect(this.shippingInformation).toBeVisible();
    await expect(this.totalprice).toHaveText('Total: $41.02');
    await this.finishbutton.click();
  }

   async logoutSuccessfully() {
    await this.menubutton.click();
    await this.logoutlink.click();
  }


}