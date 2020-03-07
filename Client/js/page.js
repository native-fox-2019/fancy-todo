function hideAllPages() {
    $("#register-page").hide();
    $("#login-page").hide();
    $("#todos-page").hide();
    $("#todosAdd-page").hide();
    $("#todosEdit-page").hide();
    $("#todosDelete-page").hide();
}

function showPage(page, id) {
    currentPage = page;
    hideAllPages();
    $(".nav-item").removeClass("active");
    switch (page) {
        case "login":
            $("#login-page").show();
            $("#login-link").parent().addClass("active");
            break;
        case "register":
            $("#register-page").show();
            $("#register-link").parent().addClass("active");
            break;
        case "todos":
            $("#todos-page").show();
            $("#todos-link").parent().addClass("active");
            loadTodos();
            break;
        case "todoAdd":
            $("#todos-page").show();
            $("#todos-link").parent().addClass("active");
            loadTodos();
            $("#todosAdd-page").show();
            break;
        case "todoEdit":
            loadTodoForEdit(id);
            $("#todosEdit-page").show();
            break;
        case "todoDelete":
            loadTodoForDelete(id);
            $("#todosDelete-page").show();
            break;
    }
}

function switchToLoggedIn() {
    $("#login-link").parent().hide();
    $("#register-link").parent().hide();
    $("#todos-link").parent().show();
    $("#logout-link").parent().show();
    $("#sign-out-google").parent().hide();
}

function switchToLoggedInWithGoogle() {
    $("#login-link").parent().hide();
    $("#register-link").parent().hide();
    $("#todos-link").parent().show();
    $("#logout-link").parent().hide();
    $("#sign-out-google").parent().show();
}

function switchToLoggedOut() {
    $("#login-link").parent().show();
    $("#register-link").parent().show();
    $("#todos-link").parent().hide();
    $("#logout-link").parent().hide();
    $("#sign-out-google").parent().hide();
}

$("#login-link").click(function () {
    showPage("login");
});

$("#register-link").click(function () {
    showPage("register");
});

$("#todos-link").click(function () {
    showPage("todos");
});

$("#logout-link").click(function () {
    delete localStorage.jwt;
    switchToLoggedOut();
    showPage("login");
});

$(document).ready(() => {
    if (localStorage.jwt) {
        switchToLoggedIn();
        showPage("todos");
    } else {
        switchToLoggedOut();
        showPage("login");
    }
});
