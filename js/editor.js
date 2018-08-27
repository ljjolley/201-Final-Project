'use strict';
//create variable to retrieve form ID
var taskFormEl = document.getElementById('newTaskForm');

function editorInput() {
  var assignedToList = []; //pushes the name part onto empty array and push it as a variable
  var assignee = [
    event.target.assignee1,
    event.target.assignee2,
    event.target.assignee3,
    event.target.assignee4,
    event.target.assignee5
  ];
  for (let i = 0; i < assignee.length; i++) {
    if (assignee[i].value) {
      assignedToList.push(assignee[i].value.toLowerCase());
    }
    assignee[i].value = null;
  }
  //eslint-disable-next-line
  new Task(
    event.target.task.value.toLowerCase(), //takes in the task name and input it in constructor function
    assignedToList //takes in array of assignedToList and uses it as assigned users.
  );
  //eslint-disable-next-line
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  event.target.task.value = null;
}

//renders the local storage to display the tasks as lists
function editorRender() {
  //create variables to retrieve DOM
  var mainEl = document.getElementById('editor-main');

  //run a loop to create elements based on local storage
  for (let localDataObjects = 0; localDataObjects < allTasks.length; localDataObjects++) {
    var sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);
    var h2El = document.createElement('h2');
    var buttonEl = document.createElement('button');
    var pEl = document.createElement('p');
    var ulEl = document.createElement('ul');

    //added text content to each element
    h2El.textContent = allTasks[localDataObjects].taskName;
    buttonEl.textContent = 'Delete Task';
    buttonEl.setAttribute('class', 'delete-task');
    pEl.textContent = 'Assigned to:';

    //appended the elements
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(buttonEl);
    sectionEl.appendChild(pEl);
    sectionEl.appendChild(ulEl);

    //created a list that shows the assigned individual
    for (let assigneeInTasks = 0; assigneeInTasks < allTasks[localDataObjects].assignedTo.length; assigneeInTasks++) {
      var liEl = document.createElement('li');
      liEl.textContent = allTasks[localDataObjects].assignedTo[assigneeInTasks];
      ulEl.appendChild(liEl);
    }
  }
}
editorRender();
//create event listener to take in form data
taskFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  editorInput(event);
  checkLocalStorage();
  editorRender();
});