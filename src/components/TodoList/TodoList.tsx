import React from 'react';

import { useAppSelector } from '../../store/hooks';
import { selectFilteringMethod, selectTodos } from '../../store/todosSlice';
import TodoItem from '../TodoItem/TodoItem';

import './TodoList.css'

const TodoList = () => {
  let todos = useAppSelector(selectTodos);
  const filteringMethod = useAppSelector(selectFilteringMethod);

  if (filteringMethod) {
    todos = todos.filter(todo => filteringMethod === "completed" ? todo.completed : !todo.completed)
  }

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <>
      {todos.length > 0
        ? <ul className='todoList'>{todos.map((todo, index) => <TodoItem key={todo.id} index={index} todo={todo} />)}</ul>
        : <p>Активных задач нет</p>}
    </>
  )
}

export default TodoList
