import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


async function login(page, username:string, password:string){
  // url web yang akan di test
  await page.goto(`${process.env.TEST_URL}`);
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in ' }).click();
}

async function logout(page, username:string) {
  await page.getByRole('link', { name: 'Super Admin ' }).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
}

test('login-success', async ({ page }) => {
  //  credent
  const username = 'administrator';
  const password = 'laud2024';
  await login(page, username, password);

  // expect setelah login
  await expect(page).toHaveTitle('LAUD - Dashboard')
  await expect(page).toHaveURL(`${process.env.TEST_URL}/dashboard`);
});

test('wrong pass', async ({ page }) => {
    //  credent
    const username = 'administrator';
    const password = 'password';

    // proses login menggunakan function login
    await login(page, username, password);

    // expect test
    await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
  });

  test('null credent', async ({ page }) => {
    const username = '';
    const password = '';
    await login(page, username, password);
    await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
  });

  test('wrong username', async ({ page }) => {
    const username = 'aditganteng';
    const password = 'rahasia123';
    await login(page, username, password);
    await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
  });

  test('logout', async({page}) => {
    // credent
    const username = 'administrator';
    const password = 'laud2024';

    //login menggunakan function login
    await login(page, username, password);

    //logout menggunakan function logout
    await logout(page, username);
  });

  