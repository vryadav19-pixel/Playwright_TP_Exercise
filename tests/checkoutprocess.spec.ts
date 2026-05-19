import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/Loginpage';
import { CartPage } from '../pageobjects/CartPage';
import { CheckoutPage } from '../pageobjects/CheckoutPage';
import { CompleteOrderPage } from '../pageobjects/CompleteOrder';


test('Completing a Purchase', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(page).toHaveTitle('Swag Labs');

  // Login successfull
  await loginPage.Login();
  await expect(page.getByText('Products')).toBeVisible();

  // Add products to cart and check items in cart on cart page
  const cartpage = new CartPage(page);
  await cartpage.addProducts();
  await expect(page.getByText('Your Cart')).toBeVisible();
  await expect(page.locator('.cart_item')).toHaveCount(2);
  console.log('Items in cart:' + await page.locator('.cart_item').count());

  // Add details on checkout page
  const checkoutpage = new CheckoutPage(page);
  await checkoutpage.checkoutPage();
  await expect(page.getByText('Checkout: Overview')).toBeVisible();

 // Check order summary and Complete the order
  const completeorderpage = new CompleteOrderPage(page);
  await completeorderpage.CompleteOrderPage();
  const orderconfirmationmessage = page.locator('//h2[@class="complete-header"]');
  await expect(orderconfirmationmessage).toHaveText('Thank you for your order!');
  console.log(await orderconfirmationmessage.textContent());

  // logout and verify user is navigated to login page
  completeorderpage.logoutSuccessfully();
  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');
});