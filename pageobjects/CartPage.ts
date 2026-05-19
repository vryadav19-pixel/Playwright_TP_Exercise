import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly selectproduct1: Locator;
  readonly selectproduct2: Locator;
  readonly cartlink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectproduct1 = page.locator('.inventory_item').first().getByRole('button', {name: 'Add to cart'});
    this.selectproduct2 = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Onesie' }).getByRole('button', {name: 'Add to cart'});
    this.cartlink = page.locator('a.shopping_cart_link')
  }
  
  async addProducts() {
    await this.selectproduct1.click();
    await this.selectproduct2.click();
    await this.cartlink.click();
  }

}