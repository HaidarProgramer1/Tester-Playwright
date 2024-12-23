import { test, expect, Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function Login( page : Page, login : any){
    await page.goto(`${process.env.TEST_URL}/beranda`, { timeout: 20000 });
    await page.getByPlaceholder('Contoh: ulo@gmail.com').fill(login.email);
    await page.getByPlaceholder('Minimal 8 karakter').fill(login.password);
    await page.getByPlaceholder('Minimal 8 karakter').press('Enter');

}

async function Logout( page : Page){
    await page.locator('.MuiAvatar-root.MuiAvatar-circular.MuiAvatar-colorDefault').nth(0).click();
    await page.getByRole('button', { name: 'Keluar' }).click();
    await page.getByRole('button', { name: 'Keluar' }).click();
    await expect(page).toHaveURL(`${process.env.TEST_URL}`);
}

test('Login ULO-Juragan succes', async ({page}) => {
    
    const login = {
    // Salah Email
    email : 'dogeheaven2@gmail.com',
    password : 'rahasia123',
    };
    
    await Login (page, login);
    await expect(page).toHaveURL(`${process.env.TEST_URL}/beranda`, { timeout: 20000 }); 
});

test('wrong Pass', async ({page}) => {
    
    const login = {
    email : 'dogeheaven2@gmail.com',
    // Salah Password
    password : 'salahbangh',
    };
    await Login (page, login);

    await expect(page.getByRole('heading', { name: 'Terjadi Kesalahan!' })).toBeVisible();
});

test('wrong Email', async ({page}) => {
    
    const login = {
    email : 'pedaganggagalhehe2@gmail.com',
    password : 'rahasia123',
    };
    await Login (page, login);

    await expect(page.getByRole('heading', { name: 'Terjadi Kesalahan!' })).toBeVisible();
});


test('Logout Ulo-Juragan', async ({page}) => {
    const login = {
        // Salah Email
        email : 'dogeheaven2@gmail.com',
        password : 'rahasia123',
        };
        
        await Login (page, login);
        await Logout(page);
});

