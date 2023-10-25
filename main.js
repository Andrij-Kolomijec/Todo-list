const toDoList = {
    "Home Tasks": [{
        task : 'Blink',
        date : '1.1.1111',
        time : '11:11',
        notes : 'just blink',
        priority : 'high',
        completed: false
        }, {
        task : 'Do a flip',
        date : '2.2.2222',
        time : '22:22',
        notes : 'do not hurt yourself',
        priority : 'medium',
        completed: false
        }, {
        task : 'Look out of the window',
        date : '3.3.3333',
        time : '33:33',
        notes : 'ou yeah',
        priority : 'low',
        completed: false
        },
    ],
    "Completed": [{
        task : 'Completed task',
        date : '4.4.4444',
        time : '44:44',
        notes : 'finished',
        priority : 'low',
        completed: true
        }],
    "Chores": [],
    "Work": [],
    "Sleep": [{
        task : 'go to bed',
        date : 'today',
        time : '22:00',
        notes : 'no notes',
        priority : 'high',
        completed: false
        }],
}

class Task {
    constructor(task, date, time, notes, priority, completed = false) {
        this.task = task;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.priority = priority;
        this.completed = completed
    }

    addToDoList(project = 'Home Tasks') {
        const toBeAdded = {
            task: this.task,
            date: this.date,
            time: this.time,
            notes: this.notes,
            priority: this.priority,
            completed: this.completed
        }
        toDoList[project].push(toBeAdded);
    }
}

function showAllTasks(project = 'Home Tasks') {
    clearAllTasks();
    for (let task of toDoList[project]) { 
        showTask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    }
}

function clearAllTasks() {
    const allTasks = document.querySelectorAll('.added-task');
    allTasks.forEach(element => element.remove());
}

function showTask(task, date, time, notes, priority, completed) {
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
    const imgTrash = document.createElement('img');

    addedTask.setAttribute('class', 'added-task');
    checkLabel.setAttribute('class', 'check-label');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'checkbox');
    labelBox.classList.add('label-box', `priority-${priority}`);
    taskName.setAttribute('class', 'task-name');
    taskDate.setAttribute('class', 'task-date');
    taskTime.setAttribute('class', 'task-time');
    taskNotes.setAttribute('class', 'task-notes');
    imgTrash.setAttribute('class', 'trash-task');

    if (completed) {
        addedTask.classList.add('completed');
        checkbox.checked = true;
    } else {
        addedTask.classList.remove('completed');
        checkbox.checked = false;
    }

    imgTrash.src = './icons/trash-can-outline.svg';

    strong.textContent = `${task}`;
    taskDate.textContent = `${date}`;
    taskTime.textContent = `${time}`;
    taskNotes.textContent = `${notes}`;

    taskName.append(strong);
    checkLabel.append(checkbox, labelBox);
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
        createNewTask().addToDoList(targetProject);
        showAllTasks(targetProject);
        taskForm.reset();
        taskDialog.close();
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
    const imgTrash = document.createElement('img');

    imgTask.src = './icons/plus-circle-outline.svg';
    imgTrash.src = './icons/trash-can-outline.svg';

    addedProject.setAttribute('class', 'added-project');
    p.setAttribute('class', 'project');
    imgTask.setAttribute('class', 'add-task-in-project');
    imgTrash.setAttribute('class', 'trash-project');

    p.textContent = `${project}`;

    addedProject.append(p, imgTask, imgTrash);
    projects.append(addedProject);
}

function showAllProjects() {
    clearAllProjects();
    for (let project in toDoList) {
        if (project !== 'Home Tasks' && project !== 'Completed') {
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

function addTaskInProject(e) {
    if (e.target.matches('.add-task-in-project')) {
        targetProject = e.target.parentNode.querySelector('p').textContent;
        taskDialog.showModal();
    }
}

function addTaskInHomeTasks() {
    taskDialog.showModal();
    targetProject = 'Home Tasks';
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

function switchProjects(e) {
    if (e.target.matches('.project')) {
        showAllTasks(e.target.parentNode.querySelector('p').textContent);
    } else if (e.target.matches('.all-tasks')) {
        showAllTasks();
    }
}

function markIncomplete(e) {
    const targetTitle = e.target.parentNode.parentNode.querySelector('strong').textContent;
    const targetDate = e.target.parentNode.parentNode.querySelector('.task-date').textContent;
    const targetTime = e.target.parentNode.parentNode.querySelector('.task-time').textContent;
    const targetNotes = e.target.parentNode.parentNode.querySelector('.task-notes').textContent;

    e.target.parentNode.parentNode.classList.remove('completed');
    for (let project in toDoList) {
        for (let task of toDoList[project]) {
            if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
                task.completed = false;
                if (project === 'Completed') {
                    const newIncompleteTask = new Task(task.task, task.date, task.time, task.notes, task.priority, task.complete);
                    newIncompleteTask.addToDoList('Home Tasks');
                    toDoList['Completed'].splice(toDoList[project].indexOf(task), 1);
                }
            }
        }
    }
}

function markCompleted(e) {
    const targetTitle = e.target.parentNode.parentNode.querySelector('strong').textContent;
    const targetDate = e.target.parentNode.parentNode.querySelector('.task-date').textContent;
    const targetTime = e.target.parentNode.parentNode.querySelector('.task-time').textContent;
    const targetNotes = e.target.parentNode.parentNode.querySelector('.task-notes').textContent;

    e.target.parentNode.parentNode.classList.add('completed');
    for (let project in toDoList) {
        for (let task of toDoList[project]) {
            if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
                task.completed = true;
                if (project === 'Home Tasks') {
                    const newCompletedTask = new Task(task.task, task.date, task.time, task.notes, task.priority, task.complete);
                    newCompletedTask.addToDoList('Completed');
                    toDoList['Home Tasks'].splice(toDoList[project].indexOf(task), 1);
                }
            }
        }
    }
}

function markTask(e) {
    if (e.target.matches('.label-box')) {
        if (e.target.previousElementSibling.checked) {
            markIncomplete(e);
        } else {
            markCompleted(e);
        }
    }
}

function showCompleted() {
    clearAllTasks();
    showAllTasks('Completed');
}

function orderByTask() {
    const project = findOutProject();
    toDoList[project].sort((task1, task2) => {
        const parameterName1 = task1.task.toLowerCase();
        const parameterName2 = task2.task.toLowerCase();
        if (parameterName1 < parameterName2) {
            return -1;
        }
        if (parameterName1 > parameterName2) {
            return 1;
        }
        return 0;
    });
    showAllTasks(project);
}

function orderByDate() {
    const project = findOutProject();
    toDoList[project].sort((date1, date2) => {
        const parameterName1 = date1.date;
        const parameterName2 = date2.date;
        if (parameterName1 < parameterName2) {
            return -1;
        }
        if (parameterName1 > parameterName2) {
            return 1;
        }
        return 0;
    });
    showAllTasks(project);
}

function orderByTime() {
    const project = findOutProject();
    toDoList[project].sort((time1, time2) => {
        const parameterName1 = time1.time;
        const parameterName2 = time2.time;
        if (parameterName1 < parameterName2) {
            return -1;
        }
        if (parameterName1 > parameterName2) {
            return 1;
        }
        return 0;
    });
    showAllTasks(project);
}

function orderByNotes() {
    const project = findOutProject();
    toDoList[project].sort((notes1, notes2) => {
        const parameterName1 = notes1.notes.toLowerCase();
        const parameterName2 = notes2.notes.toLowerCase();
        if (parameterName1 < parameterName2) {
            return -1;
        }
        if (parameterName1 > parameterName2) {
            return 1;
        }
        return 0;
    });
    showAllTasks(project);
}

function orderByPriority() {
    const project = findOutProject();
    toDoList[project].sort((priority1, priority2) => {
        const parameterName1 = refactorPriority(priority1.priority);
        const parameterName2 = refactorPriority(priority2.priority);       
        if (parameterName1 < parameterName2) {
            return -1;
        }
        if (parameterName1 > parameterName2) {
            return 1;
        }
        return 0;
    });
    showAllTasks(project);
}

function refactorPriority(priority) {
    if (priority === 'high') {
        return priority = 1;
    } else if (priority === 'medium') {
        return priority = 2;
    } else if (priority === 'low') {
        return priority = 3;
    }
}

function findOutProject() {
    const allTasksOnPage = document.querySelectorAll('.added-task');
    let projectFound = null;
    allTasksOnPage.forEach(task => {
        const title = task.querySelector('.task-name').textContent;
        const date = task.querySelector('.task-date').textContent;
        const time = task.querySelector('.task-time').textContent;
        const notes = task.querySelector('.task-notes').textContent;
        for (let project in toDoList) {
            for (task of toDoList[project]) {
                if (task.task === title && task.date === date && task.time === time && task.notes === notes) {
                    projectFound = project;
                }
            }
            if (projectFound) break;
        }
    })
    return projectFound; 
}
 
const buttonSubmitTask = document.querySelector('.submit-task');
const buttonSubmitProject = document.querySelector('.submit-project');
const buttonCancelTaskDialog = document.querySelector('.close-task');
const buttonCancelProjectDialog = document.querySelector('.close-project');
const buttonCompleted = document.querySelector('.completed');
const buttonSortByTask = document.querySelector('#sort-by-task');
const buttonSortByDate = document.querySelector('#sort-by-date');
const buttonSortByTime = document.querySelector('#sort-by-time');
const buttonSortByNotes = document.querySelector('#sort-by-notes');
const buttonSortByPriority = document.querySelector('#sort-by-priority');
const taskForm = document.querySelector('#new-task-form');
const projectForm = document.querySelector('#new-project-form');
const buttonAddTask = document.querySelector('.add-task');
const buttonAddProject = document.querySelector('.add-project');
const taskDialog = document.querySelector('#new-task');
const projectDialog = document.querySelector('#new-project');
const dialogs = document.querySelectorAll('dialog');
const buttonMenuHide = document.querySelector('.menu-close');
const buttonMenuOpen = document.querySelector('.menu-open');
const navbar = document.querySelector('#navbar');
const container = document.querySelector('#container');
let targetProject = 'Home Tasks';

document.addEventListener('click', e => addTaskInProject(e));
document.addEventListener('click', e => deleteTask(e));
document.addEventListener('click', e => deleteProject(e));
document.addEventListener('click', e => switchProjects(e));
document.addEventListener('click', e => markTask(e));

buttonSortByTask.addEventListener('click', orderByTask);
buttonSortByDate.addEventListener('click', orderByDate);
buttonSortByTime.addEventListener('click', orderByTime);
buttonSortByNotes.addEventListener('click', orderByNotes);
buttonSortByPriority.addEventListener('click', orderByPriority);
buttonAddTask.addEventListener('click', addTaskInHomeTasks);
buttonAddProject.addEventListener('click', () => projectDialog.showModal());
buttonSubmitProject.addEventListener('click', e => submitProject(e));
buttonSubmitTask.addEventListener('click', e => submitTask(e));
buttonCancelTaskDialog.addEventListener('click', () => taskDialog.close());
buttonCancelProjectDialog.addEventListener('click', () => projectDialog.close());
buttonCompleted.addEventListener('click', showCompleted);

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

buttonMenuHide.addEventListener('click', () => {
    navbar.style.width = '0';
    navbar.style.marginLeft = '-100px';
    container.style.gridTemplateColumns = '0 auto 0';
    buttonMenuHide.style.display = 'none';
    buttonMenuOpen.style.display = 'block';
})

buttonMenuOpen.addEventListener('click', () => {
    navbar.style.width = '15vw';
    navbar.style.marginLeft = '0px';
    container.style.gridTemplateColumns = 'calc(15vw + 40px) auto calc(15vw + 40px)';
    buttonMenuOpen.style.display = 'none';
    buttonMenuHide.style.display = 'block';
})

showAllProjects();
showAllTasks();

// for (let project in toDoList) {
//     console.log(project);
//     for (let task of toDoList[project]) {
//         console.log(task.task, task.date, task.time, task.notes, task.priority, task.completed);
//     }
// }
