const axios = require('axios');
let testUser = {};

// Create random user name with valid email for registration
exports.createRandomUser = async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/');
    testUser.name = `${response.data.results[0].name.first} ${response.data.results[0].name.last}`;
    testUser.email = response.data.results[0].email;
    testUser.password = '123456';
    return testUser;
  } catch (error) {
    console.error(error);
  }
};
