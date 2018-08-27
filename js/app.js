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
// This checks to see if it is a new day, if it is then it changes who the task is assigned to, if the person assigned yesterday is last in the array it starts again at the beginning of the array
Task.prototype.updateDate = function() {
  if (dayOfWeek !== this.startingDate) {
    this.startingDate = dayOfWeek;
    if (
      this.assignedTo.indexOf(this.currentlyAssignedTo) + 1 >
      this.assignedTo.length
    ) {
      this.currentlyAssignedTo = this.assignedTo[0];
    } else {
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
