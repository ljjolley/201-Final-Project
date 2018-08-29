'use strict';

var mainEl = document.getElementById('main');
var NumberOfDaysThisMonth = moment().daysInMonth();

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
    // console.log(allTasks[0].taskName);

    for (var i = 0; i < allTasks.length; i++) {
      // Checks if the person who was clicked on matches who the task is currently assigned to
      if (personClickedOn === allTasks[i].currentlyAssignedTo) {

        // Checks if the task should be displayed today (this day of the week)
        if (allTasks[i].frequencyOfTask === 'weekly' && allTasks[i].dayOfWeekToRepeatTask === dayOfWeek) {
          thisPersonsTasks.push(allTasks[i]);

          // Checks if the task should be displayed today (this day of the month)
        } else if (allTasks[i].frequencyOfTask === 'monthly' && allTasks[i].dayOfMonthToRepeatTask === dayOfMonth) {
          thisPersonsTasks.push(allTasks[i]);

          // Displays tasks on the last day of the month if the task is assigned a day this month doesn't have
        } else if (allTasks[i].frequencyOfTask === 'monthly' && allTasks[i].dayOfMonthToRepeatTask > NumberOfDaysThisMonth) {
          thisPersonsTasks.push(allTasks[i]);

          // Pushes the task to thisPersonsTasks if the task is a one-off or daily task
        } else if (allTasks[i].frequencyOfTask === 'one-off' || allTasks[i].frequencyOfTask === 'daily') {
          thisPersonsTasks.push(allTasks[i]);
        }
      }
    }

    console.log(thisPersonsTasks);
  }
  for (let i = 0; i < thisPersonsTasks.length; i++) {
    var ilEl = document.createElement('li');
    colorChanger(ilEl, thisPersonsTasks[i].isTaskCompleted);
    ilEl.addEventListener('click', function (event) {
      if (thisPersonsTasks[i].isTaskCompleted === false) {
        thisPersonsTasks[i].isTaskCompleted = true;
        writeToLocalStorage(event);
        colorChanger(this, thisPersonsTasks[i].isTaskCompleted);
      } else {
        thisPersonsTasks[i].isTaskCompleted = false;
        writeToLocalStorage(event);
        colorChanger(this, thisPersonsTasks[i].isTaskCompleted);
      }
      colorChanger(this, thisPersonsTasks[i].isTaskCompleted);
    });
    ilEl.style.color = 'white';
    ilEl.textContent = thisPersonsTasks[i].taskName + ': ' + thisPersonsTasks[i].frequencyOfTask;
    peoplesTasks.appendChild(ilEl);
  }
  return thisPersonsTasks;
}
render(getAllAssignees(allTasks));