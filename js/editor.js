'use strict';
//create variable to retrieve form ID
var taskFormEl = document.getElementById('newTaskForm');

//create event listener to take in form data
taskFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  var assignedToList = []; //pushes the name part onto empty array and push it as a variable
  assignedToList.push(event.target.assignee1.value);
  assignedToList.push(event.target.assignee2.value);
  assignedToList.push(event.target.assignee3.value);
  assignedToList.push(event.target.assignee4.value);
  assignedToList.push(event.target.assignee5.value);
  new Task(
    event.target.task.value, //takes in the task name and input it in constructor function
    assignedToList //takes in the empty array as assigned variable and run it as an prameter
  );
});