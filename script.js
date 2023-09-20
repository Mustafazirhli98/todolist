let taskInput = document.querySelector("#task");
let taskList = document.querySelector("#list");

let taskArray = [];

const newElement = () => {
  taskList.innerHTML = "";
  for (let task of taskArray) {
    let newTask = `<li class="${task.taskState}" id="${task.taskId}">
                    ${task.taskName}
                    <div class="list-element">
                    <input type="checkbox" class="task-checkbox" ${task.taskState === "completed" ? "checked" : ""} onclick="toggleTaskState(this)" />
                    <i onclick="removeTask(${task.taskId})" class="fa-solid fa-trash"></i>
                    </div>
                </li>`;
    //  newTask adında bir değişkenin içinde li elementi oluşturuyorum ve input'tan gelen değeri veriyorum hemen yanında çöp kutusu icon mevcut. Buradan eleman sileceğiz.

    taskList.insertAdjacentHTML("beforeend", newTask);
    // Bu metot ile newElement fonksiyonu çalıştığında ul'nin en son elemanı olarak newTask değişkenini ekliyorum.
  }
};

const removeTask = (id) => {
  taskArray = taskArray.filter((task) => task.taskId !== id);
  newElement();
};
const newTask = () => {
  let toastSuccess = document.querySelector(".toast.success");
  let showToastSuccess = new bootstrap.Toast(toastSuccess);
  let toastError = document.querySelector(".toast.error");
  let showToastError = new bootstrap.Toast(toastError);
  // yukarıdaki tanımlamalar success toast ve error toast'ın classname'leri ile yapıldı.
  //show kelimesi ile başlayan tanımlamalarda ise bir javascript metodu çağırılmakta. bu metodun içinde classları ile tanımlanan HTML elementleri mevcut. Aşağıda ise gereklilik durumlarına göre işlenmekteler.

  const taskName = taskInput.value.trim(); //burada trim() metodu baştaki ve sondaki boşlukları temizler.
  if (taskName != "") {
    showToastError.hide()
    showToastSuccess.show()
    taskArray.push({ taskName: taskInput.value, taskId: taskArray.length + 1, taskState: "waiting" });
    taskInput.value = "";
    newElement();

  } else {
    showToastSuccess.hide()
    showToastError.show()
  }
};

const toggleTaskState = (checkbox) => {

let taskId = checkbox.parentElement.parentElement.id;
let taskIndex = taskArray.findIndex((task) => task.taskId === parseInt(taskId));

if(taskIndex !== -1) {
  if(checkbox.checked) {
    taskArray[taskIndex].taskState = "completed"
  } else {
    taskArray[taskIndex].taskState = "waiting"
  }
  newElement()
}
}
