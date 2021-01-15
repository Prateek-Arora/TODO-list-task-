// selecting list

let listElements = [];
let actions = [];
let redoAction = [];
let change;
let redo_var=false;

document.querySelector('#function_add').addEventListener('click', addUtil);
document.querySelector('#function_remove').addEventListener('click', removeUtil);
document.querySelector('#function_undo').addEventListener('click', undo);
document.querySelector('#function_redo').addEventListener('click', redo);
// document.querySelector('#function_submit').addEventListener('click', add);

let todoList = document.querySelector('#list-el');


function addUtil(){
    document.querySelector('#function_submit').removeEventListener('click', remove);
    document.querySelector('#exampleModalLabel span').textContent = "Add an element";
    document.querySelector('#function_submit').addEventListener('click', add);
}

function removeUtil(){
    document.querySelector('#function_submit').removeEventListener('click', add);
    document.querySelector('#exampleModalLabel span').textContent = "Remove an element";
    document.querySelector('#function_submit').addEventListener('click', remove);
}

function undo(){
    change = true;
    recent = actions[actions.length-1];
    if(recent[0]=='add'){
        remove();
        redoAction.push(recent);
    }
    else if(recent[0]=='remove'){
        add();
        redoAction.push(recent);
    }
    actions.splice(actions.length-1,1);
    document.querySelector('#elem').value = "";
    change = false;
}
function redo(){
    change = true;
    redo_var = true
    last = redoAction[redoAction.length-1];
    if(recent[0]=='add'){
        add();
    }
    else if(recent[0]=='remove'){
        remove();
    }
    redoAction.splice(redoAction.length-1,1);
    change = false;
    redo_var = false;
}



function add() {
    if(!change){
        let val = document.querySelector('#elem').value;
        listElements.splice(listElements.length,0,val);
        let pos = listElements.length-1;
        actions.push(["add",val,pos]);
        let text ='';
        listElements.forEach(element => {
            text += element + " , ";
        });
        todoList.textContent =  text;
        document.querySelector('#elem').value = "";
    }
    else {
        if(!redo_var){
            last = actions[actions.length-1];
            listElements.splice(last[2],0,last[1]);
            let text ='';
            listElements.forEach(element => {
                text += element + " , ";
            });
            todoList.textContent =  text;
        }
        else{
            last = redoAction[redoAction.length-1];
            listElements.splice(last[2],0,last[1]);
            let text ='';
            listElements.forEach(element => {
                text += element + " , ";
            });
            todoList.textContent =  text;
        }
    }
}

function remove() {
    if(!change){
        let val = document.querySelector('#elem').value;
        for(i=0;i<listElements.length;i++){
            if(listElements[i]==val){
                actions.push(["remove",val,i]);
                listElements.splice(i,1);
            }
        }
        let text ='';
        listElements.forEach(element => {
            text += element + " , ";
        });
        todoList.textContent =  text;
        document.querySelector('#elem').value = "";
    }
    else{
        if(!redo_var){
            last = actions[actions.length-1];
            listElements.splice(last[2],1);
            let text ='';
            listElements.forEach(element => {
                text += element + " , ";
            });
            todoList.textContent =  text;   
        }
        else{
            last = redoAction[redoAction.length-1];
            listElements.splice(last[2],1);
            let text ='';
            listElements.forEach(element => {
                text += element + " , ";
            });
            todoList.textContent =  text;
        }
    }
}