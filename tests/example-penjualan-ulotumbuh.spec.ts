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

    // Verify the item is added successfully (add appropriate validation)
    const successMessage = page.locator('.swal2-success-ring');
    await expect(successMessage).toBeVisible();
}

async function Tambahpaket(page : Page, tambahpaket : any) {

    await expect(page).toHaveURL(`${process.env.TEST_URL}/transaksi`); 
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('button', { name: 'Bundling / Paket' }).click();
    await page.getByRole('img', { name: 'loading...' }).waitFor({ state: 'hidden'});
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Lanjutkan' }).click();

    // Isi jumlah item untuk setiap produk
    for (let i = 0; i <= 10; i++) {

        const isFilled = await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).getAttribute('value') !== '1';

        if(isFilled) {
            console.log('Penuh bang');
            break;        
        }
        else {

        await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).click();
        await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).fill(tambahpaket.jumlahitem, { timeout: 100000 });
        }
    }

    // Isi nama paket
    await page.getByLabel('Nama Paket',{ exact: true }).click();
    await page.getByLabel('Nama Paket', { exact: true }).fill(tambahpaket.namapaket);

    // Isi harga paket
    await page.getByLabel('Harga').click();
    await page.getByLabel('Harga').fill(tambahpaket.hargapaket);

    // Isi keterangan paket
    await page.getByLabel('Keterangan', { exact: true }).click();
    await page.getByLabel('Keterangan', { exact: true }).fill(tambahpaket.keteranganpaket);

    // Isi deskripsi paket (opsional)
    await page.getByLabel('Deskripsi Paket (opsional)').click();
    await page.getByLabel('Deskripsi Paket (opsional)').fill(tambahpaket.deskripsipaket);

    // Pilih kategori "Crypto"
    await page.locator('form').getByRole('button', { name: '', exact: true }).click();
    await page.getByRole('option', { name: 'Crypto' }).click();

    // Klik tombol "Simpan"
    await page.getByRole('button', { name: 'Simpan'}).click();
    
    const successMessage = page.locator('.swal2-success-ring', );
    await expect(successMessage).toBeVisible();
}

async function Pembayaran (page:Page, pembayaran) {
    
    await expect(page).toHaveURL(`${process.env.TEST_URL}/transaksi`); 
    await page.locator('.MuiPaper-root > div > .MuiButton-root').first().click();
    await page.locator('div:nth-child(2) > div > .MuiButton-root').first().click();
    await page.locator('div:nth-child(3) > div > .MuiButton-root').click();
    await page.getByText('Bayar').click();

    await page.getByRole('button', { name: 'Uang Pas' }).click();
    await page.getByRole('button', { name: 'Bayar' }).click();
    await page.getByRole('checkbox', { name: 'Kirim struk' }).check();
    
    // Verify the initial phone number
    await page.getByRole('textbox', { name: 'Contoh: budi93@gmail.com' }).fill(pembayaran.emailstruk);    
    
    const page6Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Bayar' }).click();
    const page6 = await page6Promise;

    await expect(page.getByLabel('Transaksi berhasil!')).toBeVisible();
    
}

test('Login  ULO -Tumbuh', async ({page}) => {
    
    const login = {
    email : 'dogeheaven2@gmail.com',
    password : 'rahasia123',
    }
    await Login (page, login);
});

test('Tambah Produk', async ({page}) => {

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
});

test('Tambah Paket', async ({page}) => {

    const tambahpaket = {

        jumlahitem : '1000',
        namapaket : 'Nama paket Hemat',
        hargapaket : '5000',
        keteranganpaket : 'keterangan',
        deskripsipaket : 'Deskripsi paket',
    };
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }

    await Login (page, login);
    await Tambahpaket (page, tambahpaket);
});

test ('Pembayaran - kirim email', async ({page}) => {
    const pembayaran = {
        emailstruck : 'email@gmail.com',
    }
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }
    await Login (page, login);
    await Pembayaran(page, pembayaran)

});