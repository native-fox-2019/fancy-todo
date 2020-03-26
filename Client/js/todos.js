function loadTodos() {
    $.ajax("http://localhost:3000/todos", {
        type: "GET",
        headers: {
            "Authorization": localStorage.jwt
        }
    })
    .done(todos => {
        $("#todos-list").html("");
        for (let i = 0; i < todos.length; i++) {
            $("#todos-list").append(`
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${todos[i].title}</h5>
                    <p class="card-text">${todos[i].description}</p>
                    <a href="#" class="card-link" id="todos-edit-${i}">Edit</a>
                    <a href="#" class="card-link" id="todos-delete-${i}">Delete</a>
                    </div>
                </div>
            `);
            $(`#todos-edit-${i}`).click(function () {
                const id = todos[i].id;
                showPage("todoEdit", id);
            });
            $(`#todos-delete-${i}`).click(function () {
                const id = todos[i].id;
                showPage("todoDelete", id);
            });
        }
    })
    .fail(message => console.log(message));
}

$("#todos-add").click(function() {
    showPage("todoAdd");
    $("#todo-title").val("");
    $("#todo-description").val("");
    $("#todo-status").val("");
    $("#todo-due_date").val("");
});