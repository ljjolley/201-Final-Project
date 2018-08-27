'use strict';
var today = new Date();
var dayOfWeek = today.getDay();
var allTasks = [];

// This is the task constructor, still needs some work but we do not have much content to work with so far.
var Task = function(taskName, assignedTo, startingDate) {
  this.taskName = taskName;
  this.assignedTo = assignedTo;
  this.startingDate = startingDate;
  this.currentlyAssignedTo =
    assignedTo[randomNumberGenerator(assignedTo.length)];
  allTasks.push(this);
};

Task.prototype.updateDate = function() {
  //
};

//This function is generates a random number between 0 and the numberOfPeople assigned to the task.
function randomNumberGenerator(numberOfPeople) {
  return Math.floor(Math.random() * numberOfPeople);
}
