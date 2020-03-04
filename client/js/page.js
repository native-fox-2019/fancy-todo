function changePage(page) {
    $('.allPage').hide();
    $(`#${page}`).show();
}

function setPage(page) {
    if (page === 'login') {
        $('#login-button')[0].reset();
        changePage('login-form');
    } else if (page === 'register') {
        $('#register-button')[0].reset();
        changePage('register-form');
    } else if (page === 'todos') {
        $('#form-create')[0].reset();
        changePage('todos-list');
        showTodos();
        $('#logout').show();
    } else if (page === 'edit') {
        changePage('edit-form');
    }
}