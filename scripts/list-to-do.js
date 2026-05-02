const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const timeInput = document.getElementById("time-input");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const todayText = document.getElementById("today");
const weatherText = document.getElementById("weather-text");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

let todos = JSON.parse(localStorage.getItem("planner_tasks")) || [];

function showToday() {
    const today = new Date();
    todayText.textContent = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`;

    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Weather request failed");
            }
            return response.json();
        })
        .then(function (data) {
            if (!data.current_weather) {
                throw new Error("Weather data missing");
            }

            const temp = data.current_weather.temperature;
                        weatherText.textContent = `Weather: ${temp}\u00B0C`;
        })
        .catch(function () {
            weatherText.textContent = "Weather: unavailable";
        });
}

function showWeather() {
    if (!navigator.geolocation) {
        fetchWeather(33.5731, -7.5898);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon);
        },
        function () {
            fetchWeather(33.5731, -7.5898);
        }
    );
}

function saveTodos() {
    localStorage.setItem("planner_tasks", JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = "";
    todos.sort(function (a, b) {
        return a.time.localeCompare(b.time);
    });

    if (todos.length === 0) {
        emptyState.classList.remove("hidden");
        updateProgress();
        return;
    }

    emptyState.classList.add("hidden");

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        const textBox = document.createElement("div");
        textBox.className = `todo-text ${todo.done ? "done" : ""}`;

        const title = document.createElement("strong");
        title.textContent = todo.task;

        const time = document.createElement("div");
        time.className = "todo-time";
        time.textContent = todo.time || "No time";

        const actions = document.createElement("div");
        actions.className = "todo-actions";

        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.textContent = "Done";
        doneButton.className = "btn-done";
        doneButton.addEventListener("click", function () {
            setTodoDone(index, true);
        });

        const notDoneButton = document.createElement("button");
        notDoneButton.type = "button";
        notDoneButton.textContent = "Not Done";
        notDoneButton.className = "btn-not-done";
        notDoneButton.addEventListener("click", function () {
            setTodoDone(index, false);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn-delete";
        deleteButton.addEventListener("click", function () {
            deleteTodo(index);
        });

        textBox.appendChild(title);
        textBox.appendChild(time);
        actions.appendChild(doneButton);
        actions.appendChild(notDoneButton);
        actions.appendChild(deleteButton);
        li.appendChild(textBox);
        li.appendChild(actions);

        todoList.appendChild(li);
    });

    updateProgress();
}

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

function addTodo(event) {
    event.preventDefault();

    const task = taskInput.value.trim();
    const time = timeInput.value || getCurrentTime();

    if (task === "") {
        return;
    }

    todos.push({
        task,
        time,
        done: false
    });

    saveTodos();
    renderTodos();
    form.reset();
}

function setTodoDone(index, isDone) {
    todos[index].done = isDone;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function updateProgress() {
    if (todos.length === 0) {
        progressText.textContent = "0% completed";
        progressFill.style.width = "0%";
        return;
    }

    const doneCount = todos.filter(function (todo) {
        return todo.done;
    }).length;
    const percent = Math.round((doneCount / todos.length) * 100);

    progressText.textContent = `${percent}% completed`;
    progressFill.style.width = `${percent}%`;
}

form.addEventListener("submit", addTodo);

showToday();
showWeather();
renderTodos();

