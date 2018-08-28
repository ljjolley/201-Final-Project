'use strict';
var today = new Date();
var dayOfWeek = today.getDay();
var allTasks = [];

// This is the task constructor, still needs some work but we do not have much content to work with so far.
var Task = function(taskName, assignedTo, frequencyOfTask, dayToDoTask) {
  this.taskName = taskName;
  this.assignedTo = assignedTo;
  // this.startingDate = dayOfWeek;
  this.frequencyOfTask = frequencyOfTask;
  this.dayToDoTask = dayToDoTask;
  this.dayTaskCreated = today;
  this.currentlyAssignedTo =
    assignedTo[randomNumberGenerator(assignedTo.length)];
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

//This function is generates a random number between 0 and the numberOfPeople assigned to the task.
function randomNumberGenerator(numberOfPeople) {
  return Math.floor(Math.random() * numberOfPeople);
}

// Checks if allTasks is in localStorage and if so, retreives it
function checkLocalStorage() {
  var dataInLocalStorage = JSON.parse(localStorage.getItem('allTasks'));

  if (dataInLocalStorage) {
    allTasks = dataInLocalStorage;
  }
}

checkLocalStorage();
