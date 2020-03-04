    // login / register / logout
    var $btnLogin = $(`#btn-login`)
    var $btnReg = $(`#btn-register`)
    var $btnLogout = $(`#btn-logout`)

    // forms
    var $logEmail = $(`#login-email`)
    var $logPass = $(`#login-password`)

    var $regEmail = $(`#reg-email`)
    var $regPass = $(`#reg-password`)

    var $title = $(`#title`)
    var $descr = $(`#description`)
    var $date = $(`#date`)

    // Others
    var $app = $(`.app`)
    var $register = $(`#register`)
    var $login = $(`#login`)
    var $list = $(`#list`)

    show(`list`)

    $btnReg.on(`click`, (event) => {
        event.preventDefault()
        show(`register`)
    })

    $btnLogin.on(`click`, (event) => {
        event.preventDefault()
        show(`login`)
    })