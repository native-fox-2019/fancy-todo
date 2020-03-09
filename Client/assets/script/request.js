let addTodo = () => {
    $.ajax({
        url: "http://localhost:3000/todos",
        type: "POST",
        headers: { token: localStorage.getItem("token") },
        data: {
            title: $addTitle.val(),
            description: $addDescription.val(),
            due_date: $addDate.val()
        },
        success: function (data) {
            $add.hide()
            $errorForm.hide()
            getTodo()
        },error:function(data){
            $errorForm.show()
        }
    })
}

let deleteTodo = (id) => {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: "DELETE",
        headers: { token: localStorage.getItem("token") },
        success: function (data) {
            getTodo()
        }
    })
}

let getEditDataTodo = (id) => {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: "GET",
        headers: { token: localStorage.getItem("token") },
        success: function (data) {
            $editTitle.val(data.title)
            $editDescription.val(data.description)
            $editDate.val(data.due_date)
            $editSubmit.data('param', id)
            $list.hide()
            $edit.show()
        },
        fail: function(err) {
            console.log(err)
        }
    })
}

let updateTodo = (id) => {
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        type: "PUT",
        headers: { token: localStorage.getItem("token") },
        data: {
            title: $editTitle.val(),
            description: $editDescription.val(),
            due_date: $editDate.val()
        },
        success: function (data) {
            $errorForm.hide()
            getTodo()
        }
    })
}

let registerUser = () => {
    $.ajax({
        url: "http://localhost:3000/users/register",
        type: "POST",
        data: {
            email: $registerEmail.val(),
            password: $registerPassword.val()
        },
        success: function (data) {
            localStorage.setItem("token", data.token)
            $register.hide()
            $error.hide()
            getTodo()
        },
        error: function(err){
            $error.show()
        }

    })
}

let loginUser = () => {
    $.ajax({
        url: "http://localhost:3000/users/login",
        type: "POST",
        data: {
            email: $loginEmail.val(),
            password: $loginPassword.val()
        },
        success: function (data) {
            localStorage.setItem("token", data.token)
            $error.hide()
        },
        error: function(xhr,ajaxOptions,thrownError){
            $error.show()
        }
    })
}