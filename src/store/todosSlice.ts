import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { FilteringMethod, ITodo, SortMethod } from '../types';
import type { RootState } from './store'

export interface TodosState {
    todos: ITodo[]
    filteringMethod: FilteringMethod
    lastDraggedOver: number | null
}

const storedTodos = localStorage.getItem("todos")
const defaultTodos = storedTodos ? JSON.parse(storedTodos) : []

const initialState: TodosState = {
    todos: defaultTodos,
    filteringMethod: null,
    lastDraggedOver: null
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: ITodo = { id: Date.now(), text: action.payload, completed: false }

            state.todos = [...state.todos, newTodo];
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            const newTodos = state.todos.filter(todo => todo.id !== action.payload)

            state.todos = newTodos
        },
        toggleCompleted: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload)

            if (todo) {
                todo.completed = !todo.completed
            }
        },
        editTodo: (state, action: PayloadAction<{ id: number, text: string }>) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id)

            if (todo) {
                todo.text = action.payload.text
                todo.completed = false
            }
        },
        sortTodos: (state, action: PayloadAction<SortMethod>) => {
            state.todos.sort((a, b) => {
                if (a.completed && !b.completed) {
                    return action.payload === 'completed' ? -1 : 1
                }

                if (!a.completed && b.completed) {
                    return action.payload === 'completed' ? 1 : -1
                }

                return 0;
            })
        },
        setFilteringMethod: (state, action: PayloadAction<FilteringMethod>) => {
            state.filteringMethod = action.payload
        },
        setLastDraggedOver: (state, action: PayloadAction<number>) => {
            state.lastDraggedOver = action.payload;
        },
        reorderTodos: (state, action: PayloadAction<number>) => {
            const reorderedTodos = [...state.todos]

            const [movedTodo] = reorderedTodos.splice(action.payload, 1);
            reorderedTodos.splice(state.lastDraggedOver as number, 0, movedTodo);

            state.todos = reorderedTodos
            state.lastDraggedOver = null;
        },
    }
})

export const { addTodo, removeTodo, toggleCompleted, editTodo, sortTodos, setFilteringMethod, setLastDraggedOver, reorderTodos } = todosSlice.actions

export const selectTodos = (state: RootState) => state.todos.todos
export const selectFilteringMethod = (state: RootState) => state.todos.filteringMethod

export default todosSlice.reducer