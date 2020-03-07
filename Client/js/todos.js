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
                <li>
                    ${todos[i].title}<br/>
                    ${todos[i].description}
                </li>
                <input id="todos-edit-${i}" type="button" value="edit" />
                <input id="todos-delete-${i}" type="button" value="delete" />
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