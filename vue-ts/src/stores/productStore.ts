import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, State, ViewMode, SortDirection, SortBy } from '@/types/product';

export const useProductStore = defineStore('products', () => {
    const products = ref<State['products']>([]);
    const categories = ref<State['categories']>([]);
    const loading = ref<State['loading']>(false);
    const error = ref<State['error']>(null);
    const currentPage = ref<State['currentPage']>(1);
    const itemsPerPage = ref<State['itemsPerPage']>(12);
    const totalItems = ref<State['totalItems']>(0);
    const selectedCategory = ref<State['selectedCategory']>('');
    const sortDirection = ref<SortDirection>('asc');
    const sortBy = ref<SortBy>('none');
    const viewMode = ref<ViewMode>('grid');

    const sortedProducts = computed((): Product[] => {
        if (sortBy.value === 'none') return products.value;

        return [...products.value].sort((a, b) => {
            return sortDirection.value === 'asc' ? a.price - b.price : b.price - a.price;
        });
    });

    const paginatedProducts = computed((): Product[] => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return sortedProducts.value.slice(start, end);
    });

    const totalPages = computed((): number =>
        Math.ceil(sortedProducts.value.length / itemsPerPage.value)
    );

    const fetchProducts = async (): Promise<void> => {
        loading.value = true;
        error.value = null;
        try {
            let url = 'https://fakestoreapi.com/products';
            if (selectedCategory.value) {
                url += `/category/${selectedCategory.value}`;
            }

            const response = await fetch(url);
            const data = await response.json() as Product[];

            products.value = data;
            totalItems.value = data.length;
            currentPage.value = 1;
        } catch (e) {
            error.value = 'Failed to fetch products';
            console.error(e);
        } finally {
            loading.value = false;
        }
    };

    const fetchCategories = async (): Promise<void> => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            categories.value = await response.json() as string[];
        } catch (e) {
            console.error(e);
        }
    };

    const setPage = (page: number): void => {
        currentPage.value = page;
    };

    const setCategory = (category: string): void => {
        selectedCategory.value = category;
        fetchProducts();
    };

    const toggleSort = (): void => {
        if (sortBy.value === 'none') {
            sortBy.value = 'price';
            sortDirection.value = 'asc';
        } else if (sortBy.value === 'price' && sortDirection.value === 'asc') {
            sortDirection.value = 'desc';
        } else {
            sortBy.value = 'none';
            sortDirection.value = 'asc';
        }
    };

    const toggleView = (): void => {
        viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid';
    };

    return {
        paginatedProducts,
        categories,
        loading,
        error,
        currentPage,
        totalPages,
        sortDirection,
        sortBy,
        viewMode,
        selectedCategory,
        fetchProducts,
        fetchCategories,
        setPage,
        setCategory,
        toggleSort,
        toggleView
    };
});