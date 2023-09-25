<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h4">Корзина</div>
      </v-col>
    </v-row>
    <v-row v-if="CARD_ITEMS.length">
      <v-col cols="12" md="8">
        <CartItem v-for="(item,idx) in CARD_ITEMS" :key="idx" class="mb-2" :product="item"></CartItem>
      </v-col>
       <v-col cols="12" md="4">
          <CartSum></CartSum>    
       </v-col>
    </v-row>
     <v-row v-else>
      <v-col >
        <div>
          В корзине пока нет товара
        </div>
        <nuxt-link :to="{name: 'index'}">
          Перейти в каталог
        </nuxt-link>
      </v-col>
  
    </v-row>


  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CartItem from '@/components/Сart/CartItem.vue'
import CartSum from '@/components/Сart/CartSum.vue'

export default {
  components: {
    CartItem,
    CartSum,
  },
  computed: {
    ...mapState(['CARD_ITEMS']),
  },
}
</script>

<style>
</style>