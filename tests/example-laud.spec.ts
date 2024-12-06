import { test, expect, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();


async function createUser(page: Page, userData: any) {
  
  // url web yang akan di test
  await page.goto(`${process.env.TEST_URL}`);
  await page.getByPlaceholder('Username').fill(userData.adminUsername);
  await page.getByPlaceholder('Password').fill(userData.adminPassword);
  await page.getByRole('button', { name: 'Sign in ' }).click();
  await page.getByRole('link', { name: ' Users' }).click();
  await page.getByRole('button', { name: ' Tambah' }).click();
  
  // Isi form dengan data user
  await page.goto(`${process.env.TEST_URL}/users/create`);
  await page.getByPlaceholder('Username').fill(userData.username);
  await page.getByPlaceholder('Password').fill(userData.password);
  await page.getByPlaceholder('Nama').fill(userData.name);
  await page.getByPlaceholder('Nickname').fill(userData.nickname);
  await page.getByPlaceholder('Email').fill(userData.email);
  await page.getByPlaceholder('999 9999 9999 999').fill(userData.whatsapp);
  //await page.locator('#alamat').focus();
  await page.locator('#alamat').fill(userData.address);
  
  await page.getByTitle('- Pilih Coload -').click();
  await page.getByRole('treeitem', { name: userData.coload }).click();
  // await page.getByRole('combobox', { name: '-- Pilih Coload --' }).click();
  // await page.getByRole('treeitem', { name: userData.coload }).click();
  await page.getByRole('combobox', { name: '-- Pilih Role --' }).click();
  await page.getByRole('treeitem', { name: userData.role }).click();
  await page.getByRole('combobox', { name: '-- Pilih Sales --' }).click();
  await page.getByRole('treeitem', { name: userData.sales }).click();
  await page.getByRole('combobox', { name: 'Aktif' }).click();
  await page.getByRole('treeitem', { name: userData.status, exact: true }).click();

// Tunggu sampai elemen dengan placeholder 'Marking' muncul
await page.waitForFunction(() => document.querySelector('input[placeholder="Marking"]') !== null);

for (let i = 0; i < userData.shippingMarks.length; i++) {
  // Isi kolom dengan shipping mark
  await page.locator(`input[placeholder="Marking"]`).nth(i).fill(userData.shippingMarks[i]);

  // Jika masih ada shipping mark yang tersisa, klik tombol tambah (+) untuk menambah input baru
  if (i < userData.shippingMarks.length - 1) {
    await page.getByRole('button', { name: '' }).click(); // Klik tombol tambah
    await page.waitForSelector(`input[placeholder="Marking"]`); // Tunggu kolom input baru muncul
  }
}
  await page.getByPlaceholder('Wilayah').fill(userData.wilayah);
  await page.locator('#keterangan').fill(userData.keteranganUser);
  await page.getByRole('button', { name: 'Simpan ' }).click();
  await expect(page).toHaveURL(`${process.env.TEST_URL}/users`);
}


test('Create User', async ({page}) => {
  // Go to User, Create user
  const userData = {
    adminUsername: 'administrator',
    adminPassword: 'laud2024',
    username: 'haidartest',
    password: 'laud2024',
    name: 'haidar consumer',
    nickname: 'haidarr',
    email: 'testhendry@yopmail.com',
    whatsapp: '081398716212',
    address: 'Angke jaya 7 Jakbar',
    coload: '大华物流 - Dahua Logistics',
    role: 'Customer',
    sales: 'Marketing Nore',
    status: 'Aktif',
    shippingMarks: ['1111', '1234', '2222'],
    region: 'Jakarta',
    description: 'JAKARTA',
    wilayah: 'Jakarta',
    keteranganUser: 'Keterangan User',
  };
  // Create the first user
  await createUser(page, userData);
  // await page.getByRole('button', { name: 'Simpan' }).click();

  // Verify the user is created successfully
  // await expect(page.getByRole('gridcell', { name: 'testHendry4' }).first()).toBeVisible();
  // await expect(page.getByRole('gridcell', { name: '1111 1234' })).toBeVisible();
  // // expect setelah login
  // await expect(page).toHaveTitle('LAUD - Users Create')
  // await expect(page).toHaveURL(`${process.env.TEST_URL}/users/create`);
});