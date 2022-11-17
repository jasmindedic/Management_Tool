let targetEmail = '';

/**
 * Check input entries
 * @returns boolean - valid Entry
 */
function check() {
  let send = false;
  let email = document.getElementById('input-email');
  document.getElementById('message-box').innerHTML = '';
  let notEmpty = checkIfEmpty(email.value);
  if (notEmpty) {
    checkIfKnown(email.value);
  }
  if (targetEmail) {
    send = true;
  }
  return send;
}


/**
 * Check if input-fields are filled
 * @param {string} email 
 * @returns boolean
 */
function checkIfEmpty(email) {
  if (email == '') {
    errorMessage('empty');
    return false;
  }
  return true;
}


/**
 * Prints different errormessages by getting a subject
 * @param {string} input 
 */
function errorMessage(input) {
  let output = document.getElementById('message-box');
  output.classList.remove('dis-none');
  if (input == 'empty') {
    output.innerHTML += `<p>Please enter a valid email-adress.</p>`
  }
  if (input == 'unknown') {
    output.innerHTML += `<p>User doesn't exist. Please check again.</p>`
  }
}


/**
 * Reset error message
 */
function hideOnFocus() {
  let output = document.getElementById('message-box');
  output.classList.add('dis-none');
}