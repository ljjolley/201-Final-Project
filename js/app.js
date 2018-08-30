'use strict';
var today = new Date();
var dayOfWeek = today.getDay();
var dayOfMonth = today.getDate();
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
  this.startingDate = dayOfWeek;
  this.frequencyOfTask = frequencyOfTask;
  this.dayOfWeekToRepeatTask = dayOfWeekToRepeatTask;
  this.dayOfMonthToRepeatTask = dayOfMonthToRepeatTask;
  this.currentlyAssignedTo =
    assignedTo[randomNumberGenerator(assignedTo.length)];
  this.isTaskCompleted = false;
  allTasks.push(this);
};

// This function rotates through users
Task.prototype.updateDate = function() {
  if (dayOfWeek !== this.startingDate) {
    this.startingDate = dayOfWeek;

    //This checks if the user is the last one on the array
    if (
      this.assignedTo.indexOf(this.currentlyAssignedTo) + 1 >=
      this.assignedTo.length
    ) {
      //If so it is restarted at the 1st item in the array
      this.currentlyAssignedTo = this.assignedTo[0];
    } else {
      //Else it is rotated normally
      this.currentlyAssignedTo = this.assignedTo[
        this.assignedTo.indexOf(this.currentlyAssignedTo) + 1
      ];
    }
  }
};
// this let you change the color of the element based on boolean;
function colorChanger(element, thisPersonsTasks) {
  if (thisPersonsTasks === false) {
    element.style.backgroundColor = '#D15360';
  } else {
    element.style.backgroundColor = '#28cc22';
  }
}
//This function is generates a random number between 0 and the numberOfPeople assigned to the task.
function randomNumberGenerator(numberOfPeople) {
  return Math.floor(Math.random() * numberOfPeople);
}

// Checks if allTasks is in localStorage and if so, retreives it
function checkLocalStorage() {
  var dataInLocalStorage = JSON.parse(localStorage.getItem('allTasks'));

  // update uniqueTaskNames to be reflect what we just pulled out
  // of local storage
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

function writeToLocalStorage() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  uniqueTasksNames = new Set(allTasks.map(task => task.taskName));

  // Write to our new data structure
}

checkLocalStorage();
