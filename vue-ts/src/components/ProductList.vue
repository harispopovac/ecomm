<template>
    <div>
        <v-card variant="flat" class="mb-6">
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-select
                            v-model="selectedCategory"
                            :items="[{ title: 'All Categories', value: '' }, ...displayCategories]"
                            @update:model-value="store.setCategory"
                            item-title="title"
                            item-value="value"
                            :loading="store.loading"
                            variant="solo"
                            density="compact"
                            hide-details
                        />
                    </v-col>

                    <v-col cols="12" md="8" class="d-flex gap-4" :class="$vuetify.display.smAndDown ? 'justify-start' : 'justify-end'">
                        <v-btn
                            prepend-icon="mdi-sort"
                            @click="store.toggleSort"
                            variant="tonal"
                            color="primary"
                            height="40"
                            :width="$vuetify.display.smAndDown ? '48%' : '130'"
                            :loading="store.loading"
                        >
                            Price {{ store.sortBy === 'price' ? (store.sortDirection === 'asc' ? '↑' : '↓') : ' ' }}
                        </v-btn>

                        <v-btn
                            :prepend-icon="store.viewMode === 'list' ? 'mdi-view-grid' : 'mdi-view-list'"
                            @click="toggleViewMode"
                            variant="tonal"
                            color="primary"
                            class="rounded"
                            :class="$vuetify.display.smAndDown ? 'ml-auto' : 'ml-4'"
                            height="40"
                            :width="$vuetify.display.smAndDown ? '48%' : '130'"
                        >
                            {{ store.viewMode === 'list' ? 'Grid' : 'List' }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-progress-linear
            v-if="store.loading"
            indeterminate
            color="primary"
            class="mb-6"
        />

        <v-alert
            v-else-if="store.error"
            type="error"
            class="mb-6"
        >
            {{ store.error }}
        </v-alert>

        <template v-else>
            <v-row v-if="store.viewMode === 'grid'">
                <v-col
                    v-for="product in store.paginatedProducts"
                    :key="product.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                >
                    <ProductCard
                        :product="product"
                        :view-mode="store.viewMode"
                    />
                </v-col>
            </v-row>

            <div v-else>
                <ProductCard
                    v-for="product in store.paginatedProducts"
                    :key="product.id"
                    :product="product"
                    :view-mode="store.viewMode"
                />
            </div>

            <div class="text-center mt-6">
                <v-pagination
                    v-if="store.totalPages > 1"
                    v-model="store.currentPage"
                    :length="store.totalPages"
                    :total-visible="7"
                    @update:model-value="store.setPage"
                    :disabled="store.loading"
                    rounded="circle"
                />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/ProductCard.vue'
import type { CategoryOption } from '@/types/product'

const store = useProductStore()
const selectedCategory = ref<string>('')

const displayCategories = computed<CategoryOption[]>(() => {
    return store.categories.map((category: string) => ({
        title: category.charAt(0).toUpperCase() + category.slice(1),
        value: category
    }));
})

const toggleViewMode = (): void => {
    store.viewMode = store.viewMode === 'list' ? 'grid' : 'list';
}

const checkScreenSize = (): void => {
    if (window.innerWidth < 600 && store.viewMode !== 'grid') {
        store.viewMode = 'grid';
    }
}

onMounted(async (): Promise<void> => {
    await Promise.all([
        store.fetchProducts(),
        store.fetchCategories()
    ]);

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
})

watch(() => window.innerWidth, checkScreenSize);
</script>
