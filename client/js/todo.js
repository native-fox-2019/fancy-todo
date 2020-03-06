(function(){
    var $title= $('#title');
    var $description= $('#description');
    var $status=$('#status');
    var $dueDate=$('#due-date');
    var $formTodo=$('#form-todo');
    var $startDate=$('#start-date')
    
    var $title_m=$('#title_m');
    var $description_m=$('#description_m');
    var $status_m=$('#status_m');
    var $dueDate_m=$('#due-date_m');
    var $startDate_m=$('#start-date_m');
    
    var $todoContent=$('#todos-content');
    var $btnAddTodo=$('#btn-add-todos');
    var $btnUpdateTodo=$('#btn-submit-modal');
    var $editModal=$('#edit-modal');
    var $deleteModal=$('#delete-model');
    var $btnDeleteModalTodo=$('#btn-submit-modal-delete');
    var $hrefUnAuth=$('#href-unauth');

    var todosData;
    var willUpdateId=-1;
    var wilDeleteId=-1;
    const userID=-1;
    var currEdit;

    var headers={
        token:TOKEN,
        "Content-Type":'application/json'
    };

    var todoContent=$('#tr-partial').html();

    $formTodo.on('submit',function(event){
        event.preventDefault();
        console.log({
            title:$title.val(),
            description:$description.val(),
            status:$status.val(),
            dueDate:new Date($dueDate.val())
        })
    });

    $btnAddTodo.on('click',function(){
        $btnAddTodo.attr('disabled','disabled');
       
        addTodos().then(function(data){
            refreshTodos();
            return addGoogleTodos(data.id)
        })
        .catch(onFail)
        .finally(function(){
            $btnAddTodo.attr('disabled',null)
        });
    });

    $btnUpdateTodo.on('click',function(){
        $(this).attr('disabled','disabled');
      
       updateTodos().then(function(data){
            refreshTodos();
            return updateGoogleTodos(data.data.g_id);
       })
       .catch(onFail)
       .finally(function(){
            $editModal.modal('hide');
            $btnUpdateTodo.attr('disabled',null)
       })
    });

    $btnDeleteModalTodo.on('click',function(){
        $(this).attr('disabled','disabled');
        
        deleteTodos()
        .then(function(data){
            refreshTodos();
            return deleteGoogleTodos(data.eventID)
        })
        .catch(onFail)
        .finally(function(){
            $deleteModal.modal('hide');
            $btnDeleteModalTodo.attr('disabled',null)
        })
    })

    window.openEdit=function(id){
        var curr=todosData.find((d)=>d.id==id);
        $title_m.val(curr.title);
        $description_m.val(curr.description);
        $status_m.val(curr.status);
        $dueDate_m.val(curr.due_date);
        $startDate_m.val(curr.start_date);
        willUpdateId=id;
        currEdit=curr;

        $editModal.modal({backdrop:'static'})
    }


    window.openDelete=function(id){
        wilDeleteId=id;
        $deleteModal.modal({backdrop:'static'});
    }

    function onFail(res){
        console.log(res)
    }

    function onFetchTodoSuccess(data){
        var newContent=todoContent;
        todosData=data;
        for(var i=0;i<data.length;i++){
            var d=data[i];
            var curr_content=newContent
            .replace(/\{id\}/g,d.id)
            .replace('{title}',d.title)
            .replace('{status}',d.status)
            .replace('{due_date}',d.due_date)
            .replace('{description}',d.description);
            $todoContent.append(curr_content);
        }
    }


    function refreshTodos(){
        setTimeout(fetchTodos,1000);
        $todoContent.html('');
    }

    function fetchTodos(){
        var url=SERVER+'/todos';
        $.get({
            url:url,
            headers:headers,
        },onFetchTodoSuccess).fail(onFail)
    }

    function updateTodos(){
        var sentData={
            "title":$title_m.val(),
            "description":$description_m.val(),
            "start_date":new Date($startDate_m.val()).toISOString(),
            "due_date":new Date($dueDate_m.val()).toISOString()
        }
        var url='/todos/'+willUpdateId;

        return new Promise(function(resolve,reject){
            $.ajax({
                type:'PUT',
                url:SERVER+url,
                headers:headers,
                data:JSON.stringify(sentData),
                success:function(data){
                    resolve(data)
                }
            }).fail(function(jqXhr,status,response){
                reject({jqXhr:jqXhr,status:status,response:response});
            })
        });

    }

    function updateGoogleTodos(eventId){
        
        var sentData={
            eventId:eventId
        }
        var url='/calendar/update';

        return new Promise(function(resolve,reject){
            $.ajax({
                type:'PUT',
                url:SERVER+url,
                headers:headers,
                data:JSON.stringify(sentData),
                success:function(data){
                    resolve(data)
                }
            }).fail(function(jqXhr,status,response){
                reject({jqXhr:jqXhr,status:status,response:response});
            });
        })

    }

    function addTodos(){
        var sentData={
            "title":$title.val(),
            "description":$description.val(),
            "due_date":new Date($dueDate.val()).toISOString(),
            "start_date":new Date($startDate.val()).toISOString()
        }
        var url='/todos';

        return new Promise(function(resolve,reject){
            $.ajax({
                type:'POST',
                url:SERVER+url,
                headers:headers,
                data:JSON.stringify(sentData),
                success:function(data){
                    resolve(data)
                }
            }).fail(function(jqXhr,status,response){
                reject({jqXhr:jqXhr,status:status,response:response});
            })
        });
    }

    function addGoogleTodos(todoID){
        var sentData={
           todoID:todoID
        }

        var url='/calendar/add';

        return new Promise(function(resolve,reject){
            $.ajax({
                type:'POST',
                url:SERVER+url,
                headers:headers,
                data:JSON.stringify(sentData),
                success:function(data){
                    resolve(data);
                }
            }).fail(function(jqXhr,status,response){
                reject({jqXhr:jqXhr,status:status,response:response});
            });
        });


    }

    function deleteGoogleTodos(eventId){
        var url='/calendar/delete';
        var sentData={
            eventId:eventId
        }

        return new Promise(function(resolve,reject){
            $.ajax({
                type:'DELETE',
                url:SERVER+url,
                headers:headers,
                data:JSON.stringify(sentData),
                success:function(data){
                    resolve(data)
                }
            }).fail(function(jqXhr,status,response){
                reject({jqXhr:jqXhr,status:status,response:response});
            })
        })
    }

    function deleteTodos(){
        var url='/todos/'+wilDeleteId;

        return new Promise(function(resolve,reject){
            $.ajax({
                type:'DELETE',
                url:SERVER+url,
                headers:headers,
                success:function(data){
                    resolve(data)
                }
            }).fail(function(jqXhr,status,response){
                reject({jqXhr:jqXhr,status:status,response:response});
            });
        })
    }

    function checkGoogleAuth(){
        var url='/api/check-google-auth';
        $.ajax({
            type:'POST',
            url:SERVER+url,
            headers:headers
        }).done(function(data){
            if(!data.authenticate){
                $hrefUnAuth.attr('href',data.authURL);
                $hrefUnAuth.text('Klik here to authenticate to google calendar');
            }
        })
    }

    checkGoogleAuth();
    fetchTodos();

})();