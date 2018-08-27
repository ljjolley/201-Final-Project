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

console.log(getAllAssignees(allTasks));

function render(getAllAssignees) {
  var sectionEl = document.createElement('section');
  var ulEl = document.createElement('ul');
  var h3El = document.createElement('h3');
  var ulEl2 = document.createElement('ul');

  for (var i = 0; i < getAllAssignees.length; i++) {
    var ilEl = document.createElement('il');
    ilEl.textContent = getAllAssignees[i];
    ulEl.appendChild(ilEl);
  }

  mainEl.appendChild(sectionEl);
  sectionEl.appendChild(ulEl);
  sectionEl.appendChild(h3El);
  sectionEl.appendChild(ulEl2);

  ulEl.setAttribute('id', 'peoples-names');
  var peoplesNames = document.getElementById('peoples-names');

  peoplesNames.addEventListener('click', showThisPersonsTasks);
}

function showThisPersonsTasks(event) {
  var personClickedOn = event.target.textContent;
  var thisPersonsTasks = [];

  if (personClickedOn) {
    for (var i = 0; i < allTasks.length; i++) {
      if (personClickedOn === allTasks[i].currentlyAssignedTo) {
        thisPersonsTasks.push(allTasks[i].taskName);
      }
    }
  }
  console.log(thisPersonsTasks);
  return thisPersonsTasks;
}


render(getAllAssignees(allTasks));
