'use strict';
//create variable to retrieve form ID
var taskFormEl = document.getElementById('newTaskForm');

//create event listener to take in form data
taskFormEl.addEventListener('submit', function(event) {
  event.preventDefault();
  var assignedToList = []; //pushes the name part onto empty array and push it as a variable
  var assignee = [
    event.target.assignee1,
    event.target.assignee2,
    event.target.assignee3,
    event.target.assignee4,
    event.target.assignee5
  ];
  for (let i = 0; i < assignee.length; i++) {
    if (assignee[i].value) {
      assignedToList.push(assignee[i].value);
    }
    assignee[i].value = null;
  }
  //eslint-disable-next-line
  new Task(
    event.target.task.value, //takes in the task name and input it in constructor function
    assignedToList //takes in the empty array as assigned variable and run it as an prameter
  );
  event.target.task.value = null;
});
