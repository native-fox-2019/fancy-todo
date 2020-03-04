function showTodos() {
    if (localStorage.getItem('token')) {
        $('#todoList').empty();
        getUserTodos();
    } else {
        setPage('login');
    }
}

function setAllTodos(data) {
    data.forEach(x => {
        $('#todoList').append(`<tr>
                            <td>${x.title}</td>
                            <td>${x.description}</td>
                            <td>${x.due_date}</td>
                            <td><button onclick="editTodo(${x.id})">Edit</button> | <button onclick="deleteTodo(${x.id})">Delete</button></td>
                        </tr>`)
    })
}

function editForm(data) {
    $('#edit-todo-title').val(data.title);
    $('#edit-todo-description').val(data.description);
    $('#edit-todo-due-date').val(data.due_date);
    $('#submit-edit').val(data.id);
    setPage('edit');
}