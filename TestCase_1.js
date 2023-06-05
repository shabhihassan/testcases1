const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Login', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost/login'); 
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should display login page', async () => {
    const title = await driver.getTitle();
    expect(title).toBe('Login');
  });

  it('should login successfully with valid credentials', async () => {
    await driver.findElement(By.name('email')).sendKeys('testuser');
    await driver.findElement(By.name('password')).sendKeys('password', Key.RETURN);

    await driver.wait(until.urlContains('/home'));
    const welcomeMessage = await driver.findElement(By.xpath('//h1[contains(text(), "Welcome, testuser!")]'));
    expect(welcomeMessage).toBeTruthy();
  });

  it('should display error message with invalid credentials', async () => {
    await driver.findElement(By.name('email')).sendKeys('invaliduser');
    await driver.findElement(By.name('password')).sendKeys('invalidpassword', Key.RETURN);

    await driver.wait(until.urlContains('/login'));
    const errorMessage = await driver.findElement(By.className('alert-danger'));
    expect(errorMessage).toBeTruthy();
  });
});
