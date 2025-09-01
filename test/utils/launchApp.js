// test/utils/launchApp.ts

export const launchAppFromHome = async () => {
  await driver.pressKeyCode(3);
  await driver.pause(3000);

  const { width, height } = await driver.getWindowSize();

  await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.9 },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration: 300 },
      { type: 'pointerMove', duration: 200, x: width / 2, y: height * 0.3 },
      { type: 'pointerUp', button: 0 },
    ]
  }]);

  await driver.releaseActions();

  const app = await $('~[DEV]Baskit Partner');
  await app.click();
  await driver.pause(2000);
};
