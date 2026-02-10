import axios from "axios"

import type { IProductsRequestParams, IProductsResponse, ILoginRequestBody } from "./apiRequests.types"

const BASE_API_URL = 'https://dummyjson.com/'

export const loadProducts = (page: number, size: number, dateFrom: string, dateTo?: string, selectedVenues?: number[], selectedCity?: number, selectedBands?: number[], selectedGenres?: number[]): Promise<IProductsResponse> => {
    const params: IProductsRequestParams = {
        page,
        size,
        dateFrom,
        city: selectedCity
    }

    // if (dateTo) {
    //     params.dateTo = dateTo
    // }

    // if (selectedVenues && selectedVenues.length > 0) {
    //     params.venues = selectedVenues.join(",")
    // }

    // if (selectedBands && selectedBands.length > 0) {
    //     params.bands = selectedBands.join(",")
    // }

    // if (selectedGenres && selectedGenres.length > 0) {
    //     params.genres = selectedGenres.join(",")
    // }

    return axios.get(`${BASE_API_URL}/products`, { params }).then(res => res.data).catch(e => console.error("Failed loading events", e))
}

export const login = (requestDataa: ILoginRequestBody) => {
    return axios.post(`${BASE_API_URL}/auth/login`, requestDataa).then(res => res.data).catch(error => error)
}