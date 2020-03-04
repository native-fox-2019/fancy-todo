(function(){
    var $title= $('#title');
    var $description= $('#description');
    var $status=$('#status');
    var $dueDate=$('#due-date');
    var $formTodo=$('#form-todo');
    
    var $title_m=$('#title_m');
    var $description_m=$('#description_m');
    var $status_m=$('#status_m');
    var $dueDate_m=$('#due-date_m');
    
    var $todoContent=$('#todos-content');
    var $btnAddTodo=$('#btn-add-todos');
    var $btnUpdateTodo=$('#btn-submit-modal');
    var $editModal=$('#edit-modal');
    var $deleteModal=$('#delete-model');
    var $btnDeleteModalTodo=$('#btn-submit-modal-delete');

    var todosData;
    var willUpdateId=-1;
    var wilDeleteId=-1;

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
        console.log('add todos');
        $btnAddTodo.attr('disabled','disabled');
        addTodos();
    });

    $btnUpdateTodo.on('click',function(){
        $(this).attr('disabled','disabled');
        updateTodos();
    });

    $btnDeleteModalTodo.on('click',function(){
        $(this).attr('disabled','disabled');
        deleteTodos()
    })

    window.openEdit=function(id){
        var curr=todosData.find((d)=>d.id==id);
        $title_m.val(curr.title);
        $description_m.val(curr.description);
        $status_m.val(curr.status);
        $dueDate_m.val(curr.due_date);
        willUpdateId=id;

        $editModal.modal({backdrop:'static'})
    }


    window.openDelete=function(id){
        wilDeleteId=id;
        $deleteModal.modal({backdrop:'static'});
    }

    function onFail(jqXhr,status,err){
        console.log({status,err,jqXhr})
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
        var url='/todos';
        $.get({
            url:url,
            headers:headers,
        },onFetchTodoSuccess).fail(onFail)
    }

    function updateTodos(){
        var sentData={
            "title":$title_m.val(),
            "description":$description_m.val(),
            "status":$status_m.val(),
            "due_date":new Date($dueDate_m.val()).toISOString()
        }
        var url='/todos/'+willUpdateId;
        $.ajax({
            type:'PUT',
            url:url,
            headers:headers,
            data:JSON.stringify(sentData),
            success:refreshTodos
        }).fail(onFail).always(function(){
            $editModal.modal('hide');
            $btnUpdateTodo.attr('disabled',null)
        });
    }

    function addTodos(){
        var sentData={
            "title":$title.val(),
            "description":$description.val(),
            "status":$status.val(),
            "due_date":new Date($dueDate.val()).toISOString()
        }
        var url='/todos'
        $.ajax({
            type:'POST',
            url:url,
            headers:headers,
            data:JSON.stringify(sentData),
            success:refreshTodos
        }).fail(onFail).always(function(){
            console.log('Done creating');
            $btnAddTodo.attr('disabled',null);
        })
    }

    function deleteTodos(){
        var url='/todos/'+wilDeleteId;
        $.ajax({
            type:'DELETE',
            url:url,
            headers:headers,
            success:refreshTodos
        }).fail(onFail).always(function(){
            $deleteModal.modal('hide');
            $btnDeleteModalTodo.attr('disabled',null)
        });
    }

    fetchTodos();

})();