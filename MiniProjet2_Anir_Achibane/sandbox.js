const form = document.getElementById("newTaskInput");
const searchForm = document.getElementById("searchInput");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let list = document.getElementById("list");
    const newTask = document.getElementById("add");

    if (newTask.value === ""){
        return;
    }
    console.log("value : " + newTask.value);
    let taskItem = document.createElement("li");

    taskItem.classList.add("list-group-item", "justify-content-between", "align-items-center");
    taskItem.innerHTML = `<span>${newTask.value}</span> <i class="far fa-trash-alt delete"></i>`;
    
    list.appendChild(taskItem);
    newTask.value = "";

});

list.addEventListener('click', (e)=>{
    if (e.target.classList.contains('delete')){
        const listItem = e.target.closest('li');
        listItem.remove();
    }
});

searchForm.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const tasks = list.querySelectorAll('li');

    tasks.forEach((task) => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchTerm)){
            task.style.display = '';
        }
        else{
            task.style.display = 'none';
        }
    })
})

