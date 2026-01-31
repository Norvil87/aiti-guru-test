import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTodo, selectFilteringMethod, setFilteringMethod, sortTodos } from '../../store/todosSlice';
import type { SortMethod } from '../../types';

import './TodoInput.css'

const TodoInput = () => {
  const dispatch = useAppDispatch()

  const filteringMethod = useAppSelector(selectFilteringMethod);

  const [text, setText] = useState("");
  const [sortMethod, setSortMethod] = useState<SortMethod>("completed");

  const addNewTodo = () => {
    if (text) {
      dispatch(addTodo(text.trim()))
      setText("")
    }
  }

  const handleAddButtonClick = () => {
    addNewTodo()
  }

  const onAddButtonKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      addNewTodo()
    }
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value)
  }

  const handleSortButtonClick = () => {
    const newSortMethod = sortMethod === 'completed' ? "pending" : "completed"

    dispatch(sortTodos(newSortMethod))
    setSortMethod(newSortMethod)
  }

  const handleFilterButtonClick = () => {
    const newFilterMethod = filteringMethod === 'completed' ? "pending" : "completed"

    dispatch(setFilteringMethod(newFilterMethod))
  }

  const handleResetFilterButtonClick = () => {
    dispatch(setFilteringMethod(null))
  }

  return (
    <div className='todoInput-container'>
      <input type="text" className='todoInput-input' value={text} placeholder="Добавьте текст" onChange={handleInputChange} onKeyDown={onAddButtonKeyDown} />
      <button onClick={handleAddButtonClick}>Добавить задачу</button>
      <button onClick={handleSortButtonClick}>{sortMethod === "pending" ? "Сначала выполненные" : "Сначала не выполненные"}</button>
      <button onClick={handleFilterButtonClick}>{filteringMethod === "pending" ? "Только выполненные" : "Только не выполненные"}</button>
      <button disabled={filteringMethod === null} onClick={handleResetFilterButtonClick}>Сбросить</button>
    </div>
  )
}

export default TodoInput
