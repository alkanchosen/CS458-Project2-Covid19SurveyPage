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
  const clearButton = await driver.$('~clearButton');
  await clearButton.click();
});

test('A success message should be shown after correct inputs', async () => {
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
  await submitButton.click();

  await driver.pause(1000);
  const snackbar = await driver.$(
    '//android.view.ViewGroup[@content-desc="snackbar"]/android.widget.TextView',
  );
  expect(await snackbar.getText()).toEqual('Form successfully submitted.');
});

test('Submit button should not appear if one of the radio buttons is not selected', async () => {
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

test('Fields should be empty after successful submission', async () => {
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
  await submitButton.click();

  await driver.pause(1000);
  expect(await nameInput.getText()).toEqual('');
  expect(await surnameInput.getText()).toEqual('');
  expect(await dateInput.getText()).toEqual('');
  expect(await cityInput.getText()).toEqual('');
  expect(await mrnaInput.getText()).toEqual('');
  expect(await maleInput.getText()).toEqual('');
  expect(await sideEffectsInput.getText()).toEqual('');
  expect(await symptomsInput.getText()).toEqual('');
});

test('An error message should be shown after invalid date input', async () => {
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
  await submitButton.click();

  await driver.pause(1000);
  const snackbar = await driver.$(
    '//android.view.ViewGroup[@content-desc="snackbar"]/android.widget.TextView',
  );
  expect(await snackbar.getText()).toEqual('Enter a valid birth date!');
});

test('Submit button should not appear when the user fills all the fields and clears one of them', async () => {
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
  await symptomsInput.setValue('');

  expect(await submitButton.isExisting()).toEqual(false);
});
