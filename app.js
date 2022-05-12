//alert('Works');

//el addEventListener es como que agrega una escucha al evento submit, y ejecuta la funcion
document.getElementById('formTask').addEventListener('submit',saveTask);

function saveTask(e) {
    
    let titulo= document.getElementById('title').value;
    
    let descripcion= document.getElementById('descripcion').value;
   

    const task = {
        titulo,              // title : title,
        descripcion         // descripcion: descripcion
    };
//localStorage.setItem('tasks',task);
//localStorage.setItem('tasks', JSON.stringify(task));
//let ok =JSON.parse( localStorage.getItem('tasks'));
   
if (localStorage.getItem('tasks') === null){
let tasks = [];
tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}else {
   let tasks= JSON.parse( localStorage.getItem('tasks')); //lo transforma en objeto
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
//console.log(ok);
getTasks();
document.getElementById('formTask').reset(); //para recargar el formulario y volver a cargar otros datos
e.preventDefault(); //este evento hace que no se recague la pagina al presionar el boton agregar

}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0 ; i < tasks.length; i++ ){
        //console.log(tasks[i]);
        let title = tasks[i].titulo;
        let descripcion = tasks[i].descripcion;
        tasksView.innerHTML += ` <div class="card mb-3">
        <div class="card-body " > 
            <p>
                ${title} - ${descripcion}
            </p>
            <a class= "btn btn-danger" onclick="deleteTask('${title}')"> Eliminar</a>
        </div> 
              
        </div>`
    }
}



function deleteTask(title){
    //con el titulo recorremos las tareas para buscarlas y eliminarlas
    let tareas = JSON.parse(localStorage.getItem('tasks'));
    //console.log(JSON.parse(localStorage.getItem('tasks'))) //retorna en un formato mas legible en string/en objeto cn datos string
    for(let i = 0; i< tareas.length;i++){
        if (tareas[i].titulo == title){
            tareas.splice(i,1);
            console.log(`Se elimno la tarea: ${tareas[i]}`)
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tareas) );
    getTasks();
}

getTasks();