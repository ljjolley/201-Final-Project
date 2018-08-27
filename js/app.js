'use strict';

// This is the task constructor, still needs some work but we do not have much content to work with so far.
var taskCreator = function(taskName, assignedTo, startingDate) {
  this.taskName = taskName;
  this.assignedTo = assignedTo;
  this.startingDate = startingDate;
};

taskCreator.prototype.updateDate = function() {
  //here we need to update the date.
};
