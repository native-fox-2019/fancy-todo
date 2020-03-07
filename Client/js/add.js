$("#todosAdd-submit").click(function() {
    const title = $("#todo-title").val();
    const description = $("#todo-description").val();
    const status = $("#todo-status").val();
    const due_date = $("#todo-due_date").val();
    console.log(title, description, status, due_date);
    $.ajax('http://localhost:3000/todos',{
        type: "POST",
        headers: {
            "Authorization": localStorage.jwt
        },
        data: {
           title,
           description,
           status,
           due_date 
        }
    })
    .done(()=>showPage("todos"))
    .fail(message=>console.log(message));
});

$("#todosAdd-cancel").click(function () {
    showPage("todos");
});