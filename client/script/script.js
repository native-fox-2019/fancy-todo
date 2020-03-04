function changeStats (id) {
    console.log(`masuk`)
    $.ajax({
        url: `http://localhost:3000/todos/${id}`,
        method: "PUT",
        headers: {token:token},
        data:{
            status = true
        },
        success: (data) => {
            refreshTodo()
        },
        error: (err) => {
            console.log(err)
        }
    })
}