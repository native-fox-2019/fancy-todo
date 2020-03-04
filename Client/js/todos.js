function loadTodos() {
    $.ajax("http://localhost:3000/todos", {
        type: "GET",
        headers: {
            "Authorization": jwt
        }
    })
    .done(todos => {
        $("#todos-list").html("");
        for (const todo of todos) {
            $("#todos-list").append(`<li>${todo.title}<br/>${todo.description}</li>`);
        }
    })
    .fail(message => console.log(message));
}