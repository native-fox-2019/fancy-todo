// login / register / logout
var $btnLogin = $(`#btn-login`)
var $btnReg = $(`#btn-register`)
var $btnLogout = $(`#btn-logout`)

// forms
var $RegLog = $(`#RegLogForm`)
var $input = $(`#RegLogForm input`)
var $btnCancel = $(`#btn-cancel-form`)

// some variables
var isLogin
var token

$btnLogin.on(`click`, () => {
    isLogin = true
    $btnReg.show(200)
    $btnLogin.hide(200, () => {
        $RegLog.show(150)
    })
})

$btnReg.on(`click`, () => {
    isLogin = false
    $RegLog.show(150)
    $btnReg.hide(200)
    $btnLogin.show(200, () => {
        $RegLog.show(150)
    })
})

$RegLog.on(`submit`, (event) => {
    event.preventDefault()

    // $.ajax({
    //     url: `localhost:3000`,
    //     method: `POST`
    // })
    // $.ajaxSuccess(() => {
    //     doneLogin()
    // })
})

$btnCancel.on(`click`, (event) => {
    event.preventDefault()
    $RegLog.hide(150, () => {
        $btnLogin.show(200)
        $btnReg.show(200)
    })
})

function doneLogin(event) {
    $RegLog.hide(150, () => {
        $btnReg.hide(200)
        $btnLogin.hide(200, () => {
            $btnLogout.show(200)
        })
    })
}