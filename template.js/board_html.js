/**
 * appearance of the contacts by assigning
 * @param {number} i 
 * @returns 
 */
function fillAssignsHTML(i) {
    return `<div class="assign-contact" >
          <span id="task-contact${i}">${allContacts[i]['name']}</span>
          <input type="checkbox" id="contact-check-${i}" onclick="contactToUse(${i})">
      </div>
      `
}


/**
 * chosen contact is added to a note
 * @param {number} j 
 * @returns 
 */
function contactToUseHTML(j) {
    return `<div class="profile-pic" style="background:#${allContacts[initialID[j]]['color']}">
                ${allContacts[initialID[j]]['initials']}
            </div>`;
}


/**
 * content of a new note
 * @param {string} task 
 * @param {number} i 
 * @returns 
 */
function createNote(task, i) {
    return `
    <div class="frame71 glow-on-hover" draggable="true" id="${i}" ondragstart="startDragging(${i})">
                        <div class="frame119" onclick = "openNote(${i})">
                            <div class="frame1132" style="${updateColor(task['category'])}" id="color">
                                <div class="desing" id="desing"> ${task['category']} </div>
                            </div>
                            <div class="frame116">
                                <div class="frame114">
                                    <div class="website" id="title">${task['title']}</div>
                                    <div class="modify" id="text">${task['description']}</div>
                                </div>
                            </div>
                            <div class="frame139">
                                <div class ="column">
                                    <div class="frame112" id="people">
                                    ${task['initial']}
                                     </div>
                                     <div class="new-contact">${task['invite']}</div>
                                </div>
                                <div class="frame111" id="frame111">
                                    ${task['img']}
                                </div>
                            </div>
                            </div>
                        <div class="trash-place">
                        <img class="trash" src="accessories/img/trash.png" onclick="markAsDone(${i}) ">
                        </div>
    </div>`;
}


/**
 * Content of the note
 * @param {string} task 
 * @param {number} i 
 * @returns 
 */
function noteHTML(task, i) {
    return `<div class="show-note" id="${i}" >
    
        <div class="side-by-side">
            <div class="frame1132" style="${updateColor(task['category'])}" id="color">
                <div class="desing" id="desing"> ${task['category']} 
                </div>
            </div>
            <div onclick="closeShow()" class="close">x </div>
        </div>
        <div class="note-title" id="title"><b>${task['title']}</b></div>
        <div class="note-description" id="text">${task['description']}</div>

        <div class="side-by-side">
            <div><b>Due date:</b></div> <div>${task['date']}</div>
        </div>
        <div class="side-by-side">
            <div>Priority:</div>
            <div class="frame111" id="frame111">
            ${task['img']}
            </div>
        </div>
        <div><b>Assigned To:</b> </div>
        <div class ="column">
            <div class="frame112" id="people">
                ${task['initial']}
            </div>
            <div class="new-contact">${task['invite']}</div>
        </div>   
        <div class="together">
            <button id= "toDoSplit" onclick="toDoSplit(${i})" class="workplace">To Do </button>
            <button id= "progressSplit" onclick="progressSplit(${i})" class="workplace">Progress </button>
            <button id= "feedbackSplit" onclick="feedbackSplit(${i})" class="workplace">Feedback </button>
            <button id= "doneSplit" onclick="doneSplit(${i})" class="workplace">Done </button> 
        </div>
    </div>`;
}

