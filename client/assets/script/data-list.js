function listData(data) {
    $table.empty()
    data.forEach(todo => {
        $tableList.append(`<tr class="w-100">`)
        $tableList.append(`<td><input type="checkbox" id="checkbox${todo.id}" ${todo.status ? "checked" : ""}></td>`)
        $tableList.append(`<td>${todo.title}</td> <td>${todo.description}</td> <td>${todo.due_date}</td>`)
        $tableList.append(`<td><button type="button" class="btn btn-primary" id="edit${todo.id}"
                            data-toggle="modal" data-target="#md-edit">
                            Edit
                            </button>`)
        $tableList.append(`<td><button class="btn btn-danger m-1" id="delete${todo.id}">delete</button>`)

        // edits the status with a checkbox
        $(`#checkbox${todo.id}`).on(`click`, (event) => {
            editTodo({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                status: $(`#checkbox${todo.id}`).prop(`checked`),
                due_date: todo.due_date
            }, localStorage.getItem(`Token`))
        })

        // sets the values of edit form modal and saves the data for use
        $(`#edit${todo.id}`).on(`click`, (event) => {
            edit.$form[0].reset()
            edit.$title.val(todo.title)
            edit.$descr.val(todo.description)
            edit.$date.val(todo.due_date)

            entry = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                status: todo.status,
                due_date: todo.due_date
            }
        })

        // Deletes entry
        $(`#delete${todo.id}`).on(`click`, (event) => {
            deleteTodo(todo.id, localStorage.getItem(`Token`))
        })
    })
}