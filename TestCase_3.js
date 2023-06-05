const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Add Restaurant', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost/admin/restaurants/add'); 
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should display add restaurant page', async () => {
    const title = await driver.getTitle();
    expect(title).toBe('Add Restaurant');
  });

  it('should add a restaurant successfully with valid details', async () => {
    const name = 'Test Restaurant';
    const address = '123 Main St';
    const cuisine = 'Italian';

    await driver.findElement(By.name('name')).sendKeys(name);
    await driver.findElement(By.name('address')).sendKeys(address);
    await driver.findElement(By.name('cuisine')).sendKeys(cuisine, Key.RETURN);

    
    await driver.wait(until.urlContains('/admin/restaurants'));
    const restaurantList = await driver.findElements(By.xpath(`//td[contains(text(), "${name}")]`));
    expect(restaurantList.length).toBeGreaterThan(0);
  });

  it('should display an error message with missing details', async () => {
    await driver.findElement(By.name('name')).sendKeys('Test Restaurant');
    await driver.findElement(By.name('address')).sendKeys('', Key.RETURN);

    await driver.wait(until.urlContains('/admin/restaurants/add'));
    const errorMessage = await driver.findElement(By.className('alert-danger'));
    expect(errorMessage).toBeTruthy();
  });
});
