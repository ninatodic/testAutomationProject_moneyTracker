const expect = require('chai').expect;

exports.userRegistrationSuccess = (response) => {
  //chek if status is ok and if token in response is a string
  expect(response.status).to.eql(200);
  expect(response.data.token).to.be.a('string');
};

exports.userRegistrationFail_existingEmail = (response) => {
  expect(response.status).to.eql(400);
  expect(response.data.msg).to.eql('User already exists');
};

exports.userRegistrationFail_noName = (response) => {
  expect(response.status).to.eql(400);
  expect(response.data.errors[0].msg).to.eql('Please add name');
};

exports.userRegistrationFail_invalidEmail = (response) => {
  expect(response.status).to.eql(400);
  expect(response.data.errors[0].msg).to.eql('Please include valid email');
};

exports.userRegistrationFail_invalidPass = (response) => {
  expect(response.status).to.eql(400);
  expect(response.data.errors[0].msg).to.eql(
    'Please enter a pass with 6 or more char'
  );

  exports.userRegistrationFail_emptyFields = (response) => {
    expect(response.status).to.eql(400);
    expect(response.data.errors).to.have.lengthOf(3);
  };
};
