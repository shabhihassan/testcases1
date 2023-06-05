const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Add Dish to Restaurant', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost/admin/restaurants/1/dishes/add');  
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should display add dish page', async () => {
    const title = await driver.getTitle();
    expect(title).toBe('Add Dish');
  });

  it('should add a dish successfully with valid details', async () => {
    const name = 'Pizza';
    const description = 'Delicious pizza with various toppings';
    const price = 10.99;

    await driver.findElement(By.name('name')).sendKeys(name);
    await driver.findElement(By.name('description')).sendKeys(description);
    await driver.findElement(By.name('price')).sendKeys(price, Key.RETURN);

    
    await driver.wait(until.urlContains('/admin/restaurants/1/dishes'));
    const dishList = await driver.findElements(By.xpath(`//td[contains(text(), "${name}")]`));
    expect(dishList.length).toBeGreaterThan(0);
  });

  it('should display an error message with missing details', async () => {
    await driver.findElement(By.name('name')).sendKeys('Pizza');
    await driver.findElement(By.name('description')).sendKeys('Delicious pizza', Key.RETURN);

    await driver.wait(until.urlContains('/admin/restaurants/1/dishes/add'));
    const errorMessage = await driver.findElement(By.className('alert-danger'));
    expect(errorMessage).toBeTruthy();
  });
});
