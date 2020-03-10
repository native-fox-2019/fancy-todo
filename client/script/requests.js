'use strict'

const BASE_URL = 'http://localhost:3000';

function register() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + '/users/register',
        data: { email: $('#regEmail').val(), password: $('#regPassword').val() },
        success: () => {
            $('#regForm')[0].reset();
            refresh();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Register Success!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: (err) => {
            console.log(err.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Register!',
                text: `Error ${err.responseText.status}: ${err.responseText.message}`
            })
        }
    });
}

function login() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + '/users/login',
        data: {
            email: $('#logEmail').val(),
            password: $('#logPassword').val()
        },
        success: (data) => {
            localStorage.setItem('token', data.token);
            $('#logForm')[0].reset();
            refresh();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Log-In Success!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: (err) => {
            console.log(err.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Log In!',
                text: `Error ${err.responseText.status}: ${err.responseText.message}`
            })
        }
    });
}

function addNewTodo() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + '/todos',
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $('#titleAdd').val(),
            description: $('#descriptionAdd').val(),
            status: $('#statusAdd').val(),
            due_date: $('#due_dateAdd').val()
        },
        success: () => {
            $('#addTodoForm')[0].reset();
            getAllTodos();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Add Todo Success!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: (err) => {
            console.log(err.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add New Todo!',
                text: `Error ${err.responseText.status}: ${err.responseText.message}`
            })
        }
    });
}

function getAllTodos() {
    $.ajax({
        method: 'GET',
        url: BASE_URL + '/todos',
        headers: { token: localStorage.getItem('token') },
        success: (data) => {
            $('#mainPageTitle').html(`Welcome, ${data.UserEmail.split('@')[0]}!<br>What's your next plan?`)
            $('#todoList').empty();
            data.todos.sort((a,b)=>{return b.id - a.id})
            data.todos.forEach(d => {
                $('#todoList').append(`
                <tr>
                    <td><textarea id="titleUpdate-${d.id}" readonly>${d.title}</textarea></td>
                    <td><textarea id="descriptionUpdate-${d.id}" cols="30" rows="5">${d.description}</textarea></td>
                    <td><select id="statusUpdate-${d.id}">
                            <option value="" hidden></option>
                            <option value="Not Done Yet" ${d.status === 'Not Done Yet' ? 'selected' : '' }>Not Done Yet</option>
                            <option value="In Progress" ${d.status === 'In Progress' ? 'selected' : '' }>In Progress</option>
                            <option value="Finished" ${d.status === 'Finished' ? 'selected' : '' }>Finished</option>
                            <option value="Failed" ${d.status === 'Failed' ? 'selected' : '' }>Failed</option>
                        </select>
                    </td>
                    <td>
                        <input type="date" min="2019-01-01" max="2019-12-31" id="due_dateUpdate-${d.id}" value="${d.due_date.substring(0,10)}" readonly>
                    </td>
                    <td>
                        <button class="btn btn-outline-warning btn-block" onclick="updateTodo(${d.id})">Update</button>
                        <button class="btn btn-outline-danger btn-block" onclick="deleteTodo(${d.id})">Delete</button>
                    </td>
                </tr>
                `);
            });
        },
        error: (err) => {
            console.log(err.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Load Todo List! Please Try Again.',
                text: `Error ${err.responseText.status}: ${err.responseText.message}`
            })
        }
    });
}

function updateTodo(todoId) {
    $.ajax({
        method: 'PUT',
        url: BASE_URL + '/todos/' + todoId,
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $(`#titleUpdate-${todoId}`).val(),
            description: $(`#descriptionUpdate-${todoId}`).val(),
            status: $(`#statusUpdate-${todoId}`).val(),
            due_date: $(`#due_dateUpdate-${todoId}`).val()
        },
        success: () => {
            getAllTodos();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Update Todo Success!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        error: (err) => {
            console.log(err.responseText);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update!',
                text: `Error ${err.responseText.status}: ${err.responseText.message}`
            })
        }
    });
}

function deleteTodo(todoId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
    .then((result) => {
        if (result.value) {
            $.ajax({
                method: 'DELETE',
                url: BASE_URL + '/todos/' + todoId,
                headers: { token: localStorage.getItem('token') },
                success: () => {
                    getAllTodos();
                    Swal.fire(
                        'Deleted!',
                        'The Todo Item Has Been Deleted.',
                        'success'
                    )
                },
                error: (err) => {
                    console.log(err.responseText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to Delete!',
                        text: `Error ${err.responseText.status}: ${err.responseText.message}`
                    })
                }
            });
        }
    })
}