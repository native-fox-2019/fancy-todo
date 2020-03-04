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
        let status = null;
        if (x.status) {
            status = 'Done';
        } else {
            status = 'On Going';
        }
        $('#todoList').append(`<tr>
                            <td>${x.title}</td>
                            <td>${x.description}</td>
                            <td>${x.due_date}</td>
                            <td>${status}</td>
                            <td><button onclick="editTodo(${x.id})">Edit</button> | <button onclick="deleteTodo(${x.id})">Delete</button></td>
                        </tr>`)
    })
}

function editForm(data) {
    $('#edit-todo-title').val(data.title);
    $('#edit-todo-description').val(data.description);
    $('#edit-todo-due-date').val(data.due_date);
    $('#edit-status').empty();
    if (data.status) {
        $('#edit-status').append(`<label>Status:</label>
        <select id="edit-todo-status">
            <option value="true" selected>Done</option>
            <option value="false">On Going</option>
        </select>`)
    } else {
        $('#edit-status').append(`<label>Status:</label>
        <select id="edit-todo-status">
            <option value="true">Done</option>
            <option value="false" selected>On Going</option>
        </select>`)
    }
    $('#submit-edit').val(data.id);
    setPage('edit');
}