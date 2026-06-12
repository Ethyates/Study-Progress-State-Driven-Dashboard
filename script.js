// =====================
// STATE
// =====================

const dashboardState = {
    tasks: [],
    notes: [],
    activity: [],
    selectedCategory: "all",
    theme: "light",
    nextTaskId: 1,
    nextNoteId: 1
};

// =====================
// DOM ELEMENTS
// =====================

const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const pendingTasksEl = document.getElementById("pendingTasks");
const completionPercentEl = document.getElementById("completionPercent");
const progressFillEl = document.getElementById("progressFill");

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const taskMessage = document.getElementById("taskMessage");

const taskList = document.getElementById("taskList");
const filterInput = document.getElementById("filterInput");

const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const noteMessage = document.getElementById("noteMessage");
const noteList = document.getElementById("noteList");

const activityList = document.getElementById("activityList");

const themeToggleBtn = document.getElementById("themeToggleBtn");
const resetBtn = document.getElementById("resetBtn");

// =====================
// RENDER FUNCTIONS
// =====================

function renderStats() {
    const totalTasks = dashboardState.tasks.length;
    const completedTasks = dashboardState.tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    let completionPercent = 0;

    if (totalTasks > 0) {
        completionPercent = Math.round((completedTasks / totalTasks) * 100);
    }

    totalTasksEl.textContent = totalTasks;
    completedTasksEl.textContent = completedTasks;
    pendingTasksEl.textContent = pendingTasks;
    completionPercentEl.textContent = `${completionPercent}%`;

    progressFillEl.style.width = `${completionPercent}%`;
}

function renderTasks() {
    taskList.innerHTML = "";

    let tasksToRender = dashboardState.tasks;

    if (dashboardState.selectedCategory !== "all") {
        tasksToRender = dashboardState.tasks.filter(task =>
            task.category === dashboardState.selectedCategory
        );
    }

    tasksToRender.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        li.innerHTML = `
            <div class="task-info">
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

                <small>
                    ${task.category} |
                    <span class="priority-${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>
                </small>
            </div>

            <div>
                <button onclick="toggleTaskComplete(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function renderNotes() {
    noteList.innerHTML = "";

    dashboardState.notes.forEach(note => {
        const li = document.createElement("li");
        li.classList.add("note-item");

        li.innerHTML = `
            <span>${note.text}</span>

            <button onclick="deleteNote(${note.id})">
                Delete
            </button>
        `;

        noteList.appendChild(li);
    });
}

function renderActivity() {
    activityList.innerHTML = "";

    dashboardState.activity.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("activity-item");

        li.textContent = item;

        activityList.appendChild(li);
    });
}

function renderTheme() {
    if (dashboardState.theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

function renderDashboard() {
    renderStats();
    renderTasks();
    renderNotes();
    renderActivity();
    renderTheme();
}

// =====================
// STATE-CHANGING FUNCTIONS
// =====================

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    const category = categoryInput.value;
    const priority = priorityInput.value;

    if (taskText === "" || category === "" || priority === "") {
        taskMessage.textContent = "Please enter a task, category, and priority.";
        return;
    }

    const newTask = {
        id: dashboardState.nextTaskId,
        text: taskText,
        category: category,
        priority: priority,
        completed: false
    };

    dashboardState.tasks.push(newTask);
    dashboardState.nextTaskId++;

    addActivity(`Added task: ${taskText}`);

    taskInput.value = "";
    categoryInput.value = "";
    priorityInput.value = "";
    taskMessage.textContent = "";

    renderDashboard();
}

function deleteTask(taskId) {
    dashboardState.tasks = dashboardState.tasks.filter(task => task.id !== taskId);

    addActivity("Deleted a task.");

    renderDashboard();
}

function toggleTaskComplete(taskId) {
    const task = dashboardState.tasks.find(task => task.id === taskId);

    if (task) {
        task.completed = !task.completed;

        if (task.completed) {
            addActivity(`Completed task: ${task.text}`);
        } else {
            addActivity(`Reopened task: ${task.text}`);
        }
    }

    renderDashboard();
}

function addNote(event) {
    event.preventDefault();

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        noteMessage.textContent = "Please enter a note.";
        return;
    }

    const newNote = {
        id: dashboardState.nextNoteId,
        text: noteText
    };

    dashboardState.notes.push(newNote);
    dashboardState.nextNoteId++;

    addActivity("Added a study note.");

    noteInput.value = "";
    noteMessage.textContent = "";

    renderDashboard();
}

function deleteNote(noteId) {
    dashboardState.notes = dashboardState.notes.filter(note => note.id !== noteId);

    addActivity("Deleted a note.");

    renderDashboard();
}

function addActivity(message) {
    dashboardState.activity.unshift(message);

    if (dashboardState.activity.length > 5) {
        dashboardState.activity.pop();
    }
}

function changeCategoryFilter() {
    dashboardState.selectedCategory = filterInput.value;

    renderDashboard();
}

function toggleTheme() {
    if (dashboardState.theme === "light") {
        dashboardState.theme = "dark";
    } else {
        dashboardState.theme = "light";
    }

    renderDashboard();
}

function resetDashboard() {
    dashboardState.tasks = [];
    dashboardState.notes = [];
    dashboardState.activity = [];
    dashboardState.selectedCategory = "all";
    dashboardState.theme = "light";
    dashboardState.nextTaskId = 1;
    dashboardState.nextNoteId = 1;

    filterInput.value = "all";
    taskMessage.textContent = "";
    noteMessage.textContent = "";

    renderDashboard();
}

// =====================
// EVENT LISTENERS
// =====================

taskForm.addEventListener("submit", addTask);
noteForm.addEventListener("submit", addNote);
filterInput.addEventListener("change", changeCategoryFilter);
themeToggleBtn.addEventListener("click", toggleTheme);
resetBtn.addEventListener("click", resetDashboard);

// =====================
// INITIAL RENDER
// =====================

renderDashboard();