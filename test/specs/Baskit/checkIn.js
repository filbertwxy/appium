import { launchAppFromHome } from '../../utils/launchApp.js';
import { loginToBaskit } from '../../utils/login.js';
import { handleMulaiBekerja } from '../../utils/handleMulaiBekerja.js';


describe('Sales Checkin',()=>{


before(async () => {
  await launchAppFromHome();
});

it('Login to Baskit',async ()=>{
    const email = "oliver@gmail.com";
    const pass = "12345678";
    await loginToBaskit(email,pass)
})
it('Mulai Bekerja',async ()=>{
    await handleMulaiBekerja();
       // ... continue with the "Ambil Foto" and location check-in flow
    })

it('Ambil Foto',async()=>{
    const ambilFoto = $('~Ambil Foto')
    const shutter = $('~Shutter')
    const donePhoto = $('~Done')
    await ambilFoto.click()
    await browser.pause(2000)
    await shutter.click()
    await browser.pause(2000)
    await donePhoto.click()
})
it('Verify Lokasi and Submit',async()=>{
    const lokasi = $('~Lihat Lokasi ')
    const submit = $('~Simpan')
    const success = $('~Waktu Kerja Kamu Dimulai!')
    await expect(lokasi).toBeVisible()
    await submit.click()
    await expect (success).toBeVisible()
    
})
it('Go back to home',async ()=>{
    const beranda = $('~Ke Beranda')
    const welcomeMessage = await $(`android=new UiSelector().descriptionContains("Selamat Datang Sales")`);
    await expect(welcomeMessage).toBeExisting();

    
    await beranda.click()
    // Get the full content-desc
   

    // Assert that it starts with expected value
    await expect(welcomeMessage).toHaveTextContaining('Selamat Datang Sales');


 
})
})