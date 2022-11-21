let rememberMe = false;
let userId;


async function init() {
  await downloadFromServer();
  allUser = JSON.parse(backend.getItem('allUsers')) || [];
}


/**
 * changing the color of the password eye icon if it is a type text or password
 */
function togglePassword() {
  let input = document.getElementById('input-password');
  let eye = document.getElementById('pass-eye');
  if (input.type == 'password') {
    input.type = 'text';
    eye.style.color = '#29ABE2';
  } else {
    input.type = 'password';
    eye.style.color = '#A8A8A8';
  }
}


/**
 * main function for login
 * @returns boolean
 */
function checkLogin() {
  let validEmail = false;
  let validPassword = false;
  let email = document.getElementById('input-email');
  let password = document.getElementById('input-password');
  document.getElementById('message-box').innerHTML = '';
  rememberMe = checkRemember();

  if (isFilled(email.value, password.value)) {
    findUser(email.value, password.value);
  }
  return (validEmail && validPassword);
}


/**
 * Check if any field is empty. If yes, execute errorMessage.
 * @param {string} email - email-value from user-input
 * @param {string} password - password-value from user-input
 * @returns boolean
 */
function isFilled(email, password) {
  let filled = true;
  if (email == '') {
    errorMessage('email');
    filled = false;
  }
  if (password == '') {
    errorMessage('password');
    filled = false;
  }
  return filled;
}


/**
 * Print error that field is empty
 * @param {string} input - input-name that is missing
 */
function errorMessage(input) {
  let output = document.getElementById('message-box');
  output.classList.remove('dis-none');

  if (input == 'email' || input == 'password') {
    output.innerHTML += `<p>Please enter valid ${input}.</p>`
  } else if (input == 'noUser') {
    output.innerHTML += `<p>User doesn't exist.</p>`
  } else if (input == 'wrongPassword') {
    output.innerHTML += `<p>Wrong password.</p>`
  }
}


/**
 * Check if existing user. If no, execute errorMessage. If yes, check password.
 * @param {string} email 
 * @param {string} password 
 * @returns 
 */
function findUser(email, password) {
  for (let i = 0; i < allUser.length; i++) {
    if (allUser[i]['email'].toLowerCase() == email.toLowerCase()) {
      validEmail = true;
      checkPassword(i, password);
      return;
    }
  }
  errorMessage('noUser');
  validEmail = false;
}


/**
 * Check if user want to remember login-data
 * @returns 
 */
function checkRemember() {
  return document.getElementById('form-check-remember').checked;
}


/**
 * Hides and clears the error-box by focusing input
 */
function hideOnFocus() {
  let output = document.getElementById('message-box');
  output.classList.add('dis-none');
}

