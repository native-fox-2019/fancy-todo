function changePage(page) {
    $('.allPage').hide();
    $(`#${page}`).show();
}

function setPage(page) {
    if (page === 'login') {
        changePage('login-form');
    } else if (page === 'register') {
        changePage('register-form');
    } else if (page === 'todos') {
        changePage('todos-list');
        showTodos();
        $('#logout').show();
    } else if (page === 'edit') {
        changePage('edit-form');
    }
}