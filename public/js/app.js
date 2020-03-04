(function(){
    window.TOKEN=localStorage.getItem('access_token');
    var todoURL='/partial/todos.html';
    var loginURL='/partial/login.html';
    var $app=$('#app');
    var cachePage={};

    function appendContent(content){
        $app.html(content);
    }

    function onFail(jqXHR,status,res){
        console.log(status,res);
    }


    function onSuccess(name){
        return function(content){
            cachePage[name]=content;
            appendContent(content);
        }
        
    }

    window.main=function(token){
        var p;
        if(token){
            p='todo';
            if(cachePage[p]){
                appendContent(cachePage.todo);
            }
            else{
                $.get(todoURL).done(onSuccess('todo'))
                .fail(onFail)
            }
        }
        else{
            p='login';
            if(cachePage[p]){
                appendContent(cachePage.login);
            }else{
                $.get(loginURL).done(onSuccess('login'))
                .fail(onFail)
            }

        }
    }

    main(window.TOKEN);

})()