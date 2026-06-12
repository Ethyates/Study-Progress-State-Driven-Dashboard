# Study Progress Dashboard

## Description

The Study Progress Dashboard is a state-driven web application designed to help students organize study tasks, track progress, manage notes, and monitor recent activity. The application demonstrates JavaScript state management by updating the user interface whenever the underlying data changes.

## Features

* Add study tasks
* Delete study tasks
* Mark tasks as complete or incomplete
* Filter tasks by category
* View study statistics
* Dynamic progress bar
* Add and delete study notes
* Recent activity tracking
* Light and dark theme toggle
* Dashboard reset functionality
* Input validation to prevent blank submissions

## Technologies Used

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* Event Listeners
* State-Driven Rendering

## Project Structure

```txt
study-progress-dashboard/
├── index.html
├── style.css
└── script.js
```

## How to Run

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

Alternatively, visit the deployed GitHub Pages site.

## Data Structure

The application stores all dashboard information inside a central JavaScript state object.

Example:

```javascript
const dashboardState = {
    tasks: [],
    notes: [],
    activity: [],
    selectedCategory: "all",
    theme: "light",
    nextTaskId: 1,
    nextNoteId: 1
};
```

Task information includes:

* Task ID
* Task Name
* Category
* Priority
* Completion Status

Notes and activity entries are also stored within the state object and rendered dynamically.

## Future Improvements

* Save data using localStorage
* Edit existing tasks
* Edit existing notes
* Sort tasks by priority
* Search functionality
* Multiple dashboard themes

## Author

Ethan Yates

Lake Land College
