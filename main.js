const toDoList = {
    "Home Tasks": [{
        task : 'Shave beaver',
        date : '31.2.2028',
        time : '25:61',
        notes : 'ou yeah',
        priority : 'high'
        }, {
        task : 'Shave bever',
        date : '31.2.2028',
        time : '25:61',
        notes : 'ou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeah',
        priority : 'medium'
        }, {
        task : 'Shave baver',
        date : '31.2.2028',
        time : '25:61',
        notes : 'ou yeah',
        priority : 'low'
        },
    ],
    "Some project": [],
    "Some other project": [],
    "Some awesome project": [],
}

class Task {
    constructor(task, date, time, notes, priority) {
        this.task = task;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.priority = priority
    }

    addToDoList(project = 'Home Tasks') {
        const toBeAdded = {
            task: this.task,
            date: this.date,
            time: this.time,
            notes: this.notes,
            priority: this.priority,
        }
        toDoList[project].push(toBeAdded);
    }
}

function showAllTasks(project = 'Home Tasks') {
    clearAllTasks();
    for (let tasks in toDoList[project]) {
        showTask(toDoList[project][tasks], toDoList[project][tasks], toDoList[project][tasks], toDoList[project][tasks], toDoList[project][tasks]);
    }
}

function clearAllTasks() {
    const allTasks = document.querySelectorAll('.added-task');
    allTasks.forEach(element => element.remove());
}

function showTask({task, date, time, notes, priority}) {
    const content = document.querySelector('#content');

    const addedTask = document.createElement('div');
    const checkLabel = document.createElement('label');
    const checkbox = document.createElement('input');
    const labelBox = document.createElement('span');
    const taskName = document.createElement('div');
    const strong = document.createElement('strong');
    const taskDate = document.createElement('div');
    const taskTime = document.createElement('div');
    const taskNotes = document.createElement('div');
    // const svgContainer = document.createElement('div');
    // const imgEdit = document.createElement('img');
    const imgTrash = document.createElement('img');

    addedTask.setAttribute('class', 'added-task');
    checkLabel.setAttribute('class', 'check-label');
    checkbox.setAttribute('type', 'checkbox');
    labelBox.classList.add('label-box', `priority-${priority}`);
    taskName.setAttribute('class', 'task-name');
    taskDate.setAttribute('class', 'task-date');
    taskTime.setAttribute('class', 'task-time');
    taskNotes.setAttribute('class', 'task-notes');
    // svgContainer.setAttribute('class', 'svg-container');
    // imgEdit.setAttribute('class', 'edit-task');
    imgTrash.setAttribute('class', 'trash-task');

    // imgEdit.src = './icons/note-edit-outline.svg';
    imgTrash.src = './icons/trash-can-outline.svg';

    strong.textContent = `${task}`;
    taskDate.textContent = `${date}`;
    taskTime.textContent = `${time}`;
    taskNotes.textContent = `${notes}`;

    taskName.append(strong);
    checkLabel.append(checkbox, labelBox);
    // svgContainer.append(imgEdit, imgTrash);
    addedTask.append(checkLabel, taskName, taskDate, taskTime, taskNotes, imgTrash);
    content.append(addedTask);
}

function createNewTask() {
    const task = document.querySelector('#submit-task').value;
    const date = document.querySelector('#submit-date').value;
    const time = document.querySelector('#submit-time').value;
    const notes = document.querySelector('#submit-notes').value;
    const priority = document.querySelector('#priority-selector').value;
    return new Task(task, date, time, notes, priority);
}

function submitTask(e) {
    e.preventDefault();
    if (taskForm.reportValidity()) {
        createNewTask().addToDoList();
        showAllTasks();
        taskForm.reset();
        taskDialog.close();
    };
}

function submitTaskViaProject(e, project) {
    e.preventDefault();
    if (taskInProjectForm.reportValidity()) {
        createNewTask().addToDoList(project);
        showAllTasks();
        taskInProjectForm.reset();
        taskInProjectDialog.close();
    };
}

function deleteTask(e) {
    if (e.target.matches('.trash-task')) {
        const targetTitle = e.target.parentNode.querySelector('strong').textContent;
        const targetDate = e.target.parentNode.querySelector('.task-date').textContent;
        const targetTime = e.target.parentNode.querySelector('.task-time').textContent;
        const targetNotes = e.target.parentNode.querySelector('.task-notes').textContent;
        for (let project in toDoList) {
            for (let i = 0; i < toDoList[project].length; i++) {
                if (targetTitle === toDoList[project][i].task && targetDate === toDoList[project][i].date && targetTime === toDoList[project][i].time && targetNotes === toDoList[project][i].notes) {
                    toDoList[project].splice([i],1);
                    e.target.parentNode.remove();
                }
            }
        }
    }
}

function showProject(project) {
    const projects = document.querySelector('.projects-container');

    const addedProject = document.createElement('div');
    const p = document.createElement('p');
    const imgTask = document.createElement('img');
    // const imgEdit = document.createElement('img');
    const imgTrash = document.createElement('img');

    imgTask.src = './icons/plus-circle-outline.svg';
    // imgEdit.src = './icons/note-edit-outline.svg';
    imgTrash.src = './icons/trash-can-outline.svg';

    addedProject.setAttribute('class', 'added-project');
    imgTask.setAttribute('class', 'add-task-in-project');
    // imgEdit.setAttribute('class', 'edit-project');
    imgTrash.setAttribute('class', 'trash-project');

    p.textContent = `${project}`;

    addedProject.append(p, imgTask, imgTrash);
    projects.append(addedProject);
}

function showAllProjects() {
    clearAllProjects();
    for (let project in toDoList) {
        if (project !== 'Home Tasks') {
            showProject(project);
        }
    }
}

function clearAllProjects() {
    const allProjects = document.querySelectorAll('.added-project');
    allProjects.forEach(element => element.remove());
}

function createNewProject() {
    const project = document.querySelector('#submit-project').value;
    toDoList[project] = [];
    showProject(project);
}

function submitProject(e) {
    e.preventDefault();
    if (projectForm.reportValidity()) {
        createNewProject();
        projectForm.reset();
        projectDialog.close();
    }
}

// function editProject(e) {
//     if (e.target.matches('.edit-project')) {
//         projectDialog.showModal();
//         const targetP = e.target.parentNode.querySelector('p').textContent;
//         for (let project in toDoList) {
//             if (targetP === project) {
//                 delete toDoList[project];
//                 e.target.parentNode.remove();
//             }
//         }
//     }
// }

function addTaskInProject(e) {
    if (e.target.matches('.add-task-in-project')) {
        const project = e.target.parentNode.querySelector('p').textContent;
        buttonSubmitTaskInProject.addEventListener('click', e => submitTaskViaProject(e, project));
        // const project = e.target.parentNode.querySelector('p').textContent;
        console.log(project);
        taskInProjectDialog.showModal();
        // buttonSubmitTask.removeEventListener('click', e => submitTask(e));
        // buttonSubmitTask.addEventListener('click', e => submitTask(e, project));
    }
}

function deleteProject(e) {
    if (e.target.matches('.trash-project')) {
        const targetP = e.target.parentNode.querySelector('p').textContent;
        for (let project in toDoList) {
            if (targetP === project) {
                delete toDoList[project];
                e.target.parentNode.remove();
            }
        }
    }
}

const buttonSubmitTask = document.querySelector('.submit-task');
const buttonSubmitProject = document.querySelector('.submit-project');
const buttonCancelTaskDialog = document.querySelector('.close-task');
const buttonCancelProjectDialog = document.querySelector('.close-project');
const taskForm = document.querySelector('#new-task-form');
const projectForm = document.querySelector('#new-project-form');
const buttonAddTask = document.querySelector('.add-task');
const buttonAddProject = document.querySelector('.add-project');
const taskDialog = document.querySelector('#new-task');
const projectDialog = document.querySelector('#new-project');
const dialogs = document.querySelectorAll('dialog');

const buttonSubmitTaskInProject = document.querySelector('.submit-task-in-project');
const taskInProjectForm = document.querySelector('#new-task-in-project-form');
const taskInProjectDialog = document.querySelector('#new-task-in-project');
document.addEventListener('click', e => addTaskInProject(e));


document.addEventListener('click', e => deleteTask(e));
document.addEventListener('click', e => deleteProject(e));
// document.addEventListener('click', e => editProject(e));
// document.addEventListener('click', e => editTask(e));


buttonAddTask.addEventListener('click', () => taskDialog.showModal());
buttonAddProject.addEventListener('click', () => projectDialog.showModal());

buttonSubmitProject.addEventListener('click', e => submitProject(e));
buttonSubmitTask.addEventListener('click', e => submitTask(e));
buttonCancelTaskDialog.addEventListener('click', () => taskDialog.close());
buttonCancelProjectDialog.addEventListener('click', () => projectDialog.close());

taskForm.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitTask(e);
})
projectForm.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitProject(e);
})

dialogs.forEach(dialog => dialog.addEventListener('click', e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
}))

showAllProjects();
showAllTasks();




// const myTask = new Task(
//     'Shave beaver',
//     '31.2.2028',
//     '25:61',
//     'ou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeah',
//     'medium'
// );

// myTask.addToDoList();

// myTask.addToDoList('Some project');