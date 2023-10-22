const toDoList = {
    "Home Tasks": [{
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
    ],
    "Some project": [],
    "Some other project": [],
    "Some other project": [],
}

class Task {
    constructor(task, date, time, notes, priority) {
        this.task = task;
        this.date = date;
        this.time = time;
        this.notes = notes;
        this.priority = priority
    }

    addToHome() {
        const toBeAdded = {
            task: this.task,
            date: this.date,
            time: this.time,
            notes: this.notes,
            priority: this.priority,
        }
        toDoList['Home Tasks'].push(toBeAdded);
    }

    addToSomeProject(project) {
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

// const myTask = new Task(
//     'Shave beaver',
//     '31.2.2028',
//     '25:61',
//     'ou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeahou yeah',
//     'medium'
// );

// myTask.addToHome();

// myTask.addToSomeProject('Some project');








const button = document.querySelector('.add-project');
const modal = document.querySelector('#new-project');

button.addEventListener('click', (e) => {
    modal.showModal();
})