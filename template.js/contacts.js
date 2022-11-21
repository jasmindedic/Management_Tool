let letters = [];
let randomColor = [];


async function init() {
  await downloadFromServer();
  jsonParse();
  render();
}


/**
 * Loading backend datas
 */
function jsonParse() {
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  allContacts = JSON.parse(backend.getItem('allContacts')) || [];
}


/**
 * Checking Viewport by openAddTask
 */
function openAddTask() {
  document.getElementById('board-popup').classList.remove('d-none');
  document.getElementById('contact-container').scroll({ top: 0 });
  document.getElementById('contact-container').classList.add('overflow');
  document.getElementById('board-popup').classList.add('open-popup');
  document.getElementById('contacts-List').classList.add('second-plan');
  document.getElementById('main-content').classList.add('second-plan');
  document.getElementById('contacts-popup').classList.add('second-plan');
  fillAssigns();
}


/**
 * Close add-task-popup
 */
function closeAddTaskPopup() {
  document.getElementById('board-popup').classList.add('d-none');
  document.getElementById('board-popup').classList.remove('open-popup');
  document.getElementById('contacts-List').classList.remove('second-plan');
  document.getElementById('main-content').classList.remove('second-plan');
  document.getElementById('contacts-popup').classList.remove('second-plan');
  document.getElementById('contact-container').scroll({ top: 0 })
  document.getElementById('contact-container').classList.remove('overflow');
  closeContactData();
}


/**
 * Loading contacts from backend
 */
function loadAllContacts() {
  let allContactsAsStrings = backend.getItem('allContacts');
  allContacts = JSON.parse(allContactsAsStrings);
}


function editPopUp(i) {
  document.getElementById('contact-container').scroll({ top: 0 });
  let contact = allContacts[i];
  let edit = document.getElementById('edit-contact-popup');
  edit.classList.remove('d-none');
  edit.innerHTML = editPopUpHTML(contact, i);

}


/**
 * Open contact-popup
 */
function openPopup() {
  document.getElementById('contact-container').scroll({ top: 0 });
  document.getElementById('contact-popup').style.display = 'flex';
  document.getElementById('contact-popup').classList.remove('d-none');
  document.getElementById('contacts-List').classList.add('noScroll');
}


/**
 * Close contact-popup
 */
function closePopup() {
  clearEntries();
  document.getElementById('contact-popup').style.display = 'none';
  document.getElementById('contact-popup').classList.add('d-none');
  document.getElementById('contacts-List').classList.remove('noScroll');

}


function showContact() {
  let contactList = document.getElementById('contacts-List');
  let id = allContacts.length - 1;
  let contact = allContacts[id];
  if (allContacts == []) {
    contactList.innerHTML += `
    <div class= "empty-contacts">
    <p> No Contacts here.</p>
    </div>`
  } else {
    for (i = 0; i < allContacts.length; i++)
      contactList.innerHTML += createContactInfo(contact, i);
  }
}


function openContactData(i) {
  document.getElementById('board-popup').classList.add('d-none');
  if (window.innerHeight < 776) {
    document.getElementById('contact-container').classList.add('overflow');
  }
  document.getElementById('contacts-popup').classList.add('d-none');
  document.getElementById('contacts-List').classList.add('second-plan');
  let rightInfoPopup = document.getElementById('main-contact-content');
  rightInfoPopup.innerHTML = '';
  let contact = allContacts[i];
  rightInfoPopup.innerHTML += openContactDataHTML(i, contact);
}


function closeContactData() {
  document.getElementById('main-contact-content').innerHTML = ``;
  document.getElementById('contacts-popup').classList.remove('d-none');
  document.getElementById('contacts-List').classList.remove('second-plan');
  document.getElementById('contact-container').scroll({ top: 0 });
  document.getElementById('contact-container').classList.remove('overflow');
  document.getElementById('board-popup').classList.remove('d-none');
}


function createContact() {
  createContactforServer();
  showContact();
  let allContactsAsStrings = JSON.stringify(allContacts);
  backend.setItem('allContacts', allContactsAsStrings);
  closePopup();
  render();
}


function createContactforServer() {
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  randomInitials(name.value);
  let initials = letters[0];
  makeRandomColor();
  let color = randomColor[0];

  let contact = {
    'name': name.value,
    'email': email.value,
    'phone': phone.value,
    'initials': initials,
    'color': color,
  }
  allContacts.push(contact);
}


function clearEntries() {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}


function makeRandomColor() {
  randomColor = [];
  let color = Math.floor(Math.random() * 16777215).toString(16);
  randomColor.push(color);
}


function randomInitials(name) {
  letters = [];
  const fullName = name.split('name');
  const initials = fullName.shift().charAt(0);
  letters.push(initials);
  return initials.toUpperCase();
}


function render() {
  renderName();
  for (let i = 0; i < allContacts.length; i++) {
    renderLetters(i);
    let contact = allContacts[i];
    document.getElementById('contacts-List').innerHTML += createContactInfo(contact, i);
  }
}


function renderName() {
  let contactList = document.getElementById('contacts-List');
  contactList.innerHTML = '';
  allContacts.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}


function renderLetters(i) {
  let contactList = document.getElementById('contacts-List');
  if (!document.getElementById(`${allContacts[i]['initials']}`)) {
    contactList.innerHTML += `
        <div class="letters" id="${allContacts[i]['initials']}">
        <span class="headletter">${allContacts[i]['initials']}</span>
        </div>`
  }
}


function saveContact(i) {
  createContactforServer();
  allContacts.splice(i, 1);
  let allContactsAsStrings = JSON.stringify(allContacts);
  backend.setItem('allContacts', allContactsAsStrings);
  document.getElementById('edit-contact-popup').classList.add('d-none');
  closeContactData();
  render();
}


function closeEditPopup() {
  document.getElementById('edit-contact-popup').classList.add('d-none');
}


function deleteContact(i) {
  let currentContact = document.getElementById(i);
  currentContact.remove();
  allContacts.splice(i, 1);
  let allContactsAsStrings = JSON.stringify(allContacts);
  backend.setItem('allContacts', allContactsAsStrings);
  document.getElementById('contacts-List').classList.remove('second-plan');
  render();
}

function closeMessage() {
  document.getElementById('message-box').classList.add('d-none');
}


