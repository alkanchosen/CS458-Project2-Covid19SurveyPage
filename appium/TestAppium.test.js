import {remote} from 'webdriverio';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;

let driver;

beforeAll(async () => {
  driver = await remote({
    path: '/wd/hub',
    host: 'localhost',
    port: PORT,
    capabilities: {
      platformName: 'Android',
      platformVersion: '11.0', // must correct the simulator
      deviceName: 'Pixel 4', // must correct the simulator
      appium: {connectHardwareKeyboard: true},
    },
  });
});

afterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});
test('Login test', async () => {
  await driver.pause(2000);

  const loginUsernameInput = await driver.$('~name');
  await loginUsernameInput.clearValue();
  await loginUsernameInput.setValue('TestAccount@test.com');
  await driver.hideKeyboard('pressKey', 'next');
});
