"use strict"

function addNewTask() {
    $.ajax({
        method: 'POST',
        url: baseURL + '/tasks',
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $('#title').val(),
            description: $('#description').val(),
            status: 'Pending',
            deadline: $('#deadline').val(),
        },
        success: () => {
            console.log('successfully added new task')
            $('#addTaskForm')[0].reset();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function getAllTasks() {
    $.ajax({
        method: 'GET',
        url: baseURL + '/tasks',
        headers: { token: localStorage.getItem('token') },
        success: (data) => {
            $('#taskList').empty();
            data.sort((a,b)=>{return b.id - a.id})
                data.forEach(d => {
                $('#taskList').append(`
                <div class="task" id="taskList" style="width: 18rem;">
                    <div class="task" style="width: 18rem;">
                        <div class="task-body">
                            <h5 class="task-title text-center">${d.title}</h5>
                            <h9 class="task-subtitle text-left">Status: ${d.status}</h9><br>
                            <h9 class="task-subtitle text-left">Deadline: ${d.deadline.split('T')[0]}</h9><br>
                            <button class="btn btn-info task-link m-2" onclick="getOneTask(${d.id})">Detail</a>
                            <button class="btn btn-warning task-link m-2 " onclick="editTaskForm(${d.id})">Edit</a>
                            <button class="btn btn-danger task-link m-2" onclick="deleteTask(${d.id})">Delete</a>
                        </div>
                    </div>
                </div>
                `);
            });
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function getOneTask(taskItem){
    $.ajax({
        method : 'GET',
        url : baseURL + '/tasks/'+taskItem,
        headers : { token: localStorage.getItem('token') },
        success: (data) =>{
            $('#showTask').empty()
            $('#showTask').append(`
                <div class="task" id="taskList" onclick="getTwoTask(${data.id})" style="width: 18rem;">
                <div class="task" style="width: 18rem;">
                <div class="task-body">
                <h5 class="task-title text-center">${data.title}</h5>
                <h6 class="task-subtitle text-center mb-2 text-muted">${data.description}</h6>
                <p class="task-subtitle text-center mb-2 text-muted">(click here to get a quote)</p>
            </div>
            </div>
            `)
            $('#main-page').hide()
            $("#taskId").show()
        },
        error:(err)=>{
            console.log(data)
            console.log(err.responseText)
        }

    })
}

function getTwoTask(taskItem){
    $.ajax({
        method : 'GET',
        url : baseURL + '/quote',
        headers : { token: localStorage.getItem('token') },
        success: (data) =>{
            console.log(data)
            $('#showTask').empty()
            $('#showTask').append(`
                <div class="task" id="taskList" onclick="getOneTask(${taskItem})" style="width: 18rem;">
                <div class="task" style="width: 18rem;">
                <div class="task-body">
                <h5 class="task-title text-center">Quote of the Task:</h5>
                <h7 class="task-subtitle text-center mb-2 text-muted">${data.quoteText || 'This is an inspirational quote'}<br>-${data.quoteAuthor || '- Anon'}</h7>
            </div>
            </div>
            `)
            $('#main-page').hide()
            $("#taskId").show()
        },
        error:(err)=>{
            console.log(data)
            console.log(err.responseText)
        }

    })
}

function editTaskForm(taskId){
    $.ajax({
        method : 'GET',
        url : baseURL + '/tasks/' + taskId,
        headers : { token: localStorage.getItem('token') },
        success: (data) =>{
            // console.log(data)
            $('#main-page').hide()
            $("#editTaskPage").show()
            $('#edit-title').val(data.title)
            $('#edit-description').val(data.description)
            $('#edit-status').val(data.status)
            $('#edit-deadline').val(data.deadline.split('T')[0])
            $('#editTaskSubmit').data('taskId', taskId)
        },
        error:(err)=>{
            // console.log(data)
            // console.log(err.responseText)
        }
    })
}

function editTask() {
    var taskId = $('#editTaskSubmit').data('taskId')
    $.ajax({
        method: 'PUT',
        url: baseURL + '/tasks/' + taskId,
        headers: { token: localStorage.getItem('token') },
        data: {
            title: $('#edit-title').val(),
            description: $('#edit-description').val(),
            status: $('#edit-status').val(),
            deadline: $('#edit-deadline').val(),
        },
        success: () => {
            refresh()
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

function deleteTask(taskId) {
    $.ajax({
        method: 'DELETE',
        url: baseURL + '/tasks/' + taskId,
        headers: { token: localStorage.getItem('token') },
        success: () => {
            refresh()
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}
  