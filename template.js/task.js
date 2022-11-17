let expanded = false;
let activePrio = 'medium';
let subtasks = [];
let allTasks = [];
let allContacts = [];
let arrayImage = [];
let subtasksToUse = [];
let form = document.getElementById('task-form');
let initialID = [];
let initialToUse = [];
let invited = [];
let colors = ['azure', 'red', 'lime', 'orange', 'magenta', 'blue'];


/**
 * filling the checkbox for the contacts
 */
function fillAssigns() {
  let box = document.getElementById('checkboxes');
  box.innerHTML = 
  `<div class="assign-contact" id="invite-contact" onclick="invite()">
    <span>Invite Contact</span>
    <i class="fa-solid fa-address-book"></i>
  </div>`;
  for (let i = 0; i < allContacts.length; i++)
    box.innerHTML += fillAssignsHTML(i);
}



/**
 * Opens invitation-input
 */
function invite() {
  document.querySelector('.input-contact-line').classList.remove('d-none');
}


/**
 * Closes and clears invitation-input
 */
function closeInvitation() {
  document.querySelector('.input-contact-line').classList.add('d-none');
  document.querySelector('#input-contact').value = '';
}

/**
 * "Adding" Invitation by input-readonly
 */
function confirmInvitation() {
  let input = document.querySelector('#input-contact');
  if (invited.indexOf(input.value) == -1) {
    invited.push(input.value);
  }
  input.value = '';
  addInvitations();
}


function addInvitations() {
  let contact = document.getElementById('invited-contact');
  contact.innerHTML = '';
  for (let i = 0; i < invited.length; i++) {
    contact.innerHTML += `${invited[i]} <br>`;
  }
}


/**
 * function for using a contact in tasks
 * @param {number} i 
 */
function contactToUse(i) {
  initialToUse = [];
  let contact = document.getElementById('use-contact');
  contact.innerHTML = '';
  let checkBox = document.getElementById(`contact-check-${i}`);
  if (checkBox.checked == true)
    selectAssign(i, contact);
  if (checkBox.checked == false){
    deselectAssign(i, contact);
  }
  document.getElementById("checkboxes").style.display = "block";
}


/**
* check or contact assign
*/
function selectAssign(i, contact) {
  initialID.push(i);
  for (j = 0; j < initialID.length; j++) {
    let neu = contactToUseHTML(j);
    initialToUse.push(neu);
    contact.innerHTML += `${allContacts[initialID[j]]['name']} <br>`;
  };
}


/**
  * check or contact deassign
  */
function deselectAssign(i, contact) {
  for (let k = 0; k < initialID.length; k++) {
    if (initialID[k] == i)
      initialID.splice(k, 1);
    contact.innerHTML = '';
    for (j = 0; j < initialID.length; j++) {
      let neu = contactToUseHTML(j);
      initialToUse.push(neu);
      contact.innerHTML += `${allContacts[initialID[j]]['name']} <br>`;
    };
  }
}


/**
 * check for showing the checkboxes
 */
function showCheckboxes() {
  let checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

/**
 * displays the colors of the contacts 
 * @param {number} n 
 * @param {string} color 
 */
function activate(n, color) {
  for (let i = 1; i < 4; i++) {
    transparent(i, color);
  }
  colorAktiv(n, color);
  let click = `${n}`;
  if (click == 1)
    capaRed();
  if (click == 2)
    capa()
  if (click == 3)
    capaGreen();
}


/********* New Category Functions **********/

/**
 * Let select-element dissapear and show input-element instead of
 */
function checkCategory() {
  if (checkIfNew()) {
    document.querySelector('.color-bar').classList.remove('d-none');
    document.querySelector('.input-category-line').classList.remove('d-none');
  } else {
    closeCategory();
  }
}


/**
 * Checks if "new category" is selected
 * @returns boolean
 */
function checkIfNew() {
  return document.getElementById('new-cat').selected == true;
}


/**
 * Let input-element dissapear and show select-element instead of 
 */
function closeCategory() {
  document.querySelector('.color-bar').classList.add('d-none');
  document.querySelector('.input-category-line').classList.add('d-none');
}


/**
 * Adds a new user-entry for "category" to select-options by using a selected color
 */
function confirmCategory() {
  let checked = checkBar();
  let color = colors[checked];
  let input = document.getElementById('input-category');
  document.getElementById('form-category').innerHTML += /*html*/ `
  <option class="${color}" value="${input.value}" selected>${input.value}</option>
  `
  closeCategory();
  input.value = '';
}


/**
 * Checks which color is selected
 * @returns number
 */
function checkBar() {
  let toggles = document.querySelectorAll('.toggles');
  for (let i = 0; i < colors.length; i++) {
    if (toggles[i].classList.contains('active')) {
      console.log(toggles);
      return i;
    }
  }
}


/**
 * Makes choosen color active, by adding background-colar and class
 * @param {number} n - number 0 to 5, representing 6 colors from color-array
 */
function pickColor(n) {
  let toggles = document.querySelectorAll('.toggles');
  for (let i = 0; i < toggles.length; i++) {
    toggles[i].style.backgroundColor = 'transparent'
    toggles[i].classList.remove('active');
  }
  toggles[n].style.backgroundColor = 'white'
  toggles[n].classList.add('active');
}


function transparent(i, color) {
  document.getElementById(`btn-${i}`).style.backgroundColor = 'transparent';
  document.getElementById(`btn-${i}`).style.color = '#000';
  document.querySelector(`#icon-prio-${i} i`).classList.remove('active-icon');
  activePrio = color;
}


function colorAktiv(n, color) {
  document.getElementById(`btn-${n}`).style.backgroundColor = `var(--${color})`;
  document.getElementById(`btn-${n}`).style.color = '#fff';
  document.querySelector(`#icon-prio-${n} i`).classList.add('active-icon');
}


function capaRed() {
  arrayImage = [];
  arrayImage.push(`<img class="prio" src="accessories/img/capa_red.png">`);
}


function capaGreen() {
  arrayImage = [];
  arrayImage.push(`<img class="prio" src="accessories/img/capa_green.png">`);
}


function capa() {
  arrayImage = [];
  arrayImage.push(`<img class="prio" src="accessories/img/capa.png">`);
}


/**
 * adding subtaks in task popup
 */
function addSubtask() {
  let text = document.getElementById('form-subtask');
  let list = document.getElementById('subtask-list');
  if (text.value != '') {
    subtasks.push(text.value);
  }
  text.value = '';
  list.innerHTML = '';
  for (let i = 0; i < subtasks.length; i++) {
    list.innerHTML += subtaskHTML(i);
  }
}


/**
 * html code for subtask
 * @param {number} i 
 * @returns 
 */
function subtaskHTML(i) {
  return ` <li>
           <input type="checkbox" name="check-subtask" id="form-check-subtask-${i}" onclick="subtaskToUse(${i})">
           <span id="subtask${i}">${subtasks[i]}</span>
         </li>
       `
}


/**
 * for using the subtasks
 * @param {number} i 
 */
function subtaskToUse(i) {
  let checkBox = document.getElementById(`form-check-subtask-${i}`);
  if (checkBox.checked == true) {
    let subtaskNew = document.getElementById(`subtask${i}`).innerHTML;
    subtasksToUse.push(subtaskNew);
  } else if (checkBox.checked == false) {
    for (i = 0; i < subtasksToUse.length; i++)
      subtasksToUse.splice(i, 1);
  }
}


/**
 * save notes on server
 * @returns 
 */
function createTaskonBoard() {
  taskServer();
  document.getElementById('message-box').classList.remove('d-none');
  setTimeout(() => {
    window.location.href = 'board.html';
  }, 1500);
}


/**
 * save notes on server
 */
function createTaskfinish() {
  taskServer();
  showBoard();
}


/**
 * saving the tasks in server
 */
function taskServer() {
  createTasksforServer();
  let allTasksAsString = JSON.stringify(allTasks);
  backend.setItem('allTasks', allTasksAsString);
  clearInput();
  initialID = [];
}


/**
 * main function for creating the tasks 
 */
function createTasksforServer() {
  let title = document.getElementById('form-title').value;
  let text = document.getElementById('form-descr').value;
  let collection = document.getElementById('form-category');
  let o = collection.selectedIndex;
  let category = collection.options[o].text;
  let img = checkImg();
  // let img = arrayImage[0];
  let date = checkDate(document.getElementById('input-date').value);
  // let date = document.getElementById('input-date').value;
  let newSubtask = subtasksToUse[0];
  let initial = initialToUse;
  let invite = invited;

  let task = {
    'title': title,
    'description': text,
    'category': category,
    'processing_state': 'todoTable',
    'date': date,
    'img': img,
    'newSubtask': newSubtask,
    'initial': initial,
    'invite': invite,
  }

  allTasks.push(task);
}


/**
 * reset the input
 */
function clearInput() {
  document.getElementById('task-form').reset();
  let list = document.getElementById('subtask-list');
  list.innerHTML = '';
  document.getElementById('use-contact').innerHTML = '';
  initialToUse = [];
  document.getElementById('invited-contact').innerHTML = '';
  invited = [];
}


/**
 * Checks if date is entered - if not, using todays date
 */
function checkDate(val) {
  return val == "" ? today() : val;
}


/**
 * Put todays date in correct format
 */
function today() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;
  return `${year}-${month}-${day}`
}


/**
 * Check if prio was set - if not, set default value
 * @returns string
 */
function checkImg() {
  if (arrayImage != '') {
    return arrayImage[0];
  }
  return `<img class="prio" src="accessories/img/capa.png">`;
}