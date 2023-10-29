let toDoList = {
    "Home Tasks": [
        {
        task : 'Blink',
        date : '2023-10-25',
        time : '11:11',
        notes : 'just blink',
        priority : 'high',
        completed: false
        },
        {
        task : 'Do a flip',
        date : '2023-10-26',
        time : '22:22',
        notes : 'do not hurt yourself',
        priority : 'medium',
        completed: false
        },
        {
        task : 'Look out of the window',
        date : '2023-10-28',
        time : '18:33',
        notes : 'ou yeah',
        priority : 'low',
        completed: false
        },
        {
        task : 'Completed task',
        date : '2023-10-31',
        time : '15:44',
        notes : 'finished',
        priority : 'low',
        completed: true
        }
    ],
    "Chores": [
        {
        task : 'do the dishes',
        date : '2023-10-28',
        time : '12:00',
        notes : 'use water',
        priority : 'low',
        completed: false
        },
        {
        task : 'dust the ceilings',
        date : '2023-10-29',
        time : '08:00',
        notes : 'do not jump',
        priority : 'medium',
        completed: false
        },
        {
        task : 'balance all the leafs',
        date : '2023-10-30',
        time : '11:00',
        notes : 'only the green ones',
        priority : 'high',
        completed: false
        }
    ],
    "Work": [
        {
        task : 'work a lot',
        date : '2023-11-04',
        time : '22:00',
        notes : 'no notes',
        priority : 'medium',
        completed: false
        },
        {
        task : 'go to work',
        date : '2023-11-03',
        time : '09:00',
        notes : 'a lot of notes',
        priority : 'high',
        completed: false
        }
    ],
    "Sleep": [
        {
        task : 'go to bed',
        date : '2023-11-02',
        time : '22:00',
        notes : 'no notes',
        priority : 'high',
        completed: false
        }
    ],
}

if (!localStorage.getItem('toDoList')) {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
} else {
    toDoList = JSON.parse(localStorage.getItem('toDoList'));
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

function showAllTasks() {
    Object.values(toDoList).flat().filter((task) => (!task.completed)).map((task) => showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed));
    // SAME AS
    // Object.values(toDoList).flat().forEach((task) => {
    //     if (!task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    // })
    // OR
    // Object.keys(toDoList).forEach((project) => toDoList[project].forEach((task) => {
    //     if (!task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    // }))
    // OR
    // for (let project in toDoList) {
    //     for (let task of toDoList[project]) {
    //         if (!task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    //     }
    // }
}

function showTasks(project = 'Home Tasks') {
    clearAllTasks();
    if (project === 'Home Tasks') {
        showAllTasks();
    } else {
        toDoList[project].filter((task) => (!task.completed)).map((task) => showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed));
        // SAME AS
        // toDoList[project].forEach((task) => {
        //     if (!task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
        // })
        // OR
        // for (let task of toDoList[project]) { 
        //     if (!task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
        // }
    }
}

function clearAllTasks() {
    const allTasks = document.querySelectorAll('.added-task');
    allTasks.forEach(element => element.remove());
}

function showATask(task, date, time, notes, priority, completed = false) {
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
    labelBox.setAttribute('data-priority', priority)
    taskName.setAttribute('class', 'task-name');
    taskDate.setAttribute('class', 'task-date');
    taskTime.setAttribute('class', 'task-time');
    taskNotes.setAttribute('class', 'task-notes');
    imgTrash.setAttribute('class', 'trash-task');

    if (completed) {
        addedTask.classList.add('completed');
        addedTask.setAttribute('data-completed', completed);
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
        showTasks(targetProject);
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

        Object.keys(toDoList).forEach((project) => toDoList[project].filter((task) => (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes)).map((task) => {
            toDoList[project].splice([toDoList[project].indexOf(task)], 1);
                e.target.parentNode.remove();
        }))
        // SAME AS
        // Object.keys(toDoList).forEach((project) => toDoList[project].forEach((task) => {
        //     if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
        //         toDoList[project].splice([toDoList[project].indexOf(task)],1);
        //         e.target.parentNode.remove();
        //     }
        // }))
        // OR
        // for (let project in toDoList) {
        //     for (let i = 0; i < toDoList[project].length; i++) {
        //         if (targetTitle === toDoList[project][i].task && targetDate === toDoList[project][i].date && targetTime === toDoList[project][i].time && targetNotes === toDoList[project][i].notes) {
        //             toDoList[project].splice([i],1);
        //             e.target.parentNode.remove();
        //         }
        //     }
        // }
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
    Object.keys(toDoList).forEach((project) => {
        if (project !== 'Home Tasks') showProject(project);
    })
    //SAME AS
    // for (let project in toDoList) {
    //     if (project !== 'Home Tasks') {
    //         showProject(project);
    //     }
    // }
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
        Object.keys(toDoList).forEach((project) => {
            if (targetP === project) {
                delete toDoList[project];
                e.target.parentNode.remove();
            }
        })
        // SAME AS
        // for (let project in toDoList) {
        //     if (targetP === project) {
        //         delete toDoList[project];
        //         e.target.parentNode.remove();
        //     }
        // }
    }
}

function switchProjects(e) {
    if (e.target.matches('.project')) {
        showTasks(e.target.parentNode.querySelector('p').textContent);
    } else if (e.target.matches('.all-tasks')) {
        showTasks();
    }
}

function markIncomplete(e) {
    const targetTitle = e.target.parentNode.parentNode.querySelector('strong').textContent;
    const targetDate = e.target.parentNode.parentNode.querySelector('.task-date').textContent;
    const targetTime = e.target.parentNode.parentNode.querySelector('.task-time').textContent;
    const targetNotes = e.target.parentNode.parentNode.querySelector('.task-notes').textContent;

    e.target.parentNode.parentNode.classList.remove('completed');
    e.target.parentNode.parentNode.removeAttribute('data-completed');

    Object.values(toDoList).flat().forEach((task) => {
        if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
            task.completed = false;
        }
    })
    // SAME AS
    // Object.keys(toDoList).forEach((project) => toDoList[project].forEach((task) => {
    //     if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
    //         task.completed = false;
    //     }
    // }))

    // SAME AS
    // for (let project in toDoList) {
    //     for (let task of toDoList[project]) {
    //         if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
    //             task.completed = false;
    //         }
    //     }
    // }
}

function markCompleted(e) {
    const targetTitle = e.target.parentNode.parentNode.querySelector('strong').textContent;
    const targetDate = e.target.parentNode.parentNode.querySelector('.task-date').textContent;
    const targetTime = e.target.parentNode.parentNode.querySelector('.task-time').textContent;
    const targetNotes = e.target.parentNode.parentNode.querySelector('.task-notes').textContent;

    e.target.parentNode.parentNode.classList.add('completed');
    e.target.parentNode.parentNode.setAttribute('data-completed', true);

    Object.values(toDoList).flat().forEach((task) => {
        if (targetTitle === task.task && targetDate === task.date && targetTime === task.time && targetNotes === task.notes) {
            task.completed = true;
        }
    })
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
    Object.values(toDoList).flat().forEach((task) => {
        if (task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    })
    // SAME AS
    // for (let project in toDoList) {
    //     for (let task of toDoList[project]) {
    //         if (task.completed) showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    //     }
    // }
}

function getCurrentTasks() {
    const currentTasks = [];
    const allAddedTasks = document.querySelectorAll('.added-task');
    allAddedTasks.forEach(element => {
        const task = element.querySelector('.task-name').textContent;
        const date = element.querySelector('.task-date').textContent;
        const time = element.querySelector('.task-time').textContent;
        const notes = element.querySelector('.task-notes').textContent;
        const priority = element.querySelector('.label-box').dataset.priority;
        const completed = element.dataset.completed;
        currentTasks.push({task, date, time, notes, priority, completed});
    })
    return currentTasks;
}

function showCurrentTasks(currentTasks) {
    currentTasks.forEach((task) => showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed));
    // SAME AS
    // for (let task of currentTasks) { 
    //     showATask(task.task, task.date, task.time, task.notes, task.priority, task.completed);
    // }
}

function sortCurrentTasks(currentTasks, parameter) {
    currentTasks.sort((key1, key2) => {
        const parameterName1 = key1[parameter].toLowerCase();
        const parameterName2 = key2[parameter].toLowerCase();
        if (parameterName1 < parameterName2) return -1;
        if (parameterName1 > parameterName2) return 1;
        return 0;
    });
}

function orderByTask() {
    const currentTasks = getCurrentTasks();
    clearAllTasks();
    sortCurrentTasks(currentTasks, 'task');
    showCurrentTasks(currentTasks);
}

function orderByDate() {
    const currentTasks = getCurrentTasks();
    clearAllTasks();
    sortCurrentTasks(currentTasks, 'date');
    showCurrentTasks(currentTasks);
}

function orderByTime() {
    const currentTasks = getCurrentTasks();
    clearAllTasks();
    sortCurrentTasks(currentTasks, 'time');
    showCurrentTasks(currentTasks);
}

function orderByNotes() {
    const currentTasks = getCurrentTasks();
    clearAllTasks();
    sortCurrentTasks(currentTasks, 'notes');
    showCurrentTasks(currentTasks);
}

function orderByPriority() {
    const currentTasks = getCurrentTasks();
    clearAllTasks();
    currentTasks.sort((priority1, priority2) => {
        const parameterName1 = refactorPriority(priority1.priority);
        const parameterName2 = refactorPriority(priority2.priority);
        if (parameterName1 < parameterName2) return -1;
        if (parameterName1 > parameterName2) return 1;
        return 0;
    });
    showCurrentTasks(currentTasks);
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

function saveToLocalStorage() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function showTodaysTasks() {
    showTasks();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    const allDates = document.querySelectorAll('.added-task');
    allDates.forEach(element => {
        const date = element.querySelector('.task-date').textContent;
        if (currentDate !== date) {
            element.remove();
        }
    })
}

function showWeeksTasks() {
    showTasks();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const startDate = `${year}-${month}-${day}`;

    const newDate = new Date(today);
    newDate.setDate(today.getDate() + 7);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, '0');
    const newDay = String(newDate.getDate()).padStart(2, '0');
    const endDate = `${newYear}-${newMonth}-${newDay}`;

    const allDates = document.querySelectorAll('.added-task');
    allDates.forEach(element => {
        const date = element.querySelector('.task-date').textContent;
        if (startDate >= date || endDate < date) {
            element.remove();
        }
    })
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
const buttonToday = document.querySelector('.today');
const buttonWeek = document.querySelector('.week');
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
document.addEventListener('click', saveToLocalStorage);

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
buttonToday.addEventListener('click', showTodaysTasks);
buttonWeek.addEventListener('click', showWeeksTasks);

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
    buttonMenuHide.style.marginLeft = '-130px';
    buttonMenuOpen.style.marginLeft = '-130px';
    setTimeout(() => {
        buttonMenuHide.style.display = 'none';
        buttonMenuOpen.style.display = 'block';
    }, 500)
})

buttonMenuOpen.addEventListener('click', () => {
    navbar.style.width = '15vw';
    navbar.style.marginLeft = '0px';
    container.style.gridTemplateColumns = 'calc(15vw + 40px) auto calc(15vw + 40px)';
    buttonMenuHide.style.marginLeft = '0';
    buttonMenuOpen.style.marginLeft = '0';
    setTimeout(() => {
        buttonMenuOpen.style.display = 'none';
        buttonMenuHide.style.display = 'block';
    }, 500)
    
})

showAllProjects();
showTasks();
