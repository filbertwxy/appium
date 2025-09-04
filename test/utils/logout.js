export const logoutBaskit = async () => {
  const beranda = await $('~Beranda');

  const isBerandaVisible = await beranda.isDisplayed().catch(() => false);

  if (!isBerandaVisible) {
    console.log('Beranda is not visible — skipping logout.');
    return; // ✅ Exit early so the test moves on
  }

  // If Beranda is visible, proceed with logout
  const profileXPath = '//android.view.View[@class="android.view.View" and @clickable="true"][1]';
  const logout = await $('~Keluar Akun');
  const confirmLogout = await $('~Lanjut Keluar');

  await beranda.click();

  const profileElement = await driver.$(profileXPath);
  await browser.pause(12000)
  await profileElement.click();

  await logout.click();
  await confirmLogout.click();

  const welcomeText = await driver.$('~Selamat datang kembali di Baskit!');
  const description = await welcomeText.getAttribute('content-desc');

  expect(description).toBe('Selamat datang kembali di Baskit!');
};
