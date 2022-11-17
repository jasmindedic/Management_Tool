let allTasks = [];

async function init() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    updateHTML();
   
     
}

function openPopup() {
    document.getElementById('board-popup').classList.add('open-pupop');
}

function closePopup() {
    document.getElementById('board-popup').classList.remove('open-pupop');
}


function showBoard() {
    let tasksBoard = document.getElementById('frame14');
    let i = allTasks.length-1;
        let task = allTasks[i];
    tasksBoard.innerHTML += createNote(task, i);
    color();
  
    }

    function color(){
        for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i]['category'];
        if(element == 'Design'){
            document.getElementById('color').classList.add('orange');
        }
        if(element == 'Sales'){
            document.getElementById('color').classList.add('pink');
        }
        if(element == 'Media'){
            document.getElementById('color').classList.add('yellow');
        }
        if(element == 'Office'){
            document.getElementById('color').classList.add('green');
        }
        if(element == 'Marketing'){
            document.getElementById('color').classList.add('blue');
        }
    }
}


function createNote(task, i) { 
    
    
    return `
    <div class="frame71" draggable="true" id="${i}" ondragstart="startDragging(${i})">
                        <div class="frame119">
                            <div class="frame1132" id="color">
                                <div class="desing" id="desing"> ${task['category']} </div>
                            </div>
                            <div class="frame116">
                                <div class="frame114">
                                    <div class="website" id="title">${task['title']}</div>
                                    <div class="modify" id="text">${task['description']}</div>
                                </div>
                            </div>
    
                            <div class="frame143">
                                <div class="frame141">
    
                                </div>
                                <div class="done"> 1/2 Done</div>
                            </div>
                            <div class="frame139">
                                <div class="frame112" id="people">
                                    <div class="frame74">
                                        <div class="xy">XY</div>
                                    </div>
                                    <div class="frame77">
                                        <div class="xy">XY</div>
                                    </div>
                                    <div class="frame76">
                                        <div class="xy">XY</div>
                                    </div>
                                </div>
                                <div class="frame111">
                                    <img class="prio" src="accessories/img/capa_green.png">
                                </div>
    
                            </div>
                        </div>
                        <div onclick="markAsDone(${i}) ">x<div>
                    </div>`;

                
    }


function updateHTML() {
     document.getElementById('frame14').innerHTML = '';
     document.getElementById('frame15').innerHTML = '';
     document.getElementById('frame16').innerHTML = '';
     document.getElementById('frame17').innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i]['processing_state'];
        let task = allTasks[i];
        if (element == "frame14" || element == "frame15" || element == "frame16" || element == "frame17") {
            document.getElementById(element).innerHTML += createNote(task, i);
        }
}
color();
}

function createTask() {
    let title = document.getElementById('form-title').value;
    let text = document.getElementById('form-descr').value;
    let collection = document.getElementById('form-category');
    let o = collection.selectedIndex;
    let category = collection.options[o].text;
    

    let task = {
        'title': title,
        'description': text,
        'category': category,
        'processing_state': 'frame14',
    }

    allTasks.push(task);

    showBoard();
    closePopup();
    document.getElementById('form-title').value = '';
    document.getElementById('form-descr').value = '';


let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
    
}

function loadAllTasks(){
    let allTasksAsStrings = backend.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsStrings);
}




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
  
  
function markAsDone(i) {
    let currentTask = document.getElementById(i);
    currentTask.remove();
    allTasks.splice(i, 1);
    let allTasksAsString = JSON.stringify(allTasks);
    backend.setItem('allTasks', allTasksAsString);
}


function search() {

    let serch = document.getElementById("search");
    serch = serch.toLowCase();


    // Eine Nodelist (Liste) der Tabellenzeilen bereit stellen:
    let tr = document.getElementsByTagName("tr");

        // Schleife über alle Tabellenzeilen:
        // Die erste mit dem Index 0 wird dabei ausgeschlossen
        // weil es sich um den Kopf der Tabelle handelt
        for (let i = 1; i < tr.length; i++) {
            // Prüfen ob das HTML der Tabellenzeile den Suchbegriff enthält:
            if (tr[i].innerHTML.includes(input.value)) {
                // Suchbegriff gefunden: Die Zeile wird sichtbar gemacht:
                tr[i].style.display = "";
            } else {
                // Suchbegriff nicht gefunden: Die Zeile wird verborgen:
                tr[i].style.display = "none";
            }
    }

}
