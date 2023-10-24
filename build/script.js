const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class="task bg-light pt-2 pb-2 ps-3 pe-3 rounded-2 align-items-center">
    <input type="checkbox" class="task-check">
    <span class="taskname fw-light">${taskName}</span>
    <button class="edit text-light w-100 rounded-1 border-0 pt-2 pb-2 ps-3 pe-3">
        EDIT
    </button>
    <button class="delete text-light w-100 rounded-1 border-0 pt-2 pb-2 ps-3 pe-3">
        DEL
    </button>
</div>`; 

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            all_selected = button.every(checkBox => checkBox.checked);
            if(all_selected) {
                taskCount = 0;
            }else {
                taskCount -= 1;
            }
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className !== "edit")) {
                targetElement = e.target.parentElement;
            }

            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onChange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;
            }else {
                taskCount += 1;
            }

            displayCount(taskCount);
        };
    }); 

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
}

addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};