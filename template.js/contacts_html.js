/**
 * content of a contact by creating
 * @param {string} contact 
 * @param {number} i 
 * @returns 
 */
function createContactInfo(contact, i) {
  return `<div onclick="openContactData(${i})" class="contact">
            <div class="profile-img" style="background:#${contact['color']}">
                <span id="initials">${contact['initials']}</span> 
            </div>
            <div class="contact-info">
                <span class="contact-name">${contact['name']}</span>
                <span class="contact-email">${contact['email']}</span>
            </div>
            </div>`;
}


/**
 * content of the popup with contact-infos
 * @param {number} i 
 * @param {string} contact 
 * @returns 
 */
function openContactDataHTML(i, contact) {
  return `<div class="Info-Container-PopUp" id="${i}">
    <div class="arrow-back" id="arrow-back" onclick="closeContactData()"><i class="fa-solid fa-arrow-left"></i></div>
    <div class="first-container">
    <div class="contact-info-image" style="background:#${contact['color']}">
    <span class="profile-letter-random">${contact['initials']}</span> 
    </div>
      <div class="info-add-task">
        <span class="contact-info-name">${contact['name']}</span>
        <div class="add-task-container" onclick="openAddTask()">
          <img src="accessories/img/add-task-plus-by-contact.svg" />
          <span class="add-task-button">Add Task</span>
        </a>
        </div>
      </div>
    </div>
    <div class="second-container">
      <span class="info-heading">Contact Information</span>
      <div class="flex-edit-delete" id="flex-edit-delete">
      <div class="edit-info-container" onclick="editPopUp(${i})">
        <i class="fa-solid fa-pencil"></i>
        <span class="edit-info-button">Edit Contact</span>
      </div>
      <div class="delete-info-container" onclick="deleteContact(${i})">
        <i class="fa-solid fa-trash-can"></i>
      <span class="delete-info-button">Delete Contact</span>
    </div>
    </div>
    </div>
    <div class="third-container">
      <div class="email-info">
        <span class="email-info1">Email</span>
        <span class="email-info2"><a href="mailto:${contact['email']}">${contact['email']}</a></span>
      </div>
      <div class="phone-info">
        <span class="phone-info1">Phone</span>
        <span class="phone-info2">${contact['phone']}</span>
      </div>
    </div>
    </div>`
}


function editPopUpHTML(contact, i) {
  return `<div id="edit-popup" class="edit-contact-popup" style="display: flex;">
    <div class="left-side">
      <img id="popup-logo" src="accessories/img/addContact-Logo.svg" />
      <span class="add-heading">Edit contact</span>
      <img src="accessories/img/little-line.svg" />
    </div>
    <div class="right-side">
    <div class="profile-img-save" style="background:#${contact['color']}">
    <span class="profile-img-initial" id="initials">${contact['initials']}</span> 
    </div>
      <img
      onclick="closeEditPopup(${i})"
        id="cancel-x"
        class="cancel-x"
        src="accessories/img/cancel-logo.svg"
      />
      <form>
        <div class="input-line">
          <span class="icon icon1"><i class="fa-solid fa-user"></i></span>
          <input
            class="input-name"
            id="name"
            type="text"
            placeholder="${contact['name']}"
            required
          />
        </div>
        <div class="input-line">
          <span class="icon icon2"><i class="fa-solid fa-envelope"></i></span>
          <input
            class="input-name"
            id="email"
            type="email"
            placeholder="${contact['email']}"
            required
          
          />
        </div>
        <div class="input-line">
          <span class="icon icon3"><i class="fa-solid fa-phone"></i></span>
          <input
            class="input-name"
            id="phone"
            type="tel"
            placeholder="${contact['phone']}"
            required
            
          />
        </div>
        <div class="buttons">
          <div class="save-button popup-button" onclick="saveContact(${i})">
            <div id="Save-btn" class="save-button-text">Save</div>
          </div>
        </div>
      </form>
    </div>
  </div>
  ` ;
}