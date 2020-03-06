$(document).ready(function(){
        var $logoutLink=$('#logout-link');

        $logoutLink.on('click',function(){
            //console.log('Kepencet logout');
            window.TOKEN=null;
            localStorage.removeItem('access_token');
            main(window.TOKEN);
            initNavbar();
            googleSignOut();
        })

        window.initNavbar=function(){
            if(!window.TOKEN){
                $logoutLink.hide();
            }
            else{
                $logoutLink.show();
            }
        }

        initNavbar()
    
})
