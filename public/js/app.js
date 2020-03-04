(function(){
    window.TOKEN=localStorage.getItem('access_token');
    var todoURL='/partial/todos.html';
    var loginURL='/partial/login.html';
    var $app=$('#app');

    function onFail(jqXHR,status,res){
        console.log(status,res);
    }

    function onSuccess(content){
        $app.html(content);
    }

    window.main=function(token){
        if(token){
            $.get(todoURL).done(onSuccess)
            .fail(onFail)
        }
        else{
            $.get(loginURL).done(onSuccess)
            .fail(onFail)
        }
    }

    main(window.TOKEN);

})()