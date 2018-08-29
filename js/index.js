'use strict';

var mainEl = document.getElementById('main');

// Creates an array of all people who are assigned a task
function getAllAssignees(tasks) {
  var allAssignees = [];

  for (var i = 0; i < tasks.length; i++) {
    for (var j = 0; j < tasks[i].assignedTo.length; j++) {
      if (allAssignees.indexOf(tasks[i].assignedTo[j]) === -1) {
        allAssignees.push(tasks[i].assignedTo[j]);
      }
    }
  }

  return allAssignees;
}
//eslint-disable-next-line
console.log(getAllAssignees(allTasks));

//render the assignee and display them as lists
function render(getAllAssignees) {
  mainEl.innerHTML = '<h1>Task Overview</h1>';
  var sectionEl = document.createElement('section');
  var ulEl = document.createElement('ul');
  var h3El = document.createElement('h3');
  var ulEl2 = document.createElement('ul');

  for (var i = 0; i < getAllAssignees.length; i++) {
    var ilEl = document.createElement('li');
    ilEl.textContent = getAllAssignees[i];
    ulEl.appendChild(ilEl);
  }

  mainEl.appendChild(sectionEl);
  sectionEl.appendChild(ulEl);
  sectionEl.appendChild(h3El);
  sectionEl.appendChild(ulEl2);

  ulEl.setAttribute('id', 'peoples-names');
  ulEl2.setAttribute('id', 'peoples-tasks');
  var peoplesNames = document.getElementById('peoples-names');

  peoplesNames.addEventListener('click', showThisPersonsTasks);
}

//function to show task of individual after being clicked on
function showThisPersonsTasks(event) {
  var peoplesTasks = document.getElementById('peoples-tasks');
  var personClickedOn = event.target.textContent;
  var thisPersonsTasks = [];

  peoplesTasks.innerHTML = '';

  if (personClickedOn) {
    //eslint-disable-next-line
    for (var i = 0; i < allTasks.length; i++) {

      //eslint-disable-next-line
      if (personClickedOn === allTasks[i].currentlyAssignedTo) {
        //eslint-disable-next-line
        if (checkFrequencyOfTask(allTasks[i].frequencyOfTask, allTasks[i].dayTaskCreated)) {
          //eslint-disable-next-line
          thisPersonsTasks.push(allTasks[i].taskName);
        }
      }
    }
  }

  for (var i = 0; i < thisPersonsTasks.length; i++) {
    var ilEl = document.createElement('il');
    ilEl.textContent = thisPersonsTasks[i];
    peoplesTasks.appendChild(ilEl);
  }

  console.log(thisPersonsTasks);
  return thisPersonsTasks;
}
//eslint-disable-next-line
render(getAllAssignees(allTasks));

// Returns true is today is the day a job should be displayed based off its frequencyOfTask propery
function checkFrequencyOfTask(howOftenTheTaskRepeats, dateTaskWasCreated) {
  switch (howOftenTheTaskRepeats) {
  case 'weekly':
    var recur = moment(dateTaskWasCreated).recur().every(7).days();
    if (recur.matches(today)) {
      return true;
    } else {
      return false;
    }
  case 'monthly':
    var recur = moment(dateTaskWasCreated).recur().every(1).months();
    if (recur.matches(today)) {
      return true;
    } else {
      return false;
    }
  default:
    return true;
  }
}