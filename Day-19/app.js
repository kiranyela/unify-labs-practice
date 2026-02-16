/**
 * Interactive Task Dashboard Logic
 * Handles adding, toggling, and deleting tasks.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements selection
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Error handling check: Ensure elements exist before attaching listeners
    if (!taskInput || !addTaskBtn || !taskList) {
        console.error("Critical DOM elements missing. Check HTML IDs.");
        return;
    }

    /**
     * Creates a new task element and appends it to the DOM.
     * @param {string} text - The task description
     */
    function createTaskElement(text) {
        // Create the list item container
        const li = document.createElement('li');
        li.className = 'task-item';

        // Create the text span (separate from button for clearer clicking area)
        const span = document.createElement('span');
        span.textContent = text;
        span.className = 'task-text';
        
        // Event: Toggle 'completed' state on click
        span.addEventListener('click', () => {
            li.classList.toggle('task-completed');
        });

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('aria-label', `Delete task: ${text}`);

        // Event: Remove item from DOM on click
        deleteBtn.addEventListener('click', (e) => {
            // Stop propagation to prevent triggering the toggle event on the parent
            e.stopPropagation(); 
            taskList.removeChild(li);
        });

        // Assemble the element
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    /**
     * Handler for adding a new task
     */
    function handleAddTask() {
        const taskValue = taskInput.value.trim();

        if (taskValue === "") {
            alert("Please enter a valid task.");
            return;
        }

        const newTaskElement = createTaskElement(taskValue);
        taskList.appendChild(newTaskElement);

        // Clear input and refocus for better UX
        taskInput.value = "";
        taskInput.focus();
    }

    // Attach Main Listeners
    addTaskBtn.addEventListener('click', handleAddTask);

    // Allow pressing "Enter" to add task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
});