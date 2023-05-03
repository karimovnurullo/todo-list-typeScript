var form = document.querySelector('.form');
var addBtn = document.querySelector('.form-top-add-btn');
var input = document.querySelector('.form-top-input');
var list = document.querySelector('.form-bottom');
var clearBtn = document.querySelector('.clear-bnt');
var count = document.querySelector('.count');
var elements = document.querySelectorAll('.form-bottom-item');
var id = 0;
var tasks = loadTasks();
tasks.forEach(function (task) { return addListitem(task); });
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) === "" || (input === null || input === void 0 ? void 0 : input.value) === null)
        return;
    var newTask = {
        id: ++id,
        title: input.value,
        complated: false,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTask();
    addListitem(newTask);
    input.value = "";
});
clearBtn.textContent = "Clear All";
clearBtn.addEventListener('click', clearAllTasks);
// function clearAllTasks() {
//    setInterval(() => {
//       tasks.splice(0, tasks.length);
//       saveTask();
//     }, 1000);
// }
function clearAllTasks() {
    var tasksElements = document.querySelectorAll(".form-bottom-item");
    var _loop_1 = function (i) {
        setTimeout(function () {
            var currentTaskElement = tasksElements[i];
            currentTaskElement.classList.add("animate__bounceOut");
            setTimeout(function () {
                currentTaskElement.remove();
                saveTask();
            }, 1000);
        }, i * 250);
    };
    for (var i = 0; i < tasks.length; i++) {
        _loop_1(i);
    }
    setTimeout(function () {
        tasks = [];
        saveTask();
    }, tasks.length * 250);
}
function addListitem(task) {
    count.textContent = tasks.length.toString();
    var label = document.createElement("label");
    var text = document.createElement("p");
    var checkbox = document.createElement("input");
    var deleteBtn = document.createElement("button");
    var settings = document.createElement("div");
    var editBtn = document.createElement("button");
    var alertDiv = document.createElement("div");
    var alertButtonDiv = document.createElement("div");
    var alertText = document.createTextNode("Are you sure you want to delete this task?");
    var noBtn = document.createElement("button");
    alertButtonDiv.className = "alert-buttons";
    label.classList.add("form-bottom-item", "animate__animated", "animate__bounceIn");
    setTimeout(function () {
        label.classList.remove("animate__bounceIn");
    }, 1000);
    noBtn.textContent = "No";
    noBtn.className = "noBtn";
    var confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Confirm";
    confirmBtn.className = "confirmBtn";
    alertButtonDiv.append(noBtn, confirmBtn);
    alertDiv.append(alertText, alertButtonDiv);
    alertDiv.className = "alert";
    settings.className = "settings";
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "deleteBtn";
    checkbox.type = "checkbox";
    checkbox.checked = task.complated;
    checkbox.className = "checkbox";
    text.className = "text";
    text.textContent = task.title;
    if (task.complated) {
        label.classList.add('completed');
    }
    deleteBtn.addEventListener("click", function () {
        alertDiv.classList.add("show");
        confirmBtn.addEventListener("click", function () {
            var index = tasks.findIndex(function (labelTask) { return labelTask.id === task.id; });
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTask();
                label.classList.add("animate__bounceOut");
                setTimeout(function () {
                    label.classList.remove("animate__bounceOut");
                    label.remove();
                }, 1000);
            }
            alertDiv.classList.remove("show");
        });
        noBtn.addEventListener("click", function () {
            alertDiv.classList.remove("show");
        });
    });
    editBtn.textContent = "Edit";
    editBtn.className = "editBtn";
    editBtn.addEventListener("click", function () {
        var inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = task.title;
        inputField.className = "edit-input";
        text.replaceWith(inputField);
        inputField.focus();
        inputField.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                task.title = inputField.value;
                saveTask();
                text.textContent = task.title;
                inputField.replaceWith(text);
            }
        });
    });
    checkbox.addEventListener('change', function () {
        if (task.complated === true) {
            task.complated = false;
            label.classList.remove('completed');
            saveTask();
        }
        else {
            task.complated = true;
            label.classList.add('completed');
            saveTask();
        }
    });
    settings.append(editBtn, deleteBtn);
    label.append(checkbox, text, settings, alertDiv);
    list === null || list === void 0 ? void 0 : list.appendChild(label);
}
function saveTask() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function loadTasks() {
    var taskJson = localStorage.getItem('TASKS');
    if (!taskJson) {
        return [];
    }
    return JSON.parse(taskJson);
}
