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
  //eslint-disable-next-line
  for (
    let localDataObjects = 0;
    localDataObjects < allTasks.length;
    localDataObjects++
  ) {
    var sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);
    var h2El = document.createElement('h2');
    var buttonEl = document.createElement('button');
    var pEl = document.createElement('p');
    var ulEl = document.createElement('ul');

    //added text content to each element
    //eslint-disable-next-line
    h2El.textContent = allTasks[localDataObjects].taskName;
    buttonEl.textContent = 'Delete Task';
    pEl.textContent = 'Assigned to:';

    //appended the elements
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(buttonEl);
    sectionEl.appendChild(pEl);
    sectionEl.appendChild(ulEl);

    //created a list that shows the assigned individual
    //eslint-disable-next-line
    for (
      let assigneeInTasks = 0;
      assigneeInTasks < allTasks[localDataObjects].assignedTo.length;
      assigneeInTasks++
    ) {
      var liEl = document.createElement('li');
      //eslint-disable-next-line
      liEl.textContent = allTasks[localDataObjects].assignedTo[assigneeInTasks];
      ulEl.appendChild(liEl);
    }
  }
  //added event listener upon render to make sure the buttons have listeners
  sectionEventListener();
}

//added function on button to remove local storage and derender the list
function deleteTask(event) {
  if (event.target.textContent === 'Delete Task') {
    var taskDelete = event.target.parentNode.firstChild.textContent;
    //eslint-disable-next-line
    for (let i = 0; i < allTasks.length; i++) {
      //eslint-disable-next-line
      if (allTasks[i].taskName === taskDelete) {
        //eslint-disable-next-line
        allTasks.splice(i, 1);
        //eslint-disable-next-line
        localStorage.setItem('allTasks', JSON.stringify(allTasks));
        event.target.parentNode.remove();
      }
    }
  }
}

function sectionEventListener() {
  //eslint-disable-next-line
  checkLocalStorage();
  var taskSectionEls = document.getElementsByTagName('section');
  for (let i = 0; i < taskSectionEls.length; i++) {
    taskSectionEls[i].addEventListener('click', function(event) {
      deleteTask(event);
    });
  }
}

editorRender();
//create event listener to take in form data
taskFormEl.addEventListener('submit', function(event) {
  event.preventDefault();
  editorInput(event);
  //eslint-disable-next-line
  checkLocalStorage();
  editorRender();
});
