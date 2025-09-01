import { launchAppFromHome } from '../../utils/launchApp.js';
import { loginToBaskit } from '../../utils/login.js';
import { handleMulaiBekerja } from '../../utils/checkIn.js';

describe('Create Transaction',()=>{
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

it('Add SKU',async()=>{
    const tambahProduk  = $('~Tambah Produk')
    const tambahProdukPage = $('~Pencarian')
    await tambahProduk.click()
    await expect(tambahProdukPage).toBeDisplayed()
    const beliButton = await $('android=new UiSelector().description("Beli").instance(0)');
    await expect(beliButton).toBeDisplayed();
    await beliButton.click();
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
  
  
})
})

