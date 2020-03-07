(function(){
    var $form=$('form');

    var $login_email=$('#login_email');
    var $login_password=$('#login_password');

    var $register_email=$('#register_email');
    var $register_name=$('#register_name');
    var $register_password=$('#register_password');

    var $btnLogin=$('#btn-login');
    var $btnRegister=$('#btn-register');
    var $errText=$('#error-res');

    var loginURL='/api/login';
    var registerURL='/api/register';
    var loginGoogleURL='/api/login/google'

    var headers={
        'Content-Type':'application/json'
    }

    $form.on('submit',function(event){
        event.preventDefault();
    });

    $btnLogin.on('click',function(){
        $(this).attr('disabled','disabled');
        $errText.html('');
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
    });

    function onActionFail($elem){
        return function (jqXHR,status,response){
            if(jqXHR.status===404){
                $elem.html('Username/password is wrong');
            }
        }
    }

    function onLoginDone(){
        $btnLogin.attr('disabled',null);
    }

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

    function onGoogleLoggedInSuccess(data){

    }

    function register(sentData){
        $.ajax({
            type:'POST',
            url:SERVER+registerURL,
            headers:headers,
            data:JSON.stringify(sentData),
            success:onRegisterSuccess
        }).fail().always(function(){
            $btnRegister.attr('disabled',null);
        })
    }

    function loginWithGoogle(sentData){
        $.ajax({
            type:'POST',
            url:SERVER+loginGoogleURL,
            headers:headers,
            data:JSON.stringify(sentData),
            success:onRegisterSuccess
        }).fail(onActionFail($errText)).always(onLoginDone)
    }

    function login(sentData){
        $.ajax({
            type:'POST',
            url:SERVER+loginURL,
            headers:headers,
            data:JSON.stringify(sentData),
            success:onLoginSuccess
        }).fail(onActionFail($errText)).always(onLoginDone)
    }



    window.renderGoogleButton=function(){
        gapi.signin2.render('g-signin', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'color':'white',
            'onsuccess': onGoogleSuccess,
            'onfailure': onGoogleFailure
        });
    }

    function onGoogleSuccess(googleUser){
        // console.log(googleUser)
        var profile = googleUser.getBasicProfile();
        var sentData={
            name:profile.getName(),
            email:profile.getEmail(),
            login_token:profile.getId()
        }
        console.log(sentData)
        loginWithGoogle(sentData)

    }

    function onGoogleFailure(res){
        console.log('Gagal',res);
    }


    window.googleSignOut=function(){
        var auth2=gapi.auth2.getAuthInstance();
        if(auth2){
            auth2.signOut().then(function(){
                //renderGoogleButton()
            });
            auth2.disconnect();
           
        }
    }

    function renderButton(){
        gapi.load('auth2', function(){
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
              client_id: '344866426626-65ags7r92el6bvtrj0krdmk113l2r3fj.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin',
              'scope': 'profile email'
              // Request scopes in addition to 'profile' and 'email'
              //scope: 'additional_scope'
            });
            // attachSignin(document.getElementById('customBtn'));
            var element=document.getElementById('google-btn-login');
            console.log(element.id);
            auth2.attachClickHandler(element, {},onGoogleSuccess,onGoogleFailure);
        });
    }

    renderButton();

})()