$(document).ready( () => {

    if(localStorage.getItem('token')){
        $('#login-render').hide()
        $('#register-render').hide()
        $('#logout-btn').show()
        $('#todo-btn').show()
        showTodos()
        $('#todo-box').fadeIn()
    }else{
        $('#login-render').show()
        $('#register-render').show()
        $('#logout-btn').hide()
        $('#todo-btn').hide()
        $('#login-box').show()
    }

    $('#logout-btn').on('click', (e) => {
        localStorage.removeItem('token')
        $('#login-render').show()
        $('#register-render').show()
        $('#logout-btn').hide()
        $('#todo-btn').hide()
        e.preventDefault()
        $('.box').hide()
        $('#login-box').show()
    })

    $('#holiday-btn').on('click', (e) => {
        e.preventDefault()
        $('.box').hide()
        showHolidays()
        $('#holiday-box').show()
    })

    $('#login-render').on('click', (e) => {
        e.preventDefault()
        $('.box').hide()
        $('#login-box').show()
    })

    $('#register-render').on('click', (e) => {
        e.preventDefault()
        $('.box').hide()
        $('#register-box').show()
    })

    $('#todo-render').on('click', (e) => {
        e.preventDefault()
        $('.box').hide()
        showTodos()
        $('#todo-box').show()
    })

    $('#login-form').on('submit', (e) => {
        e.preventDefault()
        login( $('#login-email').val(), $('#login-password').val() )
    })

    $('#register-form').on('submit', (e) => {
        e.preventDefault()
        register( $('#register-name').val(), $('#register-email').val(), $('#register-password').val() )
    } )

    $('#addTodo-form').on('submit', (e) => {
        e.preventDefault()
        createTodo( $('#atTitle').val(), $('#atDescription').val(), $('#atDue_date').val() )
    })

    $('#editTodo-form').on('submit', (e) => {
        e.preventDefault()
        editTodo( $('#etTitle').val(), $('#etDescription').val(), $('#etDue_date').val(), $('#etStatus').val(), $('#etId').val() )
    })

    $('#todo-btn').on('click', (e) => {
        e.preventDefault()
        showTodos()
        $('.box').hide()
        $('#todo-box').show()
    })
})