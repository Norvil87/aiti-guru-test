export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export type SortMethod = "completed" | "pending"
export type FilteringMethod = "completed" | "pending" | null