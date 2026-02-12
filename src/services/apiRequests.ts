import axios from "axios"

import type { IProductsRequestParams, IProductsResponse, ILoginRequestBody } from "./apiRequests.types"
import type { SortDirection } from "../types"
import { DEFAULT_SELECT, DEFAULT_LIMIT } from "../consts"

const BASE_API_URL = 'https://dummyjson.com/'

export const getProducts = (page: number = 1, searchString: string = "", sortBy?: string, order: SortDirection = 'ascend'): Promise<IProductsResponse> => {
    const params: IProductsRequestParams = {
        select: DEFAULT_SELECT,
        limit: DEFAULT_LIMIT,
        skip: (page - 1) * DEFAULT_LIMIT,
    }

    if (sortBy) {
        params.sortBy = sortBy
        params.order = order === "ascend" ? "asc" : "desc"
    }

    if (searchString) {
        params.q = searchString
    }

    return axios.get(`${BASE_API_URL}/products/search`, { params }).then(res => res.data).catch(error => error)
}

export const login = (requestDataa: ILoginRequestBody) => {
    return axios.post(`${BASE_API_URL}/auth/login`, requestDataa).then(res => res.data).catch(error => error)
}