'use strict'

const BASE_URL = 'http://localhost:3000';

function register() {
    $.ajax({
        method: 'POST',
        url: BASE_URL + '/users/register',
        data: { email: $('#regEmail').val(), password: $('#regPassword').val() },
        success: () => {
            $('#regForm')[0].reset();
        },
        error: (err) => {
            console.log(err.responseText);
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
        },
        error: (err) => {
            console.log(err.responseText);
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
        },
        error: (err) => {
            console.log(err.responseText);
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
            console.log(err);
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
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function deleteTodo(todoId) {
    $.ajax({
        method: 'DELETE',
        url: BASE_URL + '/todos/' + todoId,
        headers: { token: localStorage.getItem('token') },
        success: () => {
            getAllTodos();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}