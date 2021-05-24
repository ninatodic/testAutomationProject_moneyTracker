const axios = require('axios');

// Send request to register a user
exports.registerUser = async (testUser) => {
  try {
    const response = await axios.post(
      'https://desolate-sierra-34522.herokuapp.com/api/users',
      testUser
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
