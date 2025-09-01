export const handleMulaiBekerja = async () => {
  const mulai = await $('~Mulai Bekerja');
  const welcomeMessage = await $(`android=new UiSelector().descriptionContains("Selamat Datang Sales")`);

  if (await mulai.isDisplayed()) {
    console.log('🟢 User has not started shift. Proceeding to Mulai Bekerja flow.');

    await mulai.click();

    const pageFoto = await $('~Ketentuan Foto');
    await expect(pageFoto).toBeDisplayed();


  } else if (await welcomeMessage.isDisplayed()) {
    console.log('🟢 User already checked in. You can proceed to another flow (e.g., transactions).');


  } else {
    throw new Error('🛑 Unexpected state: Neither check-in nor welcome screen was found.');
  }
};