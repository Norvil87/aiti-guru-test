import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { IProduct } from '../types';
import type { RootState } from './store'

export interface ProductsState {
    products: IProduct[]
}

const initialState: ProductsState = {
    products: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        /*  removeTodo: (state, action: PayloadAction<number>) => {
             const newTodos = state.todos.filter(todo => todo.id !== action.payload)
 
             state.todos = newTodos
         }, */

    }
})

export const { setProducts } = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products

export default productsSlice.reducer