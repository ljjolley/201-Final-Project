'use strict';
//create variable to retrieve form ID
var taskFormEl = document.getElementById('newTaskForm');
var divEl = document.getElementById('tasks-editor-list');
var frequencyOfTask = document.getElementById('frequency-of-task');
var whenToRepeatTask = document.getElementById('when-to-repeat-task');
var daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
var DAYS_IN_A_MONTH = 31;
var dayOfWeekToRepeatTask;
var dayOfMonthToRepeatTask;

//takes in user data and transforms them to local data
function editorInput() {
  var frequencyOfTaskValue = frequencyOfTask.value;
  var assignedToList = []; //pushes the name part onto empty array and push it as a variable
  var assignee = [
    event.target.assignee1,
    event.target.assignee2,
    event.target.assignee3,
    event.target.assignee4,
    event.target.assignee5
  ];

  if (uniqueTasksNames.has(event.target.task.value.toLowerCase())) {
    alert('This task name is already in use, please choose a new task name.');
    event.target.task.value = null;
    assignee.forEach(function(assignee) {
      assignee.value = null;
    });
    return;
  }
  //clears out user data after the submit button and runs for loop to push data onto assigned list array
  for (let i = 0; i < assignee.length; i++) {
    if (assignee[i].value) {
      assignedToList.push(assignee[i].value.toLowerCase());
    }
    assignee[i].value = null;
  }
  assignedToList = deleteDuplicatenames(assignedToList);

  assignWhenToRepeatTaskValues();
  //eslint-disable-next-line
  new Task(
    event.target.task.value.toLowerCase(),
    assignedToList,
    frequencyOfTaskValue,
    dayOfWeekToRepeatTask,
    dayOfMonthToRepeatTask
  );
  //eslint-disable-next-line

  //store the all task array as 'allTasks' and updates it;
  //eslint-disable-next-line
  writeToLocalStorage();
  event.target.task.value = null;
}

// This function checkes for duplicate names in an Array and returns a new array that works.
function deleteDuplicatenames(tasks) {
  var noDuplicates = [];
  for (var i = 0; i < tasks.length; i++) {
    if (noDuplicates.indexOf(tasks[i]) === -1) {
      noDuplicates.push(tasks[i]);
    }
  }
  return noDuplicates;
}

//renders the local storage to display the tasks as lists
function editorRender() {
  checkLocalStorage();
  divEl.innerHTML = '';

  //run a loop to create elements based on local storage
  //eslint-disable-next-line
  for (
    let localDataObjects = 0;
    //eslint-disable-next-line
    localDataObjects < allTasks.length;
    localDataObjects++
  ) {
    var sectionEl = document.createElement('section');
    divEl.appendChild(sectionEl);
    var h2El = document.createElement('h2');
    var h3El = document.createElement('h3');
    var buttonEl = document.createElement('button');
    var pEl = document.createElement('p');
    var ulEl = document.createElement('ul');

    // this let you change the color of the element based on boolean;
    console.log(allTasks[localDataObjects].isTaskCompleted);
    colorChanger(sectionEl, allTasks[localDataObjects].isTaskCompleted);

    //added text content to each element
    //eslint-disable-next-line
    h2El.textContent = allTasks[localDataObjects].taskName;
    h3El.textContent =
      'Frequency: ' + allTasks[localDataObjects].frequencyOfTask;
    buttonEl.textContent = 'Delete Task';
    pEl.textContent = 'Assigned to:';

    //appended the elements
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(h3El);
    sectionEl.appendChild(buttonEl);
    sectionEl.appendChild(pEl);
    sectionEl.appendChild(ulEl);

    //created a list that shows the assigned individual with a foor loop
    for (
      let assigneeInTasks = 0;
      //eslint-disable-next-line
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
        writeToLocalStorage();
        event.target.parentNode.remove();
      }
    }
  }
}

//a function to add the delete button on each different sections generated
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


// Adds when a task should be repeated the instance of Task being created
function updateWhenToRepeatTask(event) {
  whenToRepeatTask.innerHTML = '';

  if (event.target.value === 'weekly') {
    whenToRepeatTask.style.display = 'inline-block';
    for (var i = 0; i < daysOfTheWeek.length; i++) {
      var optionEl = document.createElement('option');
      optionEl.textContent = daysOfTheWeek[i];
      optionEl.setAttribute('value', daysOfTheWeek[i]);
      whenToRepeatTask.appendChild(optionEl);
    }
  } else if (event.target.value === 'monthly') {
    for (var i = 1; i <= DAYS_IN_A_MONTH; i++) {
      whenToRepeatTask.style.display = 'inline-block';
      var optionEl = document.createElement('option');
      optionEl.textContent = i;
      optionEl.setAttribute('value', i);
      whenToRepeatTask.appendChild(optionEl);
    }
  } else {
    whenToRepeatTask.style.display = 'none';
  }
}

// Assigns when a task should be repeated
function assignWhenToRepeatTaskValues() {
  if (frequencyOfTask.value === 'weekly') {
    dayOfWeekToRepeatTask = daysOfTheWeek.indexOf(whenToRepeatTask.value);
    dayOfMonthToRepeatTask = null;
  } else if (frequencyOfTask.value === 'monthly') {
    dayOfMonthToRepeatTask = parseInt(whenToRepeatTask.value);
    dayOfWeekToRepeatTask = null;
  } else {
    dayOfMonthToRepeatTask = null;
    dayOfWeekToRepeatTask = null;
  }
}


// Binds event lister to the form to take in user data
taskFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  editorInput(event);
  checkLocalStorage();
  editorRender();

  var lastAddedTask = document.getElementById('tasks-editor-list').lastChild;
  lastAddedTask.className = 'animateTaskIn';
});

// Binds event listener to updateWhenToRepeatTask
frequencyOfTask.addEventListener('change', updateWhenToRepeatTask);

// Rendered data onto page to display task
editorRender();

