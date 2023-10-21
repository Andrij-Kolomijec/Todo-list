let myTasks = [{
    task : 'Shave beaver',
    date : '31.2.2028',
    time : '25:61',
    notes : 'ou yeah',
    priority : 'high'
    }, {
    task : 'Shave beaver',
    date : '31.2.2028',
    time : '25:61',
    notes : 'ou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeah',
    priority : 'medium'
    }, {
    task : 'Shave beaver',
    date : '31.2.2028',
    time : '25:61',
    notes : 'ou yeah',
    priority : 'low'
    },
];

class Task {
    constructor (task, date, time, notes, priority) {
        this.task = task;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.priority = priority
    }

    addToMyTasks () {
        let toBeAdded = {};
        toBeAdded.task = this.task;
        toBeAdded.date = this.date;
        toBeAdded.time = this.time;
        toBeAdded.notes = this.notes;
        toBeAdded.priority = this.priority;
        myTasks.push(toBeAdded);
    }
}

const newTask = new Task('shite', 'today', 'now', 'high');

newTask.addToMyTasks();

console.log(myTasks);


const button = document.querySelector('.add-project');
const modal = document.querySelector('#new-project-task');

button.addEventListener('click', (e) => {
    modal.showModal();
})