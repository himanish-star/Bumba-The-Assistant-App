
let list= null;
let listElements = [];
let forfilteruse = [];
let count=0;
let allCheck=false;
let itera=0;
window.onload = function () {
    $.get('/categories/todos',
        (data)=>{
        listElements=data;
        showTodos();
    });

    list = document.getElementById('list');
    let addNewTodo = document.getElementById('add-new-todo');
    let addBtn = document.getElementById('add-btn');
    let delBtn = document.getElementById('del-btn');
    let selall = document.getElementById('selall-btn');

    addBtn.onclick = function () {
        let todoValue = addNewTodo.value;
        addTodo(todoValue);
        showTodos();
    };

    delBtn.onclick = function () {
        forfilteruse=listElements;
        listElements=forfilteruse.filter(function (item) {
            if(item.done)
                return (true);
            return false;
        });
        console.log(listElements);
        showTodos();
    };

    selall.onclick = function () {
        if(!allCheck) {
            for (itera in listElements) {
                listElements[itera].done = true;
            }
            allCheck=true;
        }
        else {
            for (itera in listElements) {
                listElements[itera].done = false;
            }
            allCheck=false;
        }
        showTodos();
    };

    function showTodos() {
        list.innerHTML="";
        for(itera in listElements){
            addListItem(listElements[itera].task,listElements[itera].done,itera);
            count=itera;
        }
    }

    function addListItem(todoValue,done,id){

/*
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div class="card">
                 <div class="body bg-amber">
            Quis pharetra a pharetra fames blandit. Risus faucibus velit Risus imperdiet mattis neque volutpat, etiam lacinia netus dictum magnis per facilisi sociosqu. Volutpat. Ridiculus nostra.
             </div>
        </div>
    </div>

*/



        let newListItem = document.createElement('li');
        newListItem.setAttribute('id','todo' + id);
        newListItem.className = 'list-group-item row col-sm-12 col-sm-offset-1 mr-auto ml-auto';

        console.log('creating checkbox');
        let checkBox = document.createElement('input');
        // checkBox.className = 'col-1';
        console.log(checkBox);
        checkBox.setAttribute('type','checkbox');
        console.log(checkBox);

        // checkBox.type = 'checkbox';
        checkBox.onchange = strikeSpan;
        console.log(checkBox);

        let span = document.createElement('span');
        span.className = 'col-8 mr-3';
        span.setAttribute('id','todoSpan'+id);
        span.innerText = todoValue;

        if(done===true){
            checkBox.setAttribute('checked','true');
            span.style.textDecoration = 'line-through';
            checkBox.onchange = strikeSpan;
        }

        let deleteBtn = document.createElement('i');
        deleteBtn.className = 'fa col-1 fa-times';
        deleteBtn.onclick = deleteTodo;

        let moveUpBtn = document.createElement('i');
        moveUpBtn.className = 'col-1 fa fa-chevron-up';
        moveUpBtn.onclick = moveuptodo;

        let moveDownBtn = document.createElement('i');
        moveDownBtn.className = 'col-1 fa fa-chevron-down';
        moveDownBtn.onclick = movedowntodo;

        console.log('checkbox appended');
        console.log(checkBox);
        newListItem.appendChild(checkBox);
        newListItem.appendChild(span);
        newListItem.appendChild(deleteBtn);
        newListItem.appendChild(moveUpBtn);
        newListItem.appendChild(moveDownBtn);
        console.log(newListItem)
        list.appendChild(newListItem);
    }

    function addTodo(todoTask) {
        let newTask = {
            task: todoTask,
            done: false
        };
        $.post('/categories/todos',{
            task:todoTask,
            done:false
        });
        listElements.push(newTask);
    }

    function deleteTodo(event) {
        let index = +event.target.parentElement.getAttribute('id').split('do')[1];
        listElements.splice(index,1);
        let task = document.getElementById('todoSpan'+index).innerText;
        $.post('/categories/todos/delete',{
            task : task
        });
        showTodos();
    }

    function moveuptodo() {

        let index = event.target.parentElement.getAttribute('id').split('do')[1];
       forfilteruse=listElements;

       if(parseInt(index))
        {
            let alpha=forfilteruse[parseInt(index)];
            forfilteruse[parseInt(index)]=forfilteruse[parseInt(index)-1];
            forfilteruse[parseInt(index)-1]=alpha;
            listElements=forfilteruse;
            showTodos();
        }
    }
    function movedowntodo() {

        let index = event.target.parentElement.getAttribute('id').split('do')[1];
        forfilteruse=listElements;

        if(index!==count)
        {
            let alpha=forfilteruse[parseInt(index)+1];
            forfilteruse[parseInt(index)+1]=forfilteruse[parseInt(index)];
            forfilteruse[parseInt(index)]=alpha;
            listElements=forfilteruse;
            showTodos();
        }
    }

    function strikeSpan(event) {

        let index = event.target.parentElement.getAttribute('id').split('do')[1];
        listElements[index].done = event.target.checked;
        if(!listElements[index].done) allCheck=false;
        showTodos();
    }
};
