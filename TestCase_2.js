const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Signup', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost/signup');  
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should display signup page', async () => {
    const title = await driver.getTitle();
    expect(title).toBe('Signup');
  });

  it('should signup successfully with valid credentials', async () => {
    // Generate random email and password for each test run
    const email = `testuser${Math.random().toString(36).substring(7)}@example.com`;
    const password = 'password';

    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);

    await driver.wait(until.urlContains('/home'));
    const welcomeMessage = await driver.findElement(By.xpath('//h1[contains(text(), "Welcome, testuser!")]'));
    expect(welcomeMessage).toBeTruthy();
  });

  it('should display error message with invalid credentials', async () => {
    await driver.findElement(By.name('email')).sendKeys('invalidemail');
    await driver.findElement(By.name('password')).sendKeys('short', Key.RETURN);

    await driver.wait(until.urlContains('/signup'));
    const errorMessages = await driver.findElements(By.className('alert-danger'));
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
