import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page : Page, login : any){
    await page.goto(`${process.env.TEST_URL}/`, { timeout: 20000 });
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');
    await expect(page).toHaveURL(`${process.env.TEST_URL}/beranda`, { timeout: 20000 }); 

}

async function Tambahpengguna(page : Page, tambahpengguna : any) {
    await page.getByRole('link', { name: 'Pengaturan Pengguna' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/pengaturan-pengguna`, { timeout: 20000 }); 
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('button', { name: 'Buka' }).click();
    // Diisi option toko yang ada
    await page.getByRole('option', { name: 'Haystoree' }).click();

    await page.getByLabel('Nama Lengkap').click();
    await page.getByLabel('Nama Lengkap').fill(tambahpengguna.namalengkap);
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill(tambahpengguna.username);
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(tambahpengguna.email);
    await page.getByLabel('Alamat lengkap (opsional)').click();
    await page.getByLabel('Alamat lengkap (opsional)').fill(tambahpengguna.alamatlengkap);
    await page.getByLabel('No Telepon (opsional)').click();
    await page.getByLabel('No Telepon (opsional)').fill(tambahpengguna.notelepon);
    await page.getByLabel('Kata Sandi', { exact: true }).click();
    await page.getByLabel('Kata Sandi', { exact: true }).fill(tambahpengguna.password);
    await page.getByLabel('Ulang Kata Sandi').click();
    await page.getByLabel('Ulang Kata Sandi').fill(tambahpengguna.password);
    // await page.getByLabel('Tambah Pengguna').locator('button').nth(2).click();
    await page.locator('input[name="aksesTransaksi"]').check();
    await page.locator('input[name="aksesStok"]').check();
    await page.getByLabel('Laporan', { exact: true }).check();
    await page.locator('input[name="aksesKeuangan"]').check();
    await page.getByLabel('Stok', { exact: true }).nth(1).check();
    await page.getByLabel('Ukm', { exact: true }).check();
    await page.getByLabel('Keuangan').nth(1).check();
    await page.getByRole('button', { name: 'Simpan Pengguna' }).click();

    await expect(page.locator('.swal2-success-ring')).toBeVisible({ timeout: 50000 });
}
test('Pengaturan pengguna- Tambah', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    const tambahpengguna = {
        namalengkap : 'gatotkaca4',
        username : 'gatotberotot4',
        email : 'gatotkaca4@gmail.com',
        alamatlengkap : 'majapahitempire',
        notelepon : '85173154578',
        password : 'rahasia123',
    }
    await Login (page, login);
    await Tambahpengguna(page, tambahpengguna)

     
    
}) 