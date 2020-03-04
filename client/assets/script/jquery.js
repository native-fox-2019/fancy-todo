$.ajax({
    url: `localhost:3000`
})

var $btnLogin = $(`#btn-login`)
var $btnReg = $(`#btn-register`)
var $RegLog = $(`#RegLogForm`)

var isLogin

$btnLogin.on(`click`, () => {
    isLogin = true
    $RegLog.show(150)
})

$btnReg .on(`click`, () => {
    isLogin = false
    $RegLog.show(true)
})

function doneLogin() {
    $RegLog(150, () => {
        $btnLogin.hide(200, () => {
            $btnReg.hide(200)
        })
    })
}