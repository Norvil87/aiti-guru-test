import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './store'

export interface ProductsState {
    searchTerm: string
}

const initialState: ProductsState = {
    searchTerm: ""
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    }
})

export const { setSearchTerm } = productsSlice.actions

export const selectSearchTerm = (state: RootState) => state.products.searchTerm;

export default productsSlice.reducer