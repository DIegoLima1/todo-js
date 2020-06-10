import { Todo } from '../classes'
import { todolist}  from '../index.js'

//Referencia en el html
const divTodoList = document.querySelector('.todo-list');   
const txtImput     = document.querySelector('.new-todo');     
const btnBorrar   = document.querySelector('.clear-completed')
const ulFiltros   = document.querySelector('.filters')
const anchorfiltro = document.querySelectorAll('.filtro');



/**
 * 
 * Crea las tareas al html
 */
export const crearTodoHtml = (todo)=>{
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed':''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked':''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}


//Eventos

/**
 * Al darle enter debe guardar la tarea  en el html dinamicamente
 * No es posible agregarle algo vacio 
 */
txtImput.addEventListener('keyup', ( event ) =>{

    if(event.keyCode === 13 && txtImput.value.length >0){
        const nuevoTodo = new Todo( txtImput.value );
        // console.log(nuevoTodo);
        
        todolist.nuevoTodo(nuevoTodo);
        // console.log(todolist);
        
        crearTodoHtml(nuevoTodo);
        txtImput.value = '';

    }
    
})

/**
 * Uso del event.target.localname para saber el nombre exacto(label,button,etc)
 * Luego el html donde esta el <li> se debe eliminar
 */


divTodoList.addEventListener('click' , (event) => {
    const nombreElemento = event.target.localName;    // input, label, button
    const todoElemento   = event.target.parentElement.parentElement;  //Esto recupera todo el html que queremos eliminar
    const todoId         = todoElemento.getAttribute('data-id');      //recupera el id

    if(nombreElemento.includes('input')){        //Click en el check
        todolist.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){  // Eliminar el todo
        todolist.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

})

btnBorrar.addEventListener('click', () => {
    todolist.eliminarCompletados();

    for(let i= divTodoList.children.length-1; i >= 0;i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
        
    }


})




ulFiltros.addEventListener('click', () =>{
    
    const filtro = event.target.text;  //Da undefined si si no es un texto
    
    if(!filtro){ return};
    anchorfiltro.forEach((elem) => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        //console.log(elemento);

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        //console.log(completado);

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }

        
    }


})