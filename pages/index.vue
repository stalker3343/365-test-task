<template>
  <v-container>
    <v-row >
      <v-col cols="12" md="4">
        <FiltersBlock :filters="filters"></FiltersBlock>
      </v-col>
      <v-col cols="12" md="8">
        <v-row v-if="FILTERED_PRODUCTS.length">
          <v-col v-for="product in FILTERED_PRODUCTS" :key="product.id"  cols="12" md="4">
            <ProductCard :product="product"></ProductCard>
          </v-col>
        </v-row>
         <v-row v-else>
          <v-col>
            Нет товаров для выбранных характеристик
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '@/components/Product/ProductCard.vue'
import FiltersBlock from '@/components/Filters/FiltersBlock.vue'
import { normalizeFilters } from '@/helpers'
export default {
  name: 'IndexPage',
  components: {
    ProductCard,
    FiltersBlock,
  },

  async asyncData({ $productsRepository, store }) {
    const products = await $productsRepository.products()
    const filters = await $productsRepository.filter()
    store.commit('SET_PRODUCTS', products)

    return { products, filters: normalizeFilters(filters) }
  },
  computed: {
    ...mapGetters(['FILTERED_PRODUCTS']),
  },
}
</script>
