'use strict';
var today = new Date();
var dayOfWeek = today.getDay();
// This is the task constructor, still needs some work but we do not have much content to work with so far.
var taskCreator = function(taskName, assignedTo, startingDate) {
  this.taskName = taskName;
  this.assignedTo = assignedTo;
  this.startingDate = startingDate;
  var currentlyAssignedTo =
    assignedTo[randomNumberGenerator(assignedTo.length)];
};

taskCreator.prototype.updateDate = function() {
  //here we need to update the date.
};

//This function is generates a random number between 0 and the numberOfPeople assigned to the task.
function randomNumberGenerator(numberOfPeople) {
  return Math.floor(Math.random() * numberOfPeople);
}
