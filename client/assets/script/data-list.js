// lg kerjain group project

function listData(data) {
    $table.empty()
    data.forEach(todo => {
        console.log(todo)
        $tableList.append(`<tr class="w-100">`)
        var $checkbox = $tableList.append(`<td><input type="checkbox" ${todo.done ? "checked" : ""}></td>`)
        $tableList.append(`<td>${todo.title}</td> <td>${todo.description}</td> <td>${todo.due_date}</td>`)
        $tableList.append(`<td><button type="button" class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#md-${todo.id}">
                            Launch demo modal
                            </button>`)
        var $delete = $tableList.append(`<td><button class="btn btn-danger m-1">delete</button>`)

        $checkbox.on(`click`, (event) => {

        })
        // $tableList.append(`
        // <div class="modal fade" id="md-${todo.id}" tabindex="-1" role="dialog" aria-labelledby="md-${todo.id}Label" aria-hidden="true">
        //     <div class="modal-dialog" role="document">
        //         <div class="modal-content">
        //             <div class="modal-header">
        //                 <h5 class="modal-title" id="md-${todo.id}Label">${todo.title}</h5>
        //                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                 <span aria-hidden="true">&times;</span>
        //                 </button>
        //             </div>
        //             <div class="modal-body" id="md-bd-${todo.id}">

        //             </div>
        //             <div class="modal-footer">
        //                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                 <button type="button" class="btn btn-primary">Save changes</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        // `)

        $tableList.append(`</tr>`)

    })
}

{/* <form id="editTodo${todo.id}">
                        <div class="form-group">
                            <input type="text" placeholder="Title" id="edit-title${todo.id}" class="form-control mb-2" value="${todo.title}">
                        </div>
                        <div class="form-group">
                            <textarea placeholder="Description" id="edit-description${todo.id}" class="form-control mb-2" cols="30"
                                rows="5">${todo.description}</textarea>
                        </div>
                        <div class="form-group">
                            <input type="date" id="edit-date${todo.id}" class="form-control mb-2" value="${todo.due_date}">
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form> */}