let smallViewport = false;

async function init() {
    await downloadFromServer();
    jsonParse();
    updateHTML();
}

/**
 * Loading Server datas
 */
function jsonParse() {
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allContacts = JSON.parse(backend.getItem('allContacts')) || [];
}


/**
 * Pinning notes on board 
 */
function updateHTML() {
    clearTable();
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i]['processing_state'];
        let task = allTasks[i];
        if (element == "todoTable" || element == "progressTable" || element == "feedbackTable" || element == "doneTable")
            document.getElementById(element).innerHTML += createNote(task, i);
    }
}


/**
 * Clearing board
 */
function clearTable() {
    document.getElementById('todoTable').innerHTML = '';
    document.getElementById('progressTable').innerHTML = '';
    document.getElementById('feedbackTable').innerHTML = '';
    document.getElementById('doneTable').innerHTML = '';
}


/**
 * Loading tasks from backend
 */
function loadAllTasks() {
    let allTasksAsStrings = backend.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsStrings);
}


/**
 * Creating task-form
 */
function openPopup() {
    if (window.innerWidth < 960) {
        document.getElementById('secondcontent').classList.add('d-none');
        document.getElementById('board-popup').classList.add('open-popup');
        secondplanAdd();
        fillAssigns();
    }
    else {
        document.getElementById('board-popup').classList.add('open-popup');
        secondplanAdd();
        fillAssigns();
    }
}


/**
 * Selecting right color for categories
 * @param {string} category 
 * @returns string
 */
function updateColor(category) {
    if (category == 'Media') {
        return `background: #FFC701;`
    }
    else if (category == 'Backoffice') {
        return `background: #1FD7C1;`
    }
    else if (category == 'Marketing') {
        return `background: #0038FF;`
    }
    else if (category == 'Design') {
        return `background: #FF7A00;`
    }
    else {
        return `background: #FC71FF;`
    }
}


/**
 * Close and clear task-form
 */
function closeAddTaskPopup() {
    document.getElementById('board-popup').classList.remove('open-popup');
    secondplanRemove();
    clearNoteInpt();
    document.getElementById('task-form').reset();
    document.getElementById('subtask-list').innerHTML = '';
    document.getElementById('secondcontent').classList.remove('d-none');
}


/**
 * Clear task-form
 */
function clearNoteInpt() {
    document.getElementById('form-title').value = '';
    document.getElementById('form-descr').value = '';
    document.getElementById('input-date').value = '';
    document.getElementById('use-contact').innerHTML = '';
    document.getElementById('invited-contact').innerHTML = '';
}


/**
 * Zooming notes
 * @param {number} i - id of task
 */
function openNote(i) {
    document.getElementById('openNote').classList.add('open-popup-note');
    let task = allTasks[i];
    document.getElementById('openNote').innerHTML = '';
    document.getElementById('openNote').innerHTML += noteHTML(task, i);
    checkSplit(i);
    secondplanAdd();
}


/**
 * Closing notes
 */
function closeShow() {
    document.getElementById('openNote').classList.remove('open-popup-note');
    secondplanRemove();
}


/**
 * Deleting notes
 * @param {number} i - id of task
 */
function markAsDone(i) {
    let currentTask = document.getElementById(i);
    currentTask.remove();
    allTasks.splice(i, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
    updateHTML();

}


/**
 * showing new notes on board
 */
function showBoard() {
    let tasksBoard = document.getElementById('todoTable');
    let i = allTasks.length - 1;
    let task = allTasks[i];
    tasksBoard.innerHTML += createNote(task, i);
    closeAddTaskPopup();
}


/**
 * Drag and drop
 */
let currentDraggedElement;

function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function MoveTo(processingState) {
    allTasks[currentDraggedElement].processing_state = processingState;
    updateHTML();
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
}


/**
 * Check if search-value is empty - if not, execute searchAll with send-value
 */
function search() {
    if (document.getElementById('search').value == "")
        updateHTML();
    else {
        let search = document.getElementById('search').value;
        search = search.toLowerCase();
        searchAll(search);
    }
}


/**
 * Search Function
 * @param {string} search - search-value from input-field
 */
function searchAll(search) {
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let tr = task['description'];
        let ts = task['category'];
        let ta = task['title'];
        let list = document.getElementById(`${i}`)
        if (!tr.toLowerCase().includes(search) && !ts.toLowerCase().includes(search) && !ta.toLowerCase().includes(search))
            list.style.display = "none";
        else
            list.style.display = "";
    }
}

/**
 * Drap and Drop mobile
 * @param {*} i 
 */
function toDoSplit(i) {
    allTasks[i]['processing_state'] = "todoTable";
    let newNote = allTasks[i]
    allTasks.push(newNote);
    allTasks.splice(i, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
    closeShow();
    updateHTML();
}


function progressSplit(i) {
    allTasks[i]['processing_state'] = "progressTable";
    let newNote = allTasks[i]
    allTasks.push(newNote);
    allTasks.splice(i, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
    closeShow();
    updateHTML();
}


function feedbackSplit(i) {
    allTasks[i]['processing_state'] = "feedbackTable";
    let newNote = allTasks[i]
    allTasks.push(newNote);
    allTasks.splice(i, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
    closeShow();
    updateHTML();
}


function doneSplit(i) {
    allTasks[i]['processing_state'] = "doneTable";
    let newNote = allTasks[i]
    allTasks.push(newNote);
    allTasks.splice(i, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
    closeShow();
    updateHTML();
}


function checkSplit(i) {
    if (allTasks[i]['processing_state'] == "todoTable")
        document.getElementById('toDoSplit').classList.add('workplace-add');
    if (allTasks[i]['processing_state'] == "progressTable")
        document.getElementById('progressSplit').classList.add('workplace-add');
    if (allTasks[i]['processing_state'] == "feedbackTable")
        document.getElementById('feedbackSplit').classList.add('workplace-add');
    if (allTasks[i]['processing_state'] == "doneTable")
        document.getElementById('doneSplit').classList.add('workplace-add');
}


/**
 * Adding layer
 */
function secondplanAdd() {
    document.getElementById('secondcontent').classList.add('second-plan');
}


/**
 * Removing layer
 */
function secondplanRemove() {
    document.getElementById('secondcontent').classList.remove('second-plan');
}

