import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page : Page, login : any){
    await page.goto(`${process.env.TEST_URL}/beranda`, { timeout: 20000 });
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');
    await expect(page).toHaveURL(`${process.env.TEST_URL}/beranda`, { timeout: 20000 }); 

}

async function  Tambahsatuan(page : Page, daftarstok: any ) {
    if ( await page.getByRole('link', { name: 'Daftar Stok' }).isVisible()) {

        await page.getByRole('link', { name: 'Daftar Stok' }).click();
      } else {
        await page.getByRole('button', { name: 'Stok' }).click();
    }

    await page.getByRole('link', { name: 'Daftar Stok' }).click();
    await page.getByRole('button', { name: 'Tambah' }).click();

    // Fill in the item details
    await page.getByLabel('Nama Barang').fill(daftarstok.namabarang);
    await page.getByRole('textbox', { name: 'SKU' }).fill(daftarstok.sku); 
    await page.getByRole('textbox', { name: 'Harga' }).fill(daftarstok.harga);
    await page.getByLabel('Keterangan', { exact: true }).fill(daftarstok.keterangan);
    await page.getByLabel('Deskripsi (opsional)').fill(daftarstok.deskripsi);
    await page.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'Crypto' }).click();
    await page.getByLabel('Jumlah Stok').fill(daftarstok.jumlahstok);

    // Step 4: Save the new item
    await page.getByRole('button', { name: 'Simpan' }).click();

    const successMessage = page.locator('.swal2-success-ring');
    await expect(successMessage).toBeVisible();
    
}

async function Tambahpaket(page : Page, tambahpaket : any) {
    try {
        // Mencoba klik 'Daftar Stok' jika elemen ada dan terlihat
        await page.getByRole('link', { name: 'Daftar Stok' }).click();
      } catch (error) {
        // Jika elemen tidak ada/terlihat, klik tombol 'Stok'
        await page.getByRole('button', { name: 'Stok' }).click();
      }
    
    await page.getByRole('link', { name: 'Daftar Stok' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/stok/daftar-stok`, { timeout: 30000 }); 
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('button', { name: 'Bundling / Paket' }).click();
    await page.locator('.MuiBox-root > div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div > div:nth-child(6)').first().click();
    await page.locator('.MuiBox-root > div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div:nth-child(2) > div:nth-child(6)').click();
    await page.locator('.MuiBox-root > div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div:nth-child(3) > div:nth-child(6)').click();
    await page.getByRole('button', { name: 'Lanjutkan' }).click();

    // await expect(page.getByText('Atur deskripsi dan harga paket')).toBeVisible();

    for (let i = 0; i <= 10; i++) {
        // Cek apakah elemen input ada
        const elementExists = await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).count();
        
        if (elementExists === 0) {
            // Jika elemen tidak ditemukan, hentikan loop
            break;
        }
    
        // Cek apakah elemen sudah terisi
        const isFilled = await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).getAttribute('value') !== '1';
    
        if (isFilled) {
            continue; // Lewati iterasi ini jika field sudah terisi
        } else {
            // Isi field jika belum terisi
            await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).click();
            await page.locator(`input[name="item\\.${i}\\.jumlahItem"]`).fill(tambahpaket.jumlahitem);
        }
    }
    

    // Isi nama paket
    await expect(page.getByLabel('Nama Paket',{ exact: true })).toBeVisible();
    await page.getByLabel('Nama Paket',{ exact: true }).click();
    await page.getByLabel('Nama Paket', { exact: true }).fill(tambahpaket.namapaket);

    // Isi harga paket
    await page.getByRole('textbox', { name: 'Harga' }).click();
    await page.getByRole('textbox', { name: 'Harga' }).fill(tambahpaket.hargapaket);

    // Isi keterangan paket
    await page.getByLabel('Keterangan').click();
    await page.getByLabel('Keterangan').fill(tambahpaket.keteranganpaket);

    // Isi deskripsi paket (opsional)
    await page.getByLabel('Deskripsi Paket (opsional)').click();
    await page.getByLabel('Deskripsi Paket (opsional)').fill(tambahpaket.deskripsipaket);

    // Pilih kategori "Crypto"

    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: 'Crypto' }).click();

    // Klik tombol "Simpan"
    await page.getByRole('button', { name: 'Simpan'}).click();
    
    const successMessage = page.locator('.swal2-success-ring', );
    await expect(successMessage).toBeVisible({ timeout: 100000 });
}

async function Tambahkategori(page : Page, tambahkategori : any){
    if ( await page.getByRole('link', { name: 'Daftar Kategori' }).isVisible()) {

        await page.getByRole('link', { name: 'Daftar Kategori' }).click();
      } else {
        await page.getByRole('button', { name: 'Stok' }).click();
    }
    await page.getByRole('link', { name: 'Daftar Kategori' }).click();
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByPlaceholder('Masukkan kategori baru').click();
    await page.getByPlaceholder('Masukkan kategori baru').fill(tambahkategori);
    await page.locator('div').filter({ hasText: /^Simpan$/ }).click();

    const successMessage = page.locator('.swal2-success-ring', );
    await expect(successMessage).toBeVisible();
}

async function Mutasistok(page : Page, mutasistok : any){
    if ( await page.getByRole('link', { name: 'Mutasi Stok' }).isVisible()) {

        await page.getByRole('link', { name: 'Mutasi Stok' }).click();

      } else {
        await page.getByRole('button', { name: 'Stok' }).click();
    }

    await page.getByRole('link', { name: 'Mutasi Stok' }).click();
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.locator('div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div > div:nth-child(6)').first().click();
    await page.locator('div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div:nth-child(2) > div:nth-child(6)').click();
    await page.locator('div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div:nth-child(3) > div:nth-child(6)').click();
    await page.getByRole('button', { name: 'Lanjutkan' }).click();
   
    // Jumlah stok Multi input
    for (let i = 0; i <= 10; i++) {
        // Cek apakah elemen input ada
        const elementExists = await page.locator(`input[name="detail\\.${i}\\.nestedDetail\\.0\\.jumlahStok"]`).count();
        
        if (elementExists === 0) {
            // Jika elemen tidak ditemukan, hentikan loop
            break;
        }
    
        // Cek apakah elemen sudah terisi
        const isFilled = await page.locator(`input[name="detail\\.${i}\\.nestedDetail\\.0\\.jumlahStok"]`).getAttribute('value') !== '';
    
        if (isFilled) {
            continue; // Lewati iterasi ini jika field sudah terisi
        } else {
            // Isi field jika belum terisi
            await page.locator(`input[name="detail\\.${i}\\.nestedDetail\\.0\\.jumlahStok"]`).click();
            await page.locator(`input[name="detail\\.${i}\\.nestedDetail\\.0\\.jumlahStok"]`).fill(mutasistok.jumlahstok);
        }

    }

    // Jumlah Keterangan Multi input
    for (let i = 0; i <= 10; i++) {
        // Cek apakah elemen input ada
        const elementExists = await page.locator(`textarea[name="detail\\.${i}\\.nestedDetail\\.0\\.keterangan"]`).count();
        
        if (elementExists === 0) {
            // Jika elemen tidak ditemukan, hentikan loop
            break;
        }
    
        // Cek apakah elemen sudah terisi
        const isFilled = await page.locator(`textarea[name="detail\\.${i}\\.nestedDetail\\.0\\.keterangan"]`).getAttribute('value') !== '';
    
        if (isFilled) {
            continue; // Lewati iterasi ini jika field sudah terisi
        } else {
            // Isi field jika belum terisi
            await page.locator(`textarea[name="detail\\.${i}\\.nestedDetail\\.0\\.keterangan"]`).click();
            await page.locator(`textarea[name="detail\\.${i}\\.nestedDetail\\.0\\.keterangan"]`).fill(mutasistok.keteranganstok);
        }

    }
    await page.getByRole('button', { name: 'Simpan' }).click();
    const successMessage = page.locator('.swal2-success-ring', );
    await expect(successMessage).toBeVisible();
}



// ------------------------------------------------------------------------------------------
test('daftar Stok-TambahSatuan', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }
    const daftarstok = {
        namabarang : 'Pc gaming',
        sku : '',
        harga : '300000',
        keterangan : 'user hp minggir dulu',
        deskripsi : 'dilengkapi dengan gtx AI terdepan',
        jumlahstok : '10',

    }

    await Login (page, login);
    await Tambahsatuan(page, daftarstok);
})

test('daftar Stok-TambahPaket', async ({page}) => { 
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }
    const tambahpaket = {
        namapaket : 'Datapiggy',
        sku : '',
        hargapaket : '3000',
        keteranganpaket : 'user hp minggir ',
        deskripsipaket : 'dilengkapi dengan gtx AI ',
        jumlahitem : '10',

    }
// -----------------------------------------------------------------------------------------------------
    await Login (page, login);
    await Tambahpaket(page, tambahpaket);
})

test('daftar Kategori-TambahKategori', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }
    const tambahkategori = 'Degen';

    await Login (page, login);
    await Tambahkategori(page, tambahkategori);
})

test('daftar Mutasi-Mutasistok', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
    }
    const mutasistok = {
        jumlahstok : '10',
        keteranganstok: 'Keterangan',
    }

    await Login (page, login);
    await Mutasistok(page, mutasistok);
})
