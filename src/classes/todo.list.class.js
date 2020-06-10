import { Todo } from "./todo.class";

export class Todolist {

    constructor(){
        this.cargarLocalStorage();
    }


    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id);  //Esto devuelve un nuevo array sin el id que queremo eliminar
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
      //recorrer los todo
      for(let todo of this.todos){
           if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
           }    
      }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado );
        this.guardarLocalStorage();
    }


    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
       this.todos = (localStorage.getItem('todo'))
             ? JSON.parse( localStorage.getItem('todo')) 
             : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}