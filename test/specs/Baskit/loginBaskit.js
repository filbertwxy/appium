import { hideKeyboardIfVisible } from '../../utils/keyboard.js';
// ✅ If using @wdio/globals:
import { expect } from '@wdio/globals';
// OR just remove any `expect` import if using WebdriverIO without globals config


describe("Login Baskit Partner",()=>{
    before(async()=>{
        await driver.pressKeyCode(3)
        await driver.pause(3000)
 const { width, height } = await driver.getWindowSize();

await driver.performActions([{
  type: 'pointer',  //specify pointer input
  id: 'finger1',    //indentifier for this input pointer
  parameters: { pointerType: 'touch' }, //define pointer as touch input
  actions: [
    //move finger to starting point bottom of screen
    { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.9 },
    //simulate pressing down using finger
    { type: 'pointerDown', button: 0 },
    // pause to check the process
    { type: 'pause', duration: 300 },
    // move finger up slowly
    { type: 'pointerMove', duration: 200, x: width / 2, y: height * 0.3 },
    // relase finger
    { type: 'pointerUp', button: 0 },
  ]
}]);

await driver.releaseActions();
    })
    
    it('Open Baskit Partner',async ()=>{
        
        const BaskitPartner = $('~[DEV]Baskit Partner')
        await driver.pause(3000)
        await BaskitPartner.click()
        await driver.pause(2000)
        const Landing = await $('~Selamat datang kembali di Baskit!')
        // const text = Landing.getText()
        // console.log(text)
        // await expect(Landing).toHaveText("Selamat datang kembali di Baskit!")
        await expect(Landing).toBeExisting()
        // await expect(options.toHaveValue(options))
       
    })
    it('Login to Baskit Partner', async ()=>{
    const email = "oliver@gmail.com";
    const pass = "12345678";

    const username = await $('android=new UiSelector().className("android.widget.EditText").instance(0)');
    const password = await $('//android.view.View[@content-desc="password"]/android.widget.EditText');
    const submitBtn = await $('~Masuk');
    const homepage =  await $(`android=new UiSelector().descriptionContains("Selamat Datang Sales")`);
    await username.click()
    await username.clearValue()
    await username.addValue(email);
    await hideKeyboardIfVisible()
    await password.click()
    await password.addValue(pass);
    await hideKeyboardIfVisible()
    await driver.pause(3000);

    // Get actual text from input fields
    const usernameText = await username.getAttribute('text');
    const passwordText = await password.getAttribute('text');

    // Assert values match what was entered
    expect(usernameText).toBe(email);
    expect(passwordText).not.toBe('')
    await submitBtn.click();

    // expect(homepage).toHaveTextContaining('Selamat Datang Sales')

    })
    
})
