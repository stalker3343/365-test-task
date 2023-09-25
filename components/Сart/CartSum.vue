<template>
  <v-card>
    <v-card-text>
      <div class="text-h5">
        <span class="text-h6">Товаров:</span> {{ GET_CARD_ITEMS_COUNT }}
      </div>
      <div class="text-h5">
        <span class="text-h6">Итого</span> {{ GET_CARD_ITEMS_SUMM }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="onBuy">Купить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'GET_CARD_ITEMS_COUNT',
      'GET_CARD_ITEMS_SUMM',
      'GET_CARD_ITEMS',
    ]),
  },
  methods: {
    onBuy() {
      console.log(this.GET_CARD_ITEMS)
    },
  },
}
</script>

<style></style>
