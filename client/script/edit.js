function editTodo(id){
    $.ajax({
        type: "GET", 
        url: "https://intense-brook-20799.herokuapp.com/todos/"+id, 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            $(`#title`).remove()
            $(`#description`).remove()
            $(`#status`).remove()
            $(`#todo-id`).remove()
            $(`#due_date`).remove()
            $(`#todos`).hide()
            $(`#edit`).show()
            $(`#title-edit`).append(`<input type="title " class="form-control" id="title" value="${result.response.title}">`)
            $('#desc-edit').append(`<input type="description" class="form-control" id="description" value="${result.response.description}">`)
            $('#status-edit').append(`<select class="custom-select" id="status">
            <option selected>${result.response.status}</option>
            <option>Not started</option>
            <option>Ongoing</option>
            <option>Done</option>
          </select>
          <input type="hidden" id="todo-id" value="${result.response.id}">`)
            $(`#due_date-edit`).append(`<input type="date" class="form-control" name="due_date" id="due_date" value="${result.response.due_date}">`)
        },
        error: function(err){
            alert(`Error : ${err.responseJSON.response}`)
        }
    })
}