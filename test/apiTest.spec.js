const axios = require('axios');
const expect = require('chai').expect;
const helpers = require('./helpers');

let testUser = {};
let testAuth = {
  name: 'testAuth',
  email: 'testAuth@gmail.com',
  password: '123456',
};
let token;

// /*

// User route

// */

describe('Test user route', () => {
  describe('Test  POST request /api/users', () => {
    before('Create test user', async () => {
      // Create random user name with valid email for registration
      try {
        const response = await axios.get('https://randomuser.me/api/');
        testUser.name = `${response.data.results[0].name.first} ${response.data.results[0].name.last}`;
        testUser.email = response.data.results[0].email;
        console.log(testUser);
      } catch (error) {
        console.error(error);
      }
    });
    it('should register a user succesfully', async () => {
      const response = await axios.post(
        'https://desolate-sierra-34522.herokuapp.com/api/users',
        {
          name: testUser.name,
          email: testUser.email,
          password: '123456',
        }
      );

      //chek if status is ok and if token in response is a string
      expect(response.status).to.eql(200);
      expect(response.data.token).to.be.a('string');
    });

    it('should not register a user with existing email in db and should return correct error message', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/users',
          {
            name: testUser.name,
            email: testUser.email,
            password: '123456',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.msg).to.eql('User already exists');
      }
    });

    it('should return correct error message for invalid name (empty string)', async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        testUser.email = response.data.results[0].email;
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/users',
          {
            name: '',
            email: testUser.email,
            password: '123456',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql('Please add name');
      }
    });

    it('should return correct error message for invalid mail', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/users',
          {
            name: testUser.name,
            email: 'xxx',
            password: '123456',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql(
          'Please include valid email'
        );
      }
    });

    it('should return correct error message for invalid password (length >= 6)', async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        testUser.email = response.data.results[0].email;
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/users',
          {
            name: testUser.name,
            email: testUser.email,
            password: '12345',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql(
          'Please enter a pass with 6 or more char'
        );
      }
    });

    it('should return array with three errors when no data is sent', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/users',
          {
            name: '',
            email: '',
            password: '',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors).to.have.lengthOf(3);
      }
    });
  });
});

// /*

// Auth route

// */

describe('Test auth route', () => {
  describe('Test POST request /api/auth', () => {
    it('should log in a user succesfully', async () => {
      const response = await axios.post(
        'https://desolate-sierra-34522.herokuapp.com/api/auth',
        {
          email: testAuth.email,
          password: testAuth.password,
        }
      );

      token = response.data.token;
      //chek if status is ok and if token in response is a string
      expect(response.status).to.eql(200);
      expect(response.data.token).to.be.a('string');
    });

    it('should not login a user with nonexisting email in db and should return correct error message', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          {
            email: 'nonexistingEmail@gmail.com',
            password: testAuth.password,
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.msg).to.eql('Invalid credentials');
      }
    });

    it('should not login a user with invalid password and should return correct error message', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          {
            email: testAuth.email,
            password: '111111',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.msg).to.eql('Invalid credentials');
      }
    });

    it('should return correct error message for invalid mail', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          {
            email: '',
            password: '111111',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql(
          'Please include valid email'
        );
      }
    });

    it('should return correct error message for invalid password', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          {
            email: '',
            password: '111111',
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql(
          'Please include valid email'
        );
      }
    });
  });

  describe('Test GET request /api/auth', () => {
    before('Log in user', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          {
            email: testAuth.email,
            password: testAuth.password,
          }
        );

        token = response.data.token;
      } catch (error) {
        console.error(error);
      }
    });

    it('should get logged in user if valid token is sent', async () => {
      try {
        const response = await axios.get(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          { headers: { 'x-auth-token': token } }
        );
        const user = response.data;

        expect(response.status).to.eql(200);
        expect(user.name).to.eql(testAuth.name);
        expect(user.email).to.eql(testAuth.email);
      } catch (error) {
        console.log(error);
      }
    });

    it('should not get logged in user if invalid token is sent', async () => {
      try {
        const response = await axios.get(
          'https://desolate-sierra-34522.herokuapp.com/api/auth',
          {
            headers: {
              'x-auth-token':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
            },
          }
        );
      } catch (error) {
        expect(error.response.status).to.eql(401);
        expect(error.response.data.msg).to.eql('token not valid');
      }
    });

    it('should not get logged in user if no token is sent', async () => {
      try {
        const response = await axios.get(
          'https://desolate-sierra-34522.herokuapp.com/api/auth'
        );
      } catch (error) {
        expect(error.response.status).to.eql(401);
        expect(error.response.data.msg).to.eql(
          'No token, authorisation denied'
        );
      }
    });
  });
});

/*

Entry route

*/

describe('Test entry route', () => {
  //prepare data
  let data = {
    text: 'positive amount',
    amount: 300,
  };
  let data2 = {
    text: 'negative amount',
    amount: -100,
  };
  let entry1_id, entry2_id;

  before('Log in user', async () => {
    //log in a user and get token
    token = await helpers.loginUser(testAuth);
  });

  describe('Test GET request /api/entries', () => {
    before(' create two entries', async () => {
      //create two enteries
      entry1_id = await helpers.createEntry(token, data);
      entry2_id = await helpers.createEntry(token, data2);
    });

    after('delete two enteries created in before hook', async () => {
      helpers.deleteEntry(token, entry1_id);
      helpers.deleteEntry(token, entry2_id);
    });

    it('should get all entries for logged user', async () => {
      const response = await axios.get(
        'https://desolate-sierra-34522.herokuapp.com/api/entries',
        { headers: { 'x-auth-token': token } }
      );

      expect(response.status).to.eql(200);
      expect(response.data).to.be.a('Array');
      expect(response.data).to.have.lengthOf(2);
    });

    it('should return correct message if request is sent without token', async () => {
      try {
        const response = await axios.get(
          'https://desolate-sierra-34522.herokuapp.com/api/entries'
        );
      } catch (error) {
        expect(error.response.status).to.eql(401);
        expect(error.response.data.msg).to.eql(
          'No token, authorisation denied'
        );
      }
    });
  });

  describe('Test POST request /api/entries', () => {
    it('should succesfully add an entry', async () => {
      //add and an entry
      const response = await axios.post(
        'https://desolate-sierra-34522.herokuapp.com/api/entries',
        data,
        { headers: { 'x-auth-token': token } }
      );

      //assert response
      expect(response.status).to.eql(200);
      expect(response.data).to.be.a('Object');
      expect(response.data).to.have.property('_id');
      expect(response.data).to.have.property('user');
      expect(response.data).to.have.property('date');
      expect(response.data.text).to.eql('positive amount');
      expect(response.data.amount).to.deep.eql(300);

      //cleanup, delete entry]
      helpers.deleteEntry(token, response.data._id);
    });

    it('should return correct message if request is sent without token', async () => {
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/entries',
          data
        );
      } catch (error) {
        expect(error.response.status).to.eql(401);
        expect(error.response.data.msg).to.eql(
          'No token, authorisation denied'
        );
      }
    });

    it('should return correct message if request is sent without text', async () => {
      data = {
        text: '',
        amount: 300,
      };
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/entries',
          data,
          { headers: { 'x-auth-token': token } }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql(
          'Please add description'
        );
      }
    });

    it('should return correct message if request is sent without amount', async () => {
      data = {
        text: 'positive amount',
        amount: '',
      };
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/entries',
          data,
          { headers: { 'x-auth-token': token } }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors[0].msg).to.eql('Please add amount');
      }
    });

    it('should return array with two errors when no data is sent', async () => {
      data = {};
      try {
        const response = await axios.post(
          'https://desolate-sierra-34522.herokuapp.com/api/entries',
          data,
          { headers: { 'x-auth-token': token } }
        );
      } catch (error) {
        expect(error.response.status).to.eql(400);
        expect(error.response.data.errors).to.have.lengthOf(2);
      }
    });
  });

  describe('Test PUT request /api/entries', () => {
    before(' create  entry', async () => {
      data = {
        text: 'positive amount',
        amount: 300,
      };
      entry1_id = await helpers.createEntry(token, data);
    });

    after('delete entery created in before hook', async () => {
      helpers.deleteEntry(token, entry1_id);
    });

    it('should succesfully edit an entry', async () => {
      data = {
        text: 'changed text',
        amount: 100,
      };
      //edit and an entry
      const response = await axios.put(
        `https://desolate-sierra-34522.herokuapp.com/api/entries/${entry1_id}`,
        data,
        { headers: { 'x-auth-token': token } }
      );
    });

    it('should return correct message if no token is sent', async () => {
      data = {
        text: 'changed again text',
        amount: 200,
      };
      //edit and an entry
      try {
        const response = await axios.put(
          `https://desolate-sierra-34522.herokuapp.com/api/entries/${entry1_id}`,
          data
        );
      } catch (error) {
        expect(error.response.data.msg).to.eql(
          'No token, authorisation denied'
        );
        expect(error.response.status).to.eql(401);
      }
    });
  });

  describe('Test DELETE request /api/entries', () => {
    before(' create  entry', async () => {
      data = {
        text: 'positive amount',
        amount: 300,
      };
      entry1_id = await helpers.createEntry(token, data);
      entry2_id = await helpers.createEntry(token, data);
    });

    after('delete entery created in before hook', async () => {
      helpers.deleteEntry(token, entry2_id);
    });

    it('should succesfully delete an entry', async () => {
      const response = await axios.delete(
        `https://desolate-sierra-34522.herokuapp.com/api/entries/${entry1_id}`,
        { headers: { 'x-auth-token': token } }
      );
    });

    it('should return correct message if no token is sent', async () => {
      try {
        const response = await axios.delete(
          `https://desolate-sierra-34522.herokuapp.com/api/entries/${entry2_id}`
        );
      } catch (error) {
        expect(error.response.data.msg).to.eql(
          'No token, authorisation denied'
        );
        expect(error.response.status).to.eql(401);
      }
    });
  });
});
