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
    
    //cek tab invoice
    await page.getByRole('tab', { name: 'Invoice' }).click();
    const daftarinvoice = page.getByText('Daftar Invoice');
    await expect(daftarinvoice).toBeVisible();
    // tab mutasi
    await page.getByRole('tab', { name: 'Mutasi' }).click();
    const tabmutasi = page.getByText('Mutasi Stok');
    await expect(tabmutasi).toBeVisible();
    // tab stok terjual
    await page.getByRole('tab', { name: 'Stok Terjual' }).click();
    const stokterjual = page.getByLabel('Stok Terjual', { exact: true }).getByText('Stok Terjual');
    await expect(stokterjual).toBeVisible();
    // tab pengeluaran
    await page.getByRole('tab', { name: 'Pengeluaran' }).click();
    const pengeluaran = page.getByText('Atur Pengeluaran');
    await expect(pengeluaran).toBeVisible();
    // tab laba rugi
    await page.getByRole('tab', { name: 'Laba Rugi' }).click();
    const labarugi = page.getByRole('tab', { name: 'Laba Rugi' });
    await expect(labarugi).toBeVisible();


}


test('Page Stok', async ({page}) => {
    
    const login = {
    email : 'dogeheaven2@gmail.com',
    password : 'rahasia123',
    }
    await Login (page, login);
    await Stok (page);
});

test('Page Laporan', async ({page}) => {

    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
        await Login (page, login);
        await Laporan(page);
});

