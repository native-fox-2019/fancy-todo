function deleteTodo(id){
    console.log(id)
    $.ajax({
        type: "DELETE", 
        url: "http://localhost:3000/todos/"+id, 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            console.log("success")
            $('#list-todos').empty()
            $(`#todos`).show()
            listShow()
            },
        error: function(err){
            alert(`Error : ${err.responseJSON.response}`)
        } 
    })
}