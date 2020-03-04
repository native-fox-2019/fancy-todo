function hideAllPages() {
    $("#register-page").hide();
    $("#login-page").hide();
    $("#todos-page").hide();
}

function showPage(page) {
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
    }
}

function switchToLoggedIn() {
    $("#login-link").parent().hide();
    $("#register-link").parent().hide();
    $("#todos-link").parent().show();
    $("#logout-link").parent().show();
}

function switchToLoggedOut() {
    $("#login-link").parent().show();
    $("#register-link").parent().show();
    $("#todos-link").parent().hide();
    $("#logout-link").parent().hide();
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
    jwt = null;
    switchToLoggedOut();
    showPage("login");
});

showPage(currentPage);