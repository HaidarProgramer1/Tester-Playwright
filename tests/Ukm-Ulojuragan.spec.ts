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


async function  Tambahpembelian(page : Page, tambahpembelian : any ) {
    if (await page.getByRole('link', { name: 'Pembelian' }).isVisible()) {

        await page.getByRole('link', { name: 'Pembelian' }).click();
      } else {
        await page.getByRole('button', { name: 'UKM' }).click();
      }
    
    await page.getByRole('link', { name: 'Pembelian' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/ukm/faktur-pembelian`, { timeout: 20000 }); 
    await page.getByRole('button', { name: 'Tambah' }).click();

    for (let i = 2; i <= 4; i++) { 
        await page.locator(`div:nth-child(3) > .MuiDataGrid-root > .MuiDataGrid-main > div:nth-child(2) > .MuiDataGrid-virtualScroller > .MuiDataGrid-virtualScrollerContent > .MuiDataGrid-virtualScrollerRenderZone > div:nth-child(${i}) > div:nth-child(6)`).click();
      }
    
    await page.getByRole('button', { name: 'Lanjutkan' }).click();
    
    // Jumlah stok Multi input
    for (let i = 0; i <= 10; i++) {
        // Cek apakah elemen input ada
        const elementExists = await page.locator(`input[name="detail\\.${i}\\.jumlahStok"]`).count();
        
        if (elementExists === 0) {
            // Jika elemen tidak ditemukan, hentikan loop
            break;
        }
        // Cek apakah elemen sudah terisi
        const isFilled = await page.locator(`input[name="detail\\.${i}\\.jumlahStok"]`).getAttribute('value') !== '';
    
        if (isFilled) {
            continue; // Lewati iterasi ini jika field sudah terisi
        } else {
            // Isi field jika belum terisi
            await page.locator(`input[name="detail\\.${i}\\.jumlahStok"]`).click();
            await page.locator(`input[name="detail\\.${i}\\.jumlahStok"]`).fill(tambahpembelian.jumlahstok);
        }
    }

    // Harga Beli Multi input
    for (let i = 0; i <= 10; i++) {
        // Cek apakah elemen input ada
        const elementExists = await page.locator(`input[name="detail\\.${i}\\.hargaBeli"]`).count();
        
        if (elementExists === 0) {
            // Jika elemen tidak ditemukan, hentikan loop
            break;
        }  
        // Cek apakah elemen sudah terisi
        const isFilled = await page.locator(`input[name="detail\\.${i}\\.hargaBeli"]`).getAttribute('value') !== '';
    
        if (isFilled) {
            continue; // Lewati iterasi ini jika field sudah terisi
        } else {
            // Isi field jika belum terisi
            await page.locator(`input[name="detail\\.${i}\\.hargaBeli"]`).click();
            await page.locator(`input[name="detail\\.${i}\\.hargaBeli"]`).fill(tambahpembelian.hargabeli);
        }
    }
    
    // Keterangan Multi input
    for (let i = 0; i <= 10; i++) {
        // Cek apakah elemen input ada
        const elementExists = await page.locator(`input[name="detail\\.${i}\\.keterangan"]`).count();
        
        if (elementExists === 0) {
            // Jika elemen tidak ditemukan, hentikan loop
            break;
        }
    
        // Cek apakah elemen sudah terisi
        const isFilled = await page.locator(`input[name="detail\\.${i}\\.keterangan"]`).getAttribute('value') !== '';
    
        if (isFilled) {
            continue; // Lewati iterasi ini jika field sudah terisi
        } else {
            // Isi field jika belum terisi
            await page.locator(`input[name="detail\\.${i}\\.keterangan"]`).click();
            await page.locator(`input[name="detail\\.${i}\\.keterangan"]`).fill(tambahpembelian.keterangan);
        }
    }

    await page.getByRole('button', { name: 'Simpan' }).click();
    await expect(page.getByRole('heading', { name: 'Faktur pembelian dibuat' })).toBeVisible({ timeout: 40000 });
}

async function  Penjualan(page : Page ){
    if (await page.getByRole('link', { name: 'Penjualan' }).isVisible()) {

        await page.getByRole('link', { name: 'Penjualan' }).click();
      } else {
        await page.getByRole('button', { name: 'UKM' }).click();
      }
    
    await page.getByRole('link', { name: 'Penjualan' }).click();

    await page.getByRole('tab', { name: 'Invoice' }).click();
    await expect(page.getByText('Daftar Invoice')).toBeVisible();
    await page.getByRole('tab', { name: 'Stok Terjual' }).click();
    await expect(page.getByLabel('Stok Terjual').getByText('Stok Terjual')).toBeVisible();
}

async function Metodepembayaran(page : Page, metodepembayaran : any){
    if ( await page.getByRole('link', { name: 'Metode Pembayaran' }).isVisible()) {

        await page.getByRole('link', { name: 'Metode Pembayaran' }).click();
      } else {
        await page.getByRole('button', { name: 'UKM' }).click();
      }
    
    await page.getByRole('link', { name: 'Metode Pembayaran' }).click();
    await page.getByRole('button', { name: 'Tambah' }).click();
    await page.getByRole('textbox', { name: 'Nama Metode' }).click();
    await page.getByRole('textbox', { name: 'Nama Metode' }).fill(metodepembayaran.namametode);
    await page.getByLabel('Nomor Tujuan').click();
    await page.getByLabel('Nomor Tujuan').fill(metodepembayaran.nomortujuan);
    await page.getByRole('textbox', { name: 'Nama Pemegang' }).click();
    await page.getByRole('textbox', { name: 'Nama Pemegang' }).fill(metodepembayaran.namapemegang);
    await page.getByRole('button', { name: 'Simpan' }).click();
    const successMessage = page.locator('.swal2-success-ring', );
    await expect(successMessage).toBeVisible();
}

test('UKM-Pembelian (tambah Pembelian)', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }

    const tambahpembelian = {
         jumlahstok : '2',
         hargabeli : '5000',
         keterangan : 'Keterangan',
        }

        await Login (page, login);
        await Tambahpembelian(page, tambahpembelian);
    
})

test('UKM-penjualan', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
        await Login (page, login);
        await Tambahpembelian(page, Penjualan);
})

test('UKM-Pengaturan ukm', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
        await Login (page, login);

    if (await page.getByRole('link', { name: 'Pengaturan UKM' }).isVisible()) {

    await page.getByRole('link', { name: 'Pengaturan UKM' }).click();
    } else {
        await page.getByRole('button', { name: 'UKM' }).click();
    }
    await page.getByRole('link', { name: 'Pengaturan UKM' }).click();
    await page.getByRole('button', { name: 'Tambah UKM' }).click();
    await page.locator('h2').getByRole('button').click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}/pengaturan-ukm`, { timeout: 20000 });
})

test('UKM-metode pembayaran(tambah)', async ({page}) => {
    const login = {
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        }
    const metodepembayaran = {
        namametode : 'Metode panic selling',
        nomortujuan : '151788392',
        namapemegang : 'Haidarsultan',

    }
        await Login (page, login);
        await Metodepembayaran(page, metodepembayaran);
})

