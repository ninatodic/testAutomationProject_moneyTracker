const axios = require('axios');

async function loginUser(testAuth) {
  try {
    const response = await axios.post(
      'https://desolate-sierra-34522.herokuapp.com/api/auth',
      {
        email: testAuth.email,
        password: testAuth.password,
      }
    );
    return response.data.token;
  } catch (error) {
    console.error(error);
  }
}

async function createEntry(token, data) {
  try {
    const response = await axios.post(
      'https://desolate-sierra-34522.herokuapp.com/api/entries',
      data,
      { headers: { 'x-auth-token': token } }
    );
    return response.data._id;
  } catch (error) {
    console.error(error);
  }
}

async function deleteEntry(token, entry_id) {
  try {
    const response = await axios.delete(
      `https://desolate-sierra-34522.herokuapp.com/api/entries/${entry_id}`,
      { headers: { 'x-auth-token': token } }
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = { loginUser, createEntry, deleteEntry };
