$(`#register-form`).submit(function (event){
    event.preventDefault()
    let email= $(`#email-reg`).val()
    let password = $(`#password-reg`).val()
    let repassword = $(`#repassword-reg`).val()
    if (password!==repassword){
        $(`#error`).empty()
        $(`#error`).append(`Please input the same password!`)
    } else {
        $.ajax({
            type: "POST", 
            url: "https://intense-brook-20799.herokuapp.com/user/register", 
            data: {
                email: email,
                password: password
            },
            success: function(result){
                $(`#error`).empty()
                $(`#register`).hide()
                $(`#login`).show()
            },
            error: function(err){
                //alert(`Error : ${err.responseJSON.response}`)
                $(`#error`).empty()
                $(`#error`).append(`Error : ${err.responseJSON.response}`)
            }
        })
    }
})

$(`#login-form`).submit(function (event){
    event.preventDefault()
    let email= $(`#email-login`).val()
    let password = $(`#password-login`).val()
        $.ajax({
            type: "POST", 
            url: "https://intense-brook-20799.herokuapp.com/user/login", 
            data: {
                email:email, 
                password: password
            },
            success: function(result){
              localStorage.setItem('token', result.token)
                $(`#error`).empty()
                $(`#login`).hide()
                $(`#todos`).show()
                listShow()
                weather()
            },
            error: function(err){
                $(`#error`).empty()
                $(`#error`).append(`Error : ${err.responseJSON.response}`)
            }
        })
})

$(`#add-form`).submit(function (event){
    event.preventDefault()
    let newData={
        title: $(`#title`).val(),
        description: $(`#description`).val(),
        status: $(`#status`).val(),
        due_date: $(`#due_date`).val()
    }
    $.ajax({
        type: "POST", 
        url: "https://intense-brook-20799.herokuapp.com/todos", 
        data: newData,
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            $(`#error`).empty()
            $(`#add`).hide()
            $('#list-todos').empty()
            $(`#todos`).show()
            listShow()
        },
        error: function(err){
            // alert(`Error : ${err.responseJSON.response}`) 
            $(`#error`).empty()
            $(`#error`).append(`Error : ${err.responseJSON.response}`)
        } 
    })
})

$(`#edit-form`).submit(function(event){
    event.preventDefault()
    let id = $(`#todo-id`).val()
    let newData= {
        title: $(`#title`).val(),
        description: $(`#description`).val(),
        status: $(`#status`).val(),
        due_date: $(`#due_date`).val()
    }
    $.ajax({
        type: "PUT", 
        url: "https://intense-brook-20799.herokuapp.com/todos/"+id, 
        data: newData,
        headers: {"token": localStorage.getItem('token')},
        success: function(result){
            console.log(result)
            $(`#error`).empty()
            $(`#edit`).hide()
            $('#list-todos').empty()
            $(`#todos`).show()
            listShow()
        },
        error: function(err){
            //alert(`Error : ${err.responseJSON.response}`) 
            $(`#error`).empty()
            $(`#error`).append(`Error : ${err.responseJSON.response}`)
        } 
    })
})

