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
beforeEach(async () => {
  const nameInput = await driver.$('~name');
  nameInput.setValue('');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('');

  const dateInput = await driver.$('~birthDate');
  await dateInput.setValue('');

  const cityInput = await driver.$('~city');
  await cityInput.setValue('');

  const sideEffectsInput = await driver.$('~sideEffects');
  await sideEffectsInput.setValue('');

  const symptomsInput = await driver.$('~symptoms');
  await symptomsInput.setValue('');
});

test('Successful inputs test', async () => {
  await driver.pause(2000);

  const nameInput = await driver.$('~name');
  await nameInput.setValue('Saul');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('Goodman');

  const dateInput = await driver.$('~birthDate');
  await dateInput.setValue('12/11/1960');

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

  await driver.pause(1000);
  const snackbar = await driver.$(
    '//android.view.ViewGroup[@content-desc="snackbar"]/android.widget.TextView',
  );
  expect(await snackbar.getText()).toEqual('Form successfully submitted.');
});

test('Unchecked Radio Button Test ', async () => {
  await driver.pause(2000);

  const nameInput = await driver.$('~name');
  await nameInput.setValue('Saul');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('Goodman');

  const dateInput = await driver.$('~birthDate');
  await dateInput.setValue('12/11/1960');

  const cityInput = await driver.$('~city');
  await cityInput.setValue('Albuquerque');

  const maleInput = await driver.$('~male');
  await maleInput.click();

  const sideEffectsInput = await driver.$('~sideEffects');
  await sideEffectsInput.setValue('No');

  const symptomsInput = await driver.$('~symptoms');
  await symptomsInput.setValue('Headache, Fatigue');

  const submitButton = await driver.$('~submitButton');
  expect(await submitButton.isExisting()).toEqual(false);
});

test('Empty fields test', async () => {
  await driver.pause(2000);

  const nameInput = await driver.$('~name');
  await nameInput.setValue('Saul');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('Goodman');

  const dateInput = await driver.$('~birthDate');
  await dateInput.setValue('12/11/1960');

  const cityInput = await driver.$('~city');
  await cityInput.setValue('Albuquerque');

  const maleInput = await driver.$('~male');
  await maleInput.click();

  const mrnaInput = await driver.$('~mrna');
  await mrnaInput.click();

  const symptomsInput = await driver.$('~symptoms');
  await symptomsInput.setValue('Headache, Fatigue');

  const submitButton = await driver.$('~submitButton');
  expect(await submitButton.isExisting()).toEqual(false);
});

test('Invalid date test', async () => {
  await driver.pause(2000);

  const nameInput = await driver.$('~name');
  await nameInput.setValue('Saul');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('Goodman');

  const dateInput = await driver.$('~birthDate');
  await dateInput.setValue('12/11/2024');

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

  await driver.pause(1000);
  const snackbar = await driver.$(
    '//android.view.ViewGroup[@content-desc="snackbar"]/android.widget.TextView',
  );
  expect(await snackbar.getText()).toEqual('Enter a valid birth date!');
});

test('Non existing city test Test ', async () => {
  await driver.pause(2000);

  const nameInput = await driver.$('~name');
  await nameInput.setValue('Saul');

  const surnameInput = await driver.$('~surname');
  await surnameInput.setValue('Goodman');

  const dateInput = await driver.$('~birthDate');
  await dateInput.setValue('12/11/1960');

  const cityInput = await driver.$('~city');
  await cityInput.setValue('Albuquerqueque');

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

  await driver.pause(1000);
  const snackbar = await driver.$(
    '//android.view.ViewGroup[@content-desc="snackbar"]/android.widget.TextView',
  );
  expect(await snackbar.getText()).toEqual('Form successfully submitted.');
});

