const form = document.querySelector('.form') as HTMLFormElement;
const addBtn = document.querySelector('.form-top-add-btn') as HTMLButtonElement;
const input = document.querySelector('.form-top-input') as HTMLInputElement;
const list = document.querySelector('.form-bottom') as HTMLDivElement;
const clearBtn = document.querySelector('.clear-bnt') as HTMLButtonElement;
const count = document.querySelector('.count') as HTMLElement;
const elements = document.querySelectorAll('.form-bottom-item');
type Task = {
   id: number,
   title: string,
   complated: boolean,
   createdAt: Date,
}

let id: number = 0;

let tasks: Task[] = loadTasks();
tasks.forEach(task => addListitem(task));

form?.addEventListener('submit', e => {
   e.preventDefault();
   if (input?.value === "" || input?.value === null) return;

   const newTask = {
      id: ++id,
      title: input.value,
      complated: false,
      createdAt: new Date(),
   }
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
function clearAllTasks(): void {
   const tasksElements = document.querySelectorAll(".form-bottom-item");
   for (let i = 0; i < tasks.length; i++) {
     setTimeout(() => {
       const currentTaskElement = tasksElements[i];
       currentTaskElement.classList.add("animate__bounceOut");
       setTimeout(() => {
         currentTaskElement.remove();
         saveTask();
       }, 1000);
     }, i * 250);
   }
   setTimeout(() => {
     tasks = [];
     saveTask();
   }, tasks.length * 250);
 }

function addListitem(task: Task) {
   count.textContent = tasks.length.toString();

   const label = document.createElement("label");

   const text = document.createElement("p");
   const checkbox = document.createElement("input");
   const deleteBtn = document.createElement("button");
   const settings = document.createElement("div");
   const editBtn = document.createElement("button");
   const alertDiv = document.createElement("div");
   const alertButtonDiv = document.createElement("div");
   const alertText = document.createTextNode("Are you sure you want to delete this task?");
   const noBtn = document.createElement("button");
   alertButtonDiv.className = "alert-buttons";
   label.classList.add("form-bottom-item", "animate__animated", "animate__bounceIn");
   setTimeout(() => {
      label.classList.remove("animate__bounceIn");
   }, 1000);
   noBtn.textContent = "No";
   noBtn.className = "noBtn";
   const confirmBtn = document.createElement("button");
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
   deleteBtn.addEventListener("click", () => {
      alertDiv.classList.add("show");

      confirmBtn.addEventListener("click", () => {
         const index = tasks.findIndex(labelTask => labelTask.id === task.id);
         if (index !== -1) {
            tasks.splice(index, 1);
            saveTask();
            label.classList.add("animate__bounceOut");
            setTimeout(() => {
               label.classList.remove("animate__bounceOut");
               label.remove();
            }, 1000);
         }
         alertDiv.classList.remove("show");
      });

      noBtn.addEventListener("click", () => {
         alertDiv.classList.remove("show");
      });
   });


   editBtn.textContent = "Edit";
   editBtn.className = "editBtn";

   editBtn.addEventListener("click", () => {
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = task.title;
      inputField.className = "edit-input";
      text.replaceWith(inputField);
      inputField.focus();

      inputField.addEventListener("keydown", (e) => {
         if (e.key === "Enter") {
            task.title = inputField.value;
            saveTask();
            text.textContent = task.title;
            inputField.replaceWith(text);
         }
      });
   });


   checkbox.addEventListener('change', () => {
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
   })
   settings.append(editBtn, deleteBtn);
   label.append(checkbox, text, settings, alertDiv);
   list?.appendChild(label);
}

function saveTask() {
   localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function loadTasks(): Task[] {
   const taskJson = localStorage.getItem('TASKS');
   if (!taskJson) { return []; }
   return JSON.parse(taskJson);
}
