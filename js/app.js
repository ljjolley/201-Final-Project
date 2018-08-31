'use strict';
var today = new Date();
var formattedToday = moment().format('dddd, MMMM Do YYYY');
console.log(formattedToday);
var dayOfWeek = today.getDay();
var dayOfMonth = today.getDate();
var NumberOfDaysThisMonth = moment().daysInMonth();
var allTasks = [];
var uniqueTasksNames = new Set();

// This is the task constructor, still needs some work but we do not have much content to work with so far.
var Task = function(
  taskName,
  assignedTo,
  frequencyOfTask,
  dayOfWeekToRepeatTask,
  dayOfMonthToRepeatTask
) {
  this.taskName = taskName;
  this.assignedTo = assignedTo;
  this.startingDate = formattedToday;
  this.frequencyOfTask = frequencyOfTask;
  this.dayOfWeekToRepeatTask = dayOfWeekToRepeatTask;
  this.dayOfMonthToRepeatTask = dayOfMonthToRepeatTask;
  this.currentlyAssignedTo =
    assignedTo[randomNumberGenerator(assignedTo.length)];
  this.isTaskCompleted = false;
  allTasks.push(this);
};


// Rotates through assignees
function updateDate(taskToRotateAssignee) {
  if (formattedToday !== taskToRotateAssignee.startingDate) {
    taskToRotateAssignee.startingDate = formattedToday;

    // This checks if the user is the last one on the array
    if (
      taskToRotateAssignee.assignedTo.indexOf(taskToRotateAssignee.currentlyAssignedTo) + 1 >=
      taskToRotateAssignee.assignedTo.length
    ) {
      // If so it is restarted at the 1st person in the array
      taskToRotateAssignee.currentlyAssignedTo = taskToRotateAssignee.assignedTo[0];
    } else {
      // Else it is rotated normally
      taskToRotateAssignee.currentlyAssignedTo = taskToRotateAssignee.assignedTo[
        taskToRotateAssignee.assignedTo.indexOf(taskToRotateAssignee.currentlyAssignedTo) + 1
      ];
    }
  }
}

// this let you change the color of the element based on boolean;
function colorChanger(element, thisPersonsTasks) {
  if (thisPersonsTasks === false) {
    element.style.backgroundColor = '#D15360';
    element.style.color = 'white';
  } else {
    element.style.backgroundColor = '#28cc22';
    element.style.color = 'black';
  }
}

//This function is generates a random number between 0 and the numberOfPeople assigned to the task.
function randomNumberGenerator(numberOfPeople) {
  return Math.floor(Math.random() * numberOfPeople);
}

// Checks if allTasks is in localStorage and if so, retreives it
function checkLocalStorage() {
  var dataInLocalStorage = JSON.parse(localStorage.getItem('allTasks'));

  // update uniqueTaskNames to reflect what was just pulled out of local storage
  if (dataInLocalStorage) {
    allTasks = dataInLocalStorage;
    allTasks.forEach(function(task) {
      uniqueTasksNames.add(task.taskName);
    });
  } else {
    allTasks = [];
    uniqueTasksNames = new Set();
  }
}

// Saves allTasks to localStorage
function writeToLocalStorage() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  uniqueTasksNames = new Set(allTasks.map(task => task.taskName));
}

function rotateTaskAssignees() {
  for (var i = 0; i < allTasks.length; i++) {
    // Checks if the task should be displayed today (this day of the week)
    if (allTasks[i].frequencyOfTask === 'weekly' && allTasks[i].dayOfWeekToRepeatTask === dayOfWeek) {
      updateDate(allTasks[i]);
      console.log('test1');

    // Checks if the task should be displayed today (this day of the month)
    } else if (allTasks[i].frequencyOfTask === 'monthly' && allTasks[i].dayOfMonthToRepeatTask === dayOfMonth) {
      updateDate(allTasks[i]);
      console.log('test2');
    // Displays tasks on the last day of the month if the task is assigned a day this month doesn't have
    } else if (allTasks[i].frequencyOfTask === 'monthly' && NumberOfDaysThisMonth === dayOfMonth && allTasks[i].dayOfMonthToRepeatTask > NumberOfDaysThisMonth) {
      updateDate(allTasks[i]);
      console.log('test3');
    // Pushes the task to thisPersonsTasks if the task is done once or daily task
    } else if (allTasks[i].frequencyOfTask === 'daily') {
      console.log(allTasks[i].currentlyAssignedTo);
      updateDate(allTasks[i]);
      console.log(allTasks[i].currentlyAssignedTo);
    } else if (allTasks[i].frequencyOfTask === 'once') {
      if (formattedToday !== allTasks[i].startingDate) {
        var toDelete = allTasks.indexOf(allTasks[i]);
        console.log('before', allTasks);
        allTasks.splice(toDelete, 1);
        console.log('after', allTasks);
      }
    }
  }

  writeToLocalStorage(allTasks);
}

checkLocalStorage();
rotateTaskAssignees();

