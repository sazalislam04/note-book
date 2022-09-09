const getElement = (id)=> {
    const element = document.getElementById(id);
    return element;
}

const addTodo = () => {
    const todoText = getElement('todo-input').value;
    const todoTextArea = getElement('todo-text').value;
    getElement('todo-input').value = '';
    getElement('todo-text').value = '';
    const todos = JSON.parse(localStorage.getItem("todos"))
    const errorText = getElement('error-text')
    if(todoText === '' || todoTextArea === ''){
        errorText.classList.remove("d-none")
    } else{
        errorText.classList.add("d-none");
        if(!todos){
            const todoList = [
                {
                    title: todoText,
                    text: todoTextArea,
                }
            ]
            localStorage.setItem("todos", JSON.stringify(todoList))
        } else {
            const todoList = [
                ...todos,
                {
                    title: todoText,
                    text: todoTextArea,
                }
            ]
            localStorage.setItem("todos", JSON.stringify(todoList))
            
        }
    
        displayTodo()
        
    }

}

const displayTodo = () => {
    const todoItems = getElement('todo-list')
    const clearBtn = getElement('clear-btn')
    todoItems.innerHTML = ''
    const todos = JSON.parse(localStorage.getItem("todos"))
    clearBtn.classList.add('d-none')
   todos.forEach((todo) => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("col")
        todoDiv.innerHTML = `
        <div class="card border-primary">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${todo.title}</h5>
          <p class="card-text">${todo.text}</p>
        </div>
      </div>
        `;
        todoItems.appendChild(todoDiv)
        clearBtn.classList.remove('d-none')
   });
}


const clearAll = () => {
    localStorage.removeItem('todos');
    displayTodo();
}

displayTodo();