import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page : Page, login : any){
    await page.goto(`${process.env.TEST_URL}`);
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');

    await expect(page).toHaveURL(`${process.env.TEST_URL}/transaksi`, { timeout: 20000 });

}
async function Tambahproduk(page : Page, tambahproduk : any,){

    await expect(page).toHaveURL(`${process.env.TEST_URL}/transaksi`);
    await page.getByRole('button', { name: 'Tambah' }).click();

    // Fill in the item details
    await page.getByLabel('Nama Barang').fill(tambahproduk.namabarang);
    await page.getByLabel('SKU').fill(tambahproduk.sku); 
    await page.getByLabel('Harga').fill(tambahproduk.harga);
    await page.getByLabel('Keterangan', { exact: true }).fill(tambahproduk.keterangan);
    await page.getByLabel('Deskripsi (opsional)').fill(tambahproduk.deskripsi);
    await page.getByRole('textbox', { name: 'Kategori' }).click();
    await page.getByRole('option', { name: 'Crypto' }).click();
    await page.getByLabel('Jumlah Stok').fill(tambahproduk.jumlahstok);

    // Step 4: Save the new item
    await page.getByRole('button', { name: 'Simpan' }).click();

    const successMessage = page.locator('.swal2-success-ring');
    await expect(successMessage).toBeVisible();
}

async function Hapus(page, hapus : any){
    await page.locator('.MuiDataGrid-cell--withRenderer').first().click();
    await page.locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(2) > div').first().click();
    await page.locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(3) > div').first().click();
    await page.locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(4) > div').first().click();
    await page.locator('.MuiDataGrid-virtualScrollerRenderZone > div:nth-child(5) > div').first().click();
}

//-------------------------------------------------------------------------------------------------//


test ('Tambah Produk ulotumbuh', async ({page}) => {
    const  tambahproduk = {
    
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        namabarang : 'Hedera',
        sku : '',
        harga : '9000',
        keterangan : 'Hedera',
        deskripsi : 'Hedera',
        jumlahstok : '1000',
        };
    
        const login = {
            email : 'dogeheaven2@gmail.com',
            password : 'rahasia123',
        }
    
        await Login (page, login);
        await Tambahproduk (page, tambahproduk);

})
test ('Hapus multiple harga', async ({page}) =>{
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }


})