import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page : Page, login : any){
    await page.goto(`${process.env.TEST_URL}/beranda`, { timeout: 20000 });
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');
    // await expect(page).toHaveURL(`${process.env.TEST_URL}/beranda`, { timeout: 20000 }); 

}

async function Riwayatpembayaran(page : Page) {
    await page.getByRole('link', { name: 'Riwayat Pembayaran' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/pembayaran`, { timeout: 20000 }); 
}

async function Riwayataktivitas(page : Page) {
    await page.getByRole('link', { name: 'Riwayat Aktivitas' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/riwayat-aktivitas`, { timeout: 20000 }); 
}

test('Beranda', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    await Login (page, login);
    await page.getByRole('link', { name: 'Beranda' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/beranda`, { timeout: 20000 }); 
}) 

test('Riwayat Pembayaran', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    await Login (page, login);
    await Riwayatpembayaran(page);
})

test('Riwayat Aktivitas', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    await Login (page, login);
    await Riwayataktivitas(page);
})









