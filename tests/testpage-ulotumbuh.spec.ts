import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page , login : any){
    await page.goto(`${process.env.TEST_URL}`);
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');

    await expect(page).toHaveURL(`${process.env.TEST_URL}/transaksi`, { timeout: 20000 });
}

async function Stok( page : Page){
    await page.getByRole('link', { name: 'Stok' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/stok`, { timeout: 20000 });
}

async function Laporan( page :Page) {
    await page.getByRole('link', { name: 'Laporan' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/laporan`, { timeout: 20000 });
}


test('Pindah page Stok', async ({page}) => {
    
    const login = {
    email : 'dogeheaven2@gmail.com',
    password : 'rahasia123',
    }
    await Login (page, login);
    await Stok (page);
});

test('Pindah page Laporan', async ({page}) => {

    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
        await Login (page, login);
        await Laporan(page);
});

