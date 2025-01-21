<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>Product Catalog</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <ProductList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import ProductList from './components/ProductList.vue'
</script>



