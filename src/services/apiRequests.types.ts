import type { IProduct } from "../types";

export interface IProductsRequestParams {
    limit: number
    skip: number;
    select: string
    sortBy?: string
    order?: string
    q?: string
}

export interface IProductsResponse {
    products: IProduct[],
    total: number
}

export interface ILoginRequestBody {
    username: string
    password: string
}