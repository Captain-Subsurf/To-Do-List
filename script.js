const taskInput = document.getElementById('task-input');
const addTaskBTn = document.getElementById('add-task');
const curTasksDiv = document.getElementById('current');
const compTasksDiv = document.getElementById('completed');

const currentTasksBtn = document.getElementById('tasks-btn');
const completedTasksBtn = document.getElementById('completed-btn');

let currentTasks = localStorage.getItem('current-tasks');
let completedTasks = localStorage.getItem('completed-tasks');

curTasksDiv.innerHTML = currentTasks;
compTasksDiv.innerHTML = completedTasks;

let doneButtons = document.querySelectorAll('.done-btn');
let delButtons = document.querySelectorAll('.del-btn');

addTaskBTn.addEventListener('click', () => {
	if (taskInput.value === '') return;

	let taskDiv = document.createElement('div');
	let taskName = document.createElement('h2');
	let taskDone = document.createElement('button');
	let taskDel = document.createElement('button');

	taskDiv.classList.add('task');
	taskName.classList.add('task-name');
	taskDone.classList.add('btn', 'task-btn', 'done-btn');
	taskDel.classList.add('btn', 'task-btn', 'del-btn');

	delBtnEvent(taskDel);
	doneBtnEvent(taskDone);

	taskName.textContent = taskInput.value;
	taskDone.textContent = 'Done';
	taskDel.textContent = 'Delete';

	taskDiv.appendChild(taskName);
	taskDiv.appendChild(taskDone);
	taskDiv.appendChild(taskDel);

	curTasksDiv.appendChild(taskDiv);
	taskInput.value = '';

	currentTasks = curTasksDiv.innerHTML;
	localStorage.setItem('current-tasks', currentTasks);
});

completedTasksBtn.addEventListener('click', () => {
	compTasksDiv.style.display = 'block';
	curTasksDiv.style.display = 'none';
	currentTasksBtn.classList.remove('bg-fill');
	completedTasksBtn.classList.add('bg-fill');
});

currentTasksBtn.addEventListener('click', () => {
	compTasksDiv.style.display = 'none';
	curTasksDiv.style.display = 'block';
	completedTasksBtn.classList.remove('bg-fill');
	currentTasksBtn.classList.add('bg-fill');
});

doneButtons.forEach((doneBtn) => {
	doneBtnEvent(doneBtn);
});

function doneBtnEvent(btn) {
	btn.addEventListener('click', () => {
		let parentDiv = btn.parentNode;
		btn.remove();
		compTasksDiv.appendChild(parentDiv);
		completedTasks = compTasksDiv.innerHTML;
		currentTasks = curTasksDiv.innerHTML;
		localStorage.setItem('current-tasks', currentTasks);
		localStorage.setItem('completed-tasks', completedTasks);
	});
}

delButtons.forEach((delBtn) => {
	delBtnEvent(delBtn);
});

function delBtnEvent(btn) {
	btn.addEventListener('click', () => {
		let parentDiv = btn.parentNode;
		parentDiv.remove();
		currentTasks = curTasksDiv.innerHTML;
		completedTasks = compTasksDiv.innerHTML;
		localStorage.setItem('current-tasks', currentTasks);
		localStorage.setItem('completed-tasks', completedTasks);
	});
}
