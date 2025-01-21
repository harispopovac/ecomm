<template>
  <v-card :class="viewMode">
    <div class="d-flex" :class="viewMode === 'list' ? 'flex-row' : 'flex-column'">
      <v-img
        :src="product.image"
        :alt="product.title"
        :height="viewMode === 'list' ? '200' : '250'"
        :width="viewMode === 'list' ? '200' : 'auto'"
        cover
        class="bg-white"
        :class="viewMode === 'list' ? 'responsive-img' : ''"
      />

      <v-card-text :class="viewMode === 'list' ? 'flex-grow-1' : ''">
        <v-card-title class="px-0 text-truncate">{{ product.title }}</v-card-title>
        
        <div class="d-flex align-center mb-2">
          <v-chip
            color="primary"
            size="small"
            class="mr-2"
          >
            {{ product.category }}
          </v-chip>
          <span class="text-h6">${{ product.price.toFixed(2) }}</span>
        </div>

        <p class="description mb-0">{{ product.description }}</p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Product, ViewMode } from '@/types/product';

interface Props {
    product: Product;
    viewMode: ViewMode;
}

defineProps<Props>();
</script>

<style scoped>
.v-card.list {
  margin-bottom: 16px;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  margin : 5px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.6);
}

.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}

.responsive-img {
  transition: height 0.2s, width 0.2s;
  object-fit: cover;
  max-width: 200px; 
  max-height: 200px; 
}

@media (max-width: 600px) {
  .v-card.list .responsive-img {
    height: 200px !important;
    width: 150px !important;
  }
}
</style>