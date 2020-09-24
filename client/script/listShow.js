function listShow(){
    $.ajax({
        type: "GET", 
        url: "http://localhost:3000/todos", 
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
                $(`#todos`).show()
                for (let i=0; i<result.response.length; i++){
                    let data=result.response[i]
                    $('#list-todos').append(`
                    <tr>
                        <th id="dataId" hidden>${data.id}</th>
                        <th id="dataTitle">${data.title}</th>
                        <th id="dataDescription">${data.description}</th>
                        <th id="dataStatus">${data.status}</th>
                        <th id="dataDueDate">${data.due_date}</th>
                        <th style="text-align: center">
                            <button type="button" onclick=editTodo(${data.id}) class="btn btn-primary" id="btn-edit">Edit</button>
                            <button type="button" onclick=deleteTodo(${data.id}) class="btn btn-primary" id="btn-delete">Delete</button>
                        </th>
                    </tr>
                    `)
                }
        },
        error: function(err){
            console.log(err)
            alert(`Error : ${err.responseJSON.response}`)
        }
    })
}