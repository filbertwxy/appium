import { launchAppFromHome } from '../../utils/launchApp.js';
import { loginToBaskit } from '../../utils/login.js';
import { handleMulaiBekerja, keBeranda } from '../../utils/checkIn.js';
import { logoutBaskit } from '../../utils/logout.js';

describe('Create Transaction',()=>{
    before(async () => {
  await driver.terminateApp('com.baskitbeta')
  await launchAppFromHome();
  await logoutBaskit()

 
});

it('Login to Baskit',async ()=>{
    const email = "oliver@gmail.com";
    const pass = "12345678";
    await loginToBaskit(email,pass)
})
it('Mulai Bekerja',async ()=>{
    await handleMulaiBekerja();
    await browser.pause(3000) 
    })

it('Choose Kecamatan',async ()=>{
    const kecamatan = $('~Daftar Kecamatan')
    
    await kecamatan.click()
    const antapani = await $('android=new UiSelector().description("Antapani")');
    await antapani.click();
    await expect(antapani).toBeDisplayed();
    // const isSelected = await antapani.getAttribute('selected');
    // expect(isSelected).toBe('true');
    await browser.pause(2000)
    await driver.back();
    await browser.pause(2000)


})
it('Go to Transaction',async()=>{
    const transaction =  await $('android=new UiSelector().className("android.widget.ImageView").instance(6)');
    await transaction.click()
    const buatPesananTitle = await $('~Buat pesanan');
    await expect(buatPesananTitle).toBeDisplayed();
    
})
it('Choose Seller and Customer',async ()=>{
    const pilihToko =  $('android=new UiSelector().description("Pilih Toko ")');
    await pilihToko.click()
    const namaToko = $('android=new UiSelector().description("Naga Mas Test")');
    await namaToko.click()
    // const isSelected = await namaToko.getAttribute('selected');
    // expect(isSelected).toBe('true');
    const pilihPelanggan =  $('android=new UiSelector().description("Pilih Pelanggan ")');
    const pelangganPage = $("~Pelanggan")
    await browser.pause(3000)
    await pilihPelanggan.click()
    await expect(pelangganPage).toBeDisplayed()
    const customerElement = $('android=new UiSelector().descriptionContains("Kec. Antapani")');
    await expect(customerElement).toBeDisplayed();
    await customerElement.click();

    
})
it('Attempt to remove all the SKU in cart first', async () => {
  const tambahProduk = await $('~Tambah Produk');
  const tambahProdukPage = await $('~Pencarian');

  await tambahProduk.click();
  await expect(tambahProdukPage).toBeDisplayed();

  console.log("Looking for EditText fields and decrease button...");

  // Check if EditText fields are present
  const fields = await $$('android.widget.EditText');
  if (fields.length === 0) {
    console.warn('No EditText fields found. Skipping quantity reduction.');
    return; // exit test early
  }

  // Check if decrease button is visible
  const initialDecreaseButton = await $('~-');
  const isDecreaseVisible = await initialDecreaseButton.isDisplayed().catch(() => false);

  if (!isDecreaseVisible) {
    console.warn('Decrease button not visible. Skipping quantity reduction.');
    return; // exit test early
  }

  // Now begin loop to reduce quantity
  let attempts = 0;
  const maxAttempts = 30;

  while (attempts < maxAttempts) {
    const currentFields = await $$('android.widget.EditText');

    let hasNonZero = false;

    for (const field of currentFields) {
      const text = await field.getText();
      const quantity = parseInt(text) || 0;

      console.log(`Checking field: quantity = ${quantity}`);

      if (quantity > 0) {
        hasNonZero = true;
        break;
      }
    }

    if (!hasNonZero) {
      console.log('All quantity fields are 0. Exiting loop.');
      break;
    }

    // Re-check decrease button each loop (in case of screen changes)
    const decreaseButton = await $('~-');
    const isVisible = await decreaseButton.isDisplayed().catch(() => false);

    if (!isVisible) {
      console.warn('Decrease button no longer visible. Exiting loop.');
      break;
    }

    await decreaseButton.click();
    console.log(`Clicked decrease button (attempt ${attempts + 1})`);
  
    attempts++;
  }

  if (attempts === maxAttempts) {
    console.warn('Max attempts reached. Quantity may still not be zero.');
  }

  await browser.pause(2000); // Final pause before ending test


});


it('Add SKU',async()=>{
    const tambahProdukPage = $('~Pencarian')
    await expect(tambahProdukPage).toBeDisplayed()
    const produk = await $('android=new UiSelector().description("Beli").instance(0)');
    await expect(produk).toBeDisplayed();
    await produk.click();
    const detailProduk = await $('android=new UiSelector().description("Detail Produk").instance(0)');
    await expect(detailProduk).toBeDisplayed();
  
})



it('Detail SKU, Add product qty and submit', async ()=>{
    /**
 * Utility function to parse a currency string like " Rp344.520"
 * to an actual number like 344520
 */
function parseCurrency(text) {
  return parseInt(text.replace(/[^\d]/g, ''), 10); // Remove non-digit characters
}

  const increaseButton = await $('~+');
  const qtyField = await $('android.widget.EditText');
  const hargaElement = await $('android=new UiSelector().descriptionStartsWith(" Rp").instance(0)');
  const totalHargaElement = await $('android=new UiSelector().descriptionStartsWith(" Rp").instance(2)');
  const addCartBtn = await $('~Keranjang Belanja');
  const lanjutPesanan = await $('~Lanjut Pesanan')
  // Get the initial unit price (harga)
  const hargaText = await hargaElement.getAttribute('content-desc');
  const harga = parseCurrency(hargaText);

  console.log(`💰 Unit price: ${harga}`);
  await increaseButton.click()  // to show the total harga first so appium can catch the element
  let total = 0;
  let qty = 0; // Start with 0

  while (true) {
    // Get total price from UI and parse it
    const totalText = await totalHargaElement.getAttribute('content-desc');
    total = parseCurrency(totalText);
    const qtyText = await qtyField.getText();  // or getValue(), depending on your element
      qty = parseInt(qtyText, 10);

    console.log(`🧮 Current total: ${total} for quantity: ${qty}`);

    if (total >= 350000) {
      console.log('✅ Total is sufficient. Proceed to add to cart.');
      break;
    }

    // Click the increase button and pause for the UI to update
    await increaseButton.click();
    await browser.pause(500); // Adjust as needed for animation/UI update time
    if (qty > 99) {
      throw new Error('❌ Reached max quantity attempts, but total price is still below threshold.');
    }
  }

  // Assert total again just in case
  expect(total).toBeGreaterThanOrEqual(350000);
  await browser.pause(3000)

  // Click the Add to Cart button
  await addCartBtn.click();
  await lanjutPesanan.click()
  
  
})
it('Continue on Summary and Checkout with COD', async () =>{
const pilihMetode = await $('~Pilih Metode >   ')
const COD = await $('~Bayar Tunai (COD)')
const buatPesanan = await $('~Buat pesanan')

await pilihMetode.click()
await COD.click()
await buatPesanan.click()

})

it("Transaction Created Successfully",async()=>{
  const transaksi = $('~Transaksi')
   await transaksi.click()
 
})
})

