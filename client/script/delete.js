function deleteTodo(id){
    console.log(id)
    $.ajax({
        type: "DELETE", 
        url: "https://intense-brook-20799.herokuapp.com/todos/"+id, 
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