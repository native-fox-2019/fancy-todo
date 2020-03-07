let getTodo = () => {
    $.ajax({
        url: "http://localhost:3000/todos",
        type: "GET",
        data: {},
        headers: { token: localStorage.getItem("token") },
        success: function (data) {
            $login.hide()
            $list.show()
            $tableTodo.empty()
            data.forEach(element => {
                $tableTodoContent.append(`<tr>`)
                $tableTodoContent.append(`<th scope="row">${element.id}</th><td>${element.title}</td><td>${element.description}</td><td id="status-body">${element.status}</td><td>${element.due_date}</td>`)
                $tableTodoContent.append(`<td><input type="checkbox" class="form-check-input" id="done-checker${element.id}" ${element.status ? "checked" : ""}>`)
                $tableTodoContent.append(`<td> <a class="btn btn-primary" onclick="getEditDataTodo(${element.id})" role="button" >Edit</a> <a class="btn btn-primary" onclick="deleteTodo(${element.id})" role="button">Delete</a></td>`)
                $tableTodoContent.append(`</tr>`)

                $(`#done-checker${element.id}`).on(`click`, (event) => {
                    event.preventDefault()
                    checkTodo(element.id, {
                        title: element.title,
                        description: element.description,
                        status: $(`#done-checker${element.id}`).prop(`checked`),
                        due_date: element.due_date
                    })
                })
            });
        }
    })
}