import { useState, type ChangeEvent, type DragEvent } from 'react'

import { useAppDispatch } from '../../store/hooks';
import { editTodo, removeTodo, reorderTodos, setLastDraggedOver, toggleCompleted } from '../../store/todosSlice';
import type { TodoItemProps } from './TodoItem.types';

import './TodoItem.css'

const TodoItem = (props: TodoItemProps) => {
  const todo = props.todo
  const index = props.index

  const dispatch = useAppDispatch()

  const [text, setText] = useState(todo.text)
  const [isEditMode, setIsEditMode] = useState(false)

  const onDeleteButtonClick = () => {
    dispatch(removeTodo(todo.id))
  }

  const onCheckboxClick = () => {
    dispatch(toggleCompleted(todo.id))
  }

  const onTextClick = () => {
    setIsEditMode(true)
  }

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value)
  }

  const onInputBlur = () => {
    dispatch(editTodo({ id: todo.id, text }))
    setIsEditMode(false)
  }

  const onDragEnd = () => {
    dispatch(reorderTodos(index))
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    dispatch(setLastDraggedOver(index))
  }

  return (
    <li className='todoItem' draggable onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <input
        type="checkbox"
        className='todoItem_checkbox'
        checked={todo.completed}
        onChange={onCheckboxClick}
      />
      <div className='todoItem_content'>
        {isEditMode
          ? <input autoFocus type="text" className='todoItem_input' value={text} onChange={onInputChange} onBlur={onInputBlur} />
          : <span className={`todoItem_text ${todo.completed ? "line-through" : ""}`} onClick={onTextClick}>{todo.text}</span>}
      </div>
      <button onClick={onDeleteButtonClick}>Удалить задачу</button >
    </li >
  )
}

export default TodoItem
