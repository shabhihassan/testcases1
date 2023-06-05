const Jasmine = require('jasmine');
const jasmine = new Jasmine();

// Add the test files to the Jasmine configuration
jasmine.loadConfig({
  spec_files: ['login.test.js', 'signup.test.js', 'addRestaurant.test.js', 'addDish.test.js', 'orderManagement.test.js'],
  random: false,
});

// Run the Jasmine tests
jasmine.execute();

