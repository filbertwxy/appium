export const ambilFoto = async ()=>{
  
    const ambilFoto = $('~Ambil Foto')
    const shutter = $('~Shutter')
    const donePhoto = $('~Done')
    await ambilFoto.click()
    await browser.pause(2000)
    await shutter.click()
    await browser.pause(2000)
    await donePhoto.click()

}

export const verifyLokasi = async ()=>{
   const lokasi = $('~Lihat Lokasi ')
    const submit = $('~Simpan')
    const success = $('~Waktu Kerja Kamu Dimulai!')
    await expect(lokasi).toBeDisplayed()
    await submit.click()
    await expect (success).toBeDisplayed()
}

export const keBeranda = async()=>{
  const beranda = $('~Ke Beranda')
    const welcomeMessage = await $(`android=new UiSelector().descriptionContains("Selamat Datang Sales")`);
    await expect(welcomeMessage).toBeExisting();

    
    await beranda.click()
    // Get the full content-desc
   

    // Assert that it starts with expected value
    await expect(welcomeMessage).toHaveTextContaining('Selamat Datang Sales');

}

export const handleMulaiBekerja = async () => {
  const mulai = await $('~Mulai Bekerja');
  const welcomeMessage = await $(`android=new UiSelector().descriptionContains("Selamat Datang Sales")`);

  if (await mulai.isDisplayed()) {
    console.log('🟢 User has not started shift. Proceeding to Mulai Bekerja flow.');

    await mulai.click();

    const pageFoto = await $('~Ketentuan Foto');
    await expect(pageFoto).toBeDisplayed();
    await ambilFoto()
    await browser.pause(5000)
    await verifyLokasi()
    await keBeranda()

  } else if (await welcomeMessage.isDisplayed()) {
    console.log('🟢 User already checked in. You can proceed to another flow (e.g., transactions).');


  } else {
    throw new Error('🛑 Unexpected state: Neither check-in nor welcome screen was found.');
  }
};



