"use strict";

let list= null;
let listElements = [];
let forfilteruse = [];
let count=0;
let itera=0;
window.onload = function () {
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
        listElements=forfilteruse.filter(function (item,index,forfilteruse) { return (!forfilteruse[index].done) });
        showTodos();
    };

    selall.onclick = function () {
        for (itera in listElements) {
            listElements[itera].done = 'true';
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
        let newListItem = document.createElement('li');
        newListItem.setAttribute('data-id',id);
        newListItem.className = 'list-group-item row just';

        let checkBox = document.createElement('input');
        checkBox.className = 'col-1 col-lg-1';
        checkBox.setAttribute('type','checkbox');
        checkBox.onchange = strikeSpan;

        let span = document.createElement('span');
        span.className = '';
        span.innerText = todoValue;
        if(done){
            checkBox.setAttribute('checked','true');
            span.style.textDecoration = 'line-through';
            checkBox.onchange = strikeSpan;}

        let deleteBtn = document.createElement('i');
        deleteBtn.className = 'col-1 fa wrapper fa-times';
        deleteBtn.onclick = deleteTodo;

        let moveUpBtn = document.createElement('i');
        moveUpBtn.className = 'col-1 fa wrapper fa-chevron-up';
        moveUpBtn.onclick = moveuptodo;

        let moveDownBtn = document.createElement('i');
        moveDownBtn.className = 'col-1 fa wrapper fa-chevron-down';
        moveDownBtn.onclick = movedowntodo;

        newListItem.appendChild(checkBox);
        newListItem.appendChild(span);
        newListItem.appendChild(deleteBtn);
        newListItem.appendChild(moveUpBtn);
        newListItem.appendChild(moveDownBtn);

        list.appendChild(newListItem);
    }

    function addTodo(todoTask) {
        let newTask = {
            task: todoTask,
            done: false
        };
        listElements.push(newTask);
    }

    function moveuptodo() {

        let index = event.target.parentElement.getAttribute('data-id');
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

        let index = event.target.parentElement.getAttribute('data-id');
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

    function deleteTodo(event) {
        let index = +event.target.parentElement.getAttribute('data-id');
        listElements.splice(index,1);
        showTodos();
    }

    function strikeSpan(event) {
        let index = event.target.parentElement.getAttribute('data-id');
        listElements[index].done = event.target.checked;
        showTodos();
    }
};