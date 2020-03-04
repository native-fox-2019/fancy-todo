(function(){
    var $form=$('form');

    var $login_email=$('#login_email');
    var $login_password=$('#login_password');

    var $register_email=$('#register_email');
    var $register_name=$('#register_name');
    var $register_password=$('#register_password');

    var $btnLogin=$('#btn-login');
    var $btnRegister=$('#btn-register');

    var loginURL='/api/login';
    var registerURL='/api/register';

    var headers={
        'Content-Type':'application/json'
    }

    $form.on('submit',function(event){
        event.preventDefault();
    });

    $btnLogin.on('click',function(){
        $(this).css('disabled','disabled');
        var sentData={
            "email":$login_email.val(),
            "password":$login_password.val()
        }
        login(sentData);
    });

    $btnRegister.on('click',function(){
        $(this).css('disabled','disabled');
        var sentData={
            "name":$register_name.val(),
            "email":$register_email.val(),
            "password":$register_password.val()
        }
        register(sentData);
    })

    function onLoginSuccess(data){
        window.TOKEN=data.token;
        localStorage.setItem('access_token',data.token);
        main(window.TOKEN);
        initNavbar();
    }

    function onRegisterSuccess(data){
        var sentData={
            "email":data.email,
            "password":data.password
        }
        login(sentData);
    }

    function register(sentData){
        $.ajax({
            type:'POST',
            url:registerURL,
            headers:headers,
            data:JSON.stringify(sentData),
            success:onRegisterSuccess
        }).fail().always(function(){
            $btnRegister.css('disabled','');
        })
    }

    function login(sentData){
        $.ajax({
            type:'POST',
            url:loginURL,
            headers:headers,
            data:JSON.stringify(sentData),
            success:onLoginSuccess
        }).fail().always(function(){
            $btnLogin.css('disabled','');
        })
    }

})()