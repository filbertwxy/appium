import { hideKeyboardIfVisible } from '../utils/keyboard.js'

export const loginToBaskit = async (email ,password) => {
  const usernameField = await $('android=new UiSelector().className("android.widget.EditText").instance(0)');
  const passwordField = await $('//android.view.View[@content-desc="password"]/android.widget.EditText');
  const submitBtn = await $('~Masuk');
  const homepage = await $(`android=new UiSelector().descriptionContains("Selamat Datang Sales")`);

  await usernameField.click();
  await usernameField.clearValue();
  await usernameField.addValue(email);
  await hideKeyboardIfVisible();

  await passwordField.click();
  await passwordField.addValue(password);
  await hideKeyboardIfVisible();

  await driver.pause(1000);

  const usernameText = await usernameField.getAttribute('text');
  const passwordText = await passwordField.getAttribute('text');

  expect(usernameText).toBe(email);
  expect(passwordText).not.toBe('');

  await submitBtn.click();

 
    // await expect(homepage).toHaveTextContaining('Selamat Datang Sales')
};
