export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export type ViewMode = 'grid' | 'list';
export type SortDirection = 'asc' | 'desc';
export type SortBy = 'none' | 'price';

export interface CategoryOption {
    title: string;
    value: string;
}

export interface State {
    products: Product[];
    categories: string[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    selectedCategory: string;
    sortDirection: SortDirection;
    sortBy: SortBy;
    viewMode: ViewMode;
}