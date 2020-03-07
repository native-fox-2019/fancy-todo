function loadTodoForEdit(id) {
    $.ajax(`http://localhost:3000/todos/${id}`, {
        type: "GET",
        headers: {
            "Authorization": localStorage.jwt
        }
    })
        .done(todo => {
            $("#todoEdit-id").val(id);
            $("#todoEdit-title").val(todo.title);
            $("#todoEdit-description").val(todo.description);
            $("#todoEdit-status").val(todo.status);
            $("#todoEdit-due_date").val(todo.due_date);
        })
        .fail(message => console.log(message));
}

$("#todosEdit-submit").click(function () {
    const id = $("#todoEdit-id").val();
    const title = $("#todoEdit-title").val();
    const description = $("#todoEdit-description").val();
    const status = $("#todoEdit-status").val();
    const due_date = $("#todoEdit-due_date").val();
    $.ajax(`http://localhost:3000/todos/${id}`, {
        type: "PUT",
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
        .done(() => showPage("todos"))
        .fail(message => console.log(message));
});

$("#todosEdit-cancel").click(function () {
    showPage("todos");
});