'use strict';

var mainEl = document.getElementById('main');

console.log(NumberOfDaysThisMonth);
console.log(dayOfMonth);

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
  mainEl.innerHTML =
    "<h1>Welcome to <br> Happy Home Task Manager!</h1><section>We’re here to help your household manager chores and task so you don’t have to remember them…or remind others it’s their turn.<br><br>Your household's list of tasks lives here. If you need to add task, you can do that on the <a href='editor.html'>Add Tasks</a> page. Click on a name to find out what tasks are assigned to each person today. Red tasks are those that need to be completed today. Green tasks have been completed. Tasks that rotate between multiple people will only be displayed when it is that person’s turn to complete it. <br><br> Once you create tasks, they’ll show up in the box below. If the box is blank, you can follow this link <a href='editor.html'>HERE</a> to start adding tasks.</section>";
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

var selectedPersonEl;
//function to show task of individual after being clicked on
function showThisPersonsTasks(event) {
  var peoplesTasks = document.getElementById('peoples-tasks');
  if (selectedPersonEl !== undefined) {
    selectedPersonEl.className = '';
  }
  selectedPersonEl = event.target;
  selectedPersonEl.className = 'selected-person';
  var personClickedOn = selectedPersonEl.textContent;
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
        } else if (allTasks[i].frequencyOfTask === 'monthly' && NumberOfDaysThisMonth === dayOfMonth && allTasks[i].dayOfMonthToRepeatTask > NumberOfDaysThisMonth) {

          thisPersonsTasks.push(allTasks[i]);

          // Pushes the task to thisPersonsTasks if the task is done once or daily task
        } else if (allTasks[i].frequencyOfTask === 'once' || allTasks[i].frequencyOfTask === 'daily') {
 
          thisPersonsTasks.push(allTasks[i]);
        }
      }
    }

    console.log(thisPersonsTasks);
  }
  for (let i = 0; i < thisPersonsTasks.length; i++) {
    var ilEl = document.createElement('li');
    colorChanger(ilEl, thisPersonsTasks[i].isTaskCompleted);
    ilEl.addEventListener('click', function(event) {
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
    ilEl.textContent =
      thisPersonsTasks[i].taskName + ': ' + thisPersonsTasks[i].frequencyOfTask;
    peoplesTasks.appendChild(ilEl);
  }
  return thisPersonsTasks;
}

render(getAllAssignees(allTasks));


