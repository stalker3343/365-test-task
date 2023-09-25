<template>
  <div class="cart-item">
    <div class="d-flex">
      <!-- TODO у некоторых offers есть картинка -->
      <img class="cart-item-img mr-3" :src="productImg" />
      <div class="d-flex flex-column">
        <div class="text-h6 mb-2">
          {{ product.brand }} | {{ product.title }}
        </div>
        <template v-if="hasOffer">
          <div v-if="product.offer.color" class="d-flex align-center">
            <div class="mr-2">Цвет:</div>
            <div
              class="color-block"
              :style="{ 'background-color': product.offer.color }"
            ></div>
          </div>

          <div v-if="product.offer.sizes" class="d-flex align-center">
            <div class="mr-2">Размер:</div>
            <div>
              {{ product.offer.sizes }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="d-flex align-center">
      <div class="d-flex align-center mr-4">
        <v-btn height="40" color="secondary" x-small @click="onClickMinus">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <div class="count-number">
          {{ product.count }}
        </div>
        <v-btn
          :disabled="product.count === maxItemsCount"
          height="40"
          color="secondary"
          x-small
          @click="onClickPlus"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <div class="mr-3">{{ productSumm }}</div>
      <v-btn icon @click="removeProduct">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { formatThousandSeparator } from '@/helpers'
import { currencyToIcon } from '@/const'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hasOffer() {
      return !!this.product.offer
    },
    productImg() {
      return this.product.offer?.image || this.product.image
    },
    maxItemsCount() {
      return this.hasOffer ? this.product.offer.available : this.product.stock
    },
    productSumm() {
      const summ = (this.product.count * this.product.price.value).toFixed(2)
      return `${formatThousandSeparator(summ)} ${
        currencyToIcon[this.product.price.currency]
      }`
    },
  },
  methods: {
    ...mapMutations(['SET_CARD_ITEM_COUNT', 'REMOVE_CART_ITEM']),
    onPlusItem() {},
    onClickMinus() {
      if (this.product.count !== 1) {
        this.SET_CARD_ITEM_COUNT({
          productId: this.product.id,
          offerId: this.product.offer?.id,
          count: this.product.count - 1,
        })
        return
      }
      const isItemDelete = confirm('Вы хотите удалить продукт из корзины')
      if (isItemDelete) {
        this.REMOVE_CART_ITEM({
          productId: this.product.id,
          offerId: this.product.offer?.id,
        })
      }
    },
    onClickPlus() {
      this.SET_CARD_ITEM_COUNT({
        productId: this.product.id,
        offerId: this.product.offer?.id,
        count: this.product.count + 1,
      })
    },
    removeProduct() {
      this.REMOVE_CART_ITEM({
        productId: this.product.id,
        offerId: this.product.offer?.id,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.color-block {
  width: 20px;
  height: 20px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
}
.cart-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.count-number {
  padding: 0px 10px;
}
</style>
