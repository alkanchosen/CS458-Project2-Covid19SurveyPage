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
      automationName: 'appium',
      appium: {connectHardwareKeyboard: true},
    },
  });
});

afterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});
test('Successful inputs test', async () => {
  await driver.pause(2000);

  const nameInput = await driver.$('~name');
  await nameInput.setValue('Saul');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('Goodman');

  const datepickerButton = await driver.$('~birthDateButton');
  await datepickerButton.click();
  await driver.pause(1000);

  const windowSize = await driver.getWindowSize();

  const right2leftSwipeOptions = {
    startX: windowSize.width * 0.8,
    startY: windowSize.height / 1.7,
    endX: windowSize.width * 0.1,
    endY: windowSize.height / 1.7,
    okX: windowSize.width / 1.3,
    okY: windowSize.height / 1.1,
  };

  await driver.touchPerform([
    {
      action: 'press',
      options: {
        x: right2leftSwipeOptions.startX,
        y: right2leftSwipeOptions.startY,
      },
    },
    {action: 'wait', options: {mseconds: 0}},
    {
      action: 'moveTo',
      options: {
        x: right2leftSwipeOptions.endX,
        y: right2leftSwipeOptions.endY,
      },
    },
    {
      action: 'release',
    },
    {action: 'wait', options: {mseconds: 0}},
    {
      action: 'press',
      options: {
        x: right2leftSwipeOptions.startX,
        y: right2leftSwipeOptions.startY,
      },
    },
    {
      action: 'release',
    },
    {
      action: 'press',
      options: {
        x: right2leftSwipeOptions.okX,
        y: right2leftSwipeOptions.okY,
      },
    },
    {
      action: 'release',
    },
  ]);

  const cityInput = await driver.$('~city');
  await cityInput.setValue('Albuquerque');

  const maleInput = await driver.$('~male');
  await maleInput.click();

  const mrnaInput = await driver.$('~mrna');
  await mrnaInput.click();

  const sideEffectsInput = await driver.$('~sideEffects');
  await sideEffectsInput.setValue('No');

  const symptomsInput = await driver.$('~symptoms');
  await symptomsInput.setValue('Headache, Fatigue');

  const submitButton = await driver.$('~submitButton');
  expect(await submitButton.isExisting()).toEqual(true);
  await submitButton.click();
});
