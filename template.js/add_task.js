async function init() {
  await downloadFromServer();
  jsonParse();
  /* fillAssigns(); */
}


/**
 * Loading Server Datas
 */
function jsonParse() {
  allTasks = JSON.parse(backend.getItem('allTasks')) || [];
  allContacts = JSON.parse(backend.getItem('allContacts')) || [];
}




