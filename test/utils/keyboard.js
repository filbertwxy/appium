// test/utils/keyboard.js

export const hideKeyboardIfVisible = async () => {
  try {
    const isKeyboardVisible = await driver.isKeyboardShown();
    if (isKeyboardVisible) {
      await driver.hideKeyboard();
    }
  } catch (error) {
    console.warn('Could not check or hide keyboard:', error);
  }
};
