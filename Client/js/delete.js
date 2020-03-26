function loadTodoForDelete(id) {
    $.ajax(`http://localhost:3000/todos/${id}`, {
        type: "GET",
        headers: {
            "Authorization": localStorage.jwt
        }
    })
        .done(todo => {
            $("#todoDelete-id").val(id);
            $("#todoDelete-title").val(todo.title);
            $("#todoDelete-description").val(todo.description);
            $("#todoDelete-status").val(todo.status);
            $("#todoDelete-due_date").val(todo.due_date);
        })
        .fail(message => console.log(message));
}

$("#todosDelete-submit").click(function () {
    const id = $("#todoDelete-id").val();
    $.ajax(`http://localhost:3000/todos/${id}`, {
        type: "DELETE",
        headers: {
            "Authorization": localStorage.jwt
        }
    })
        .done(() => showPage("todos"))
        .fail(message => console.log(message));
});

$("#todosDelete-cancel").click(function () {
    showPage("todos");
});