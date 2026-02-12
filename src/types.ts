export interface IProduct {
    id: number;
    title: string;
    brand: string;
    thumbnail: string;
    price: number
    rating: number
    category: string
    sku: string
}

export type SortDirection = "ascend" | "descend"
