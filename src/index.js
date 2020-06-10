import './styles.css';

import { Todo,Todolist } from './classes';
import { crearTodoHtml } from './js/componentes';


export const todolist = new Todolist();

todolist.todos.forEach(todo => crearTodoHtml (todo));
