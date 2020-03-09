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
                            <td><button onclick="editTodo(${x.id})" class="btn btn-primary">Edit</button>  <button onclick="deleteTodoConfirmation(${x.id})" class="btn btn-primary">Delete</button></td>
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

function errorMessage(err) {
    let msg = '';
    if (Array.isArray(err)) {
        msg = err.join('<br>');
    } else {
        msg += err;
    }
    Swal.fire({
        title: 'Error!',
        html: `${msg}`,
        icon: 'error',
        confirmButtonText: 'Cool'
        })
}

function loginModal() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
}


function deleteTodoConfirmation(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          deleteTodo(id);
        }
      })
}