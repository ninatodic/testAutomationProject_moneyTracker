const axios = require('axios');
const expect = require('chai').expect;

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

// describe('Test user route', () => {
//   describe('Test  POST request /api/users', () => {
//     before('Create test user', async () => {
//       // Create random user name with valid email for registration
//       try {
//         const response = await axios.get('https://randomuser.me/api/');
//         testUser.name = `${response.data.results[0].name.first} ${response.data.results[0].name.last}`;
//         testUser.email = response.data.results[0].email;
//         console.log(testUser);
//       } catch (error) {
//         console.error(error);
//       }
//     });
//     it('should register a user succesfully', async () => {
//       const response = await axios.post(
//         'https://desolate-sierra-34522.herokuapp.com/api/users',
//         {
//           name: testUser.name,
//           email: testUser.email,
//           password: '123456',
//         }
//       );

//       //chek if status is ok and if token in response is a string
//       expect(response.status).to.eql(200);
//       expect(response.data.token).to.be.a('string');
//     });

//     it('should not register a user with existing email in db and should return correct error message', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/users',
//           {
//             name: testUser.name,
//             email: testUser.email,
//             password: '123456',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.msg).to.eql('User already exists');
//       }
//     });

//     it('should return correct error message for invalid name (empty string)', async () => {
//       try {
//         const response = await axios.get('https://randomuser.me/api/');
//         testUser.email = response.data.results[0].email;
//       } catch (error) {
//         console.log(error);
//       }

//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/users',
//           {
//             name: '',
//             email: testUser.email,
//             password: '123456',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.errors[0].msg).to.eql('Please add name');
//       }
//     });

//     it('should return correct error message for invalid mail', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/users',
//           {
//             name: testUser.name,
//             email: 'xxx',
//             password: '123456',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.errors[0].msg).to.eql(
//           'Please include valid email'
//         );
//       }
//     });

//     it('should return correct error message for invalid password (length >= 6)', async () => {
//       try {
//         const response = await axios.get('https://randomuser.me/api/');
//         testUser.email = response.data.results[0].email;
//       } catch (error) {
//         console.log(error);
//       }

//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/users',
//           {
//             name: testUser.name,
//             email: testUser.email,
//             password: '12345',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.errors[0].msg).to.eql(
//           'Please enter a pass with 6 or more char'
//         );
//       }
//     });

//     it('should return array with three errors when no data is sent', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/users',
//           {
//             name: '',
//             email: '',
//             password: '',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.errors).to.have.lengthOf(3);
//       }
//     });
//   });
// });

// /*

// Auth route

// */

// describe('Test auth route', () => {
//   describe('Test POST request /api/auth', () => {
//     it('should log in a user succesfully', async () => {
//       const response = await axios.post(
//         'https://desolate-sierra-34522.herokuapp.com/api/auth',
//         {
//           email: testAuth.email,
//           password: testAuth.password,
//         }
//       );

//       token = response.data.token;
//       //chek if status is ok and if token in response is a string
//       expect(response.status).to.eql(200);
//       expect(response.data.token).to.be.a('string');
//     });

//     it('should not login a user with nonexisting email in db and should return correct error message', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           {
//             email: 'nonexistingEmail@gmail.com',
//             password: testAuth.password,
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.msg).to.eql('Invalid credentials');
//       }
//     });

//     it('should not login a user with invalid password and should return correct error message', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           {
//             email: testAuth.email,
//             password: '111111',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.msg).to.eql('Invalid credentials');
//       }
//     });

//     it('should return correct error message for invalid mail', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           {
//             email: '',
//             password: '111111',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.errors[0].msg).to.eql(
//           'Please include valid email'
//         );
//       }
//     });

//     it('should return correct error message for invalid password', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           {
//             email: '',
//             password: '111111',
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(400);
//         expect(error.response.data.errors[0].msg).to.eql(
//           'Please include valid email'
//         );
//       }
//     });
//   });

//   describe('Test GET request /api/auth', () => {
//     before('Log in user', async () => {
//       try {
//         const response = await axios.post(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           {
//             email: testAuth.email,
//             password: testAuth.password,
//           }
//         );

//         token = response.data.token;
//       } catch (error) {
//         console.error(error);
//       }
//     });

//     it('should get logged in user if valid token is sent', async () => {
//       try {
//         const response = await axios.get(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           { headers: { 'x-auth-token': token } }
//         );
//         const user = response.data;

//         expect(response.status).to.eql(200);
//         expect(user.name).to.eql(testAuth.name);
//         expect(user.email).to.eql(testAuth.email);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     it('should not get logged in user if invalid token is sent', async () => {
//       try {
//         const response = await axios.get(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth',
//           {
//             headers: {
//               'x-auth-token':
//                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
//             },
//           }
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(401);
//         expect(error.response.data.msg).to.eql('token not valid');
//       }
//     });

//     it('should not get logged in user if no token is sent', async () => {
//       try {
//         const response = await axios.get(
//           'https://desolate-sierra-34522.herokuapp.com/api/auth'
//         );
//       } catch (error) {
//         expect(error.response.status).to.eql(401);
//         expect(error.response.data.msg).to.eql(
//           'No token, authorisation denied'
//         );
//       }
//     });
//   });
// });

/*

Enty route

*/

describe('Test entery route', () => {
  before('Log in user and create two entries', async () => {
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

    try {
      const response = await axios.post(
        'https://desolate-sierra-34522.herokuapp.com/api/entries',
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

  describe('Test GET request/api/entries', () => {
    it('should get all entries for logged user', async () => {
      try {
        const response = await axios.get(
          'https://desolate-sierra-34522.herokuapp.com/api/entries',
          { headers: { 'x-auth-token': token } }
        );
        console.log(response.data);

        // expect(response.status).to.eql(200);
        // expect(user.name).to.eql(testAuth.name);
        // expect(user.email).to.eql(testAuth.email);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
