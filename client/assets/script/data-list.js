function listData(data) {
    $table.empty()
    data.forEach(todo => {
        console.log(todo)
        $tableList.append(`<tr class="w-100">`)
        $tableList.append(`<td><input type="checkbox" id="checkbox${todo.id}" ${todo.done ? "checked" : ""}></td>`)
        $tableList.append(`<td>${todo.title}</td> <td>${todo.description}</td> <td>${todo.due_date}</td>`)
        $tableList.append(`<td><button type="button" class="btn btn-primary" id="edit${todo.id}"
                            data-toggle="modal" data-target="#md">
                            Edit
                            </button>`)
        $tableList.append(`<td><button class="btn btn-danger m-1" id="delete${todo.id}">delete</button>`)

        $(`#checkbox${todo.id}`).on(`click`, (event) => {
            console.log(`press`)
        })

        $(`#edit${todo.id}`).on(`click`, (event) => {
            console.log(`edit`)
        })

        $(`#delete${todo.id}`).on(`click`, (event) => {
            console.log(`delete`)
        })
    })
}