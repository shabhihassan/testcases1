const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Order Management', () => {
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost/admin/orders'); 
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should display order management page', async () => {
    const title = await driver.getTitle();
    expect(title).toBe('Order Management');
  });

  it('should mark an order as completed', async () => {
    
    const orderId = '12345';

    await driver.findElement(By.id(`order-${orderId}`)).click();

    await driver.wait(until.urlContains(`/admin/orders/${orderId}`));
    const orderStatus = await driver.findElement(By.className('order-status')).getText();
    expect(orderStatus).toBe('Completed');
  });

  it('should delete an order', async () => {
    // Assuming there is an order with the given order ID in the order management page
    const orderId = '12345';

    await driver.findElement(By.id(`order-${orderId}`)).click();

    await driver.wait(until.urlContains(`/admin/orders/${orderId}`));
    await driver.findElement(By.id('delete-order-btn')).click();

    await driver.wait(until.urlContains('/admin/orders'));
    const deletedOrder = await driver.findElements(By.id(`order-${orderId}`));
    expect(deletedOrder.length).toBe(0);
  });
});

