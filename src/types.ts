export interface IProduct {
    id: number;
    name: string;
}

export type SortMethod = "completed" | "pending"
export type FilteringMethod = "completed" | "pending" | null