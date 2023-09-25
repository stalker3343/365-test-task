<template>
  <v-card :disabled="isOutOfStock">
    <v-img height="250" :src="productImg"></v-img>

    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text>
      <div class="mb-2">
        {{ product.brand }}
      </div>
      <div class="mb-2">
        {{ productPrice }}
      </div>
      <ProductOfferSelect
        v-if="product.offers"
        v-model="selectedOffer"
        :offers="product.offers"
      ></ProductOfferSelect>
    </v-card-text>
    <v-card-actions>
      <v-btn block @click="onCartActionClick">
        {{ cartBtnText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import ProductOfferSelect from '~/components/Product/ProductOfferSelect.vue'
import { formatThousandSeparator } from '@/helpers'
import { currencyToIcon } from '@/const'

export default {
  components: {
    ProductOfferSelect,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedOffer: null,
    }
  },
  computed: {
    ...mapGetters(['IS_PRODUCT_IN_CART', 'IS_OFFER_IN_CART']),
    cartBtnText() {
      if (this.isOutOfStock) return 'Нет в наличии'
      return this.isItemInCart ? 'Убрать из корзины' : 'В корзину'
    },
    isOutOfStock() {
      return !this.productHasOffers && this.product.stock === 0
    },
    productHasOffers() {
      return this.product.offers
    },
    isItemInCart() {
      if (this.productHasOffers && !this.selectedOffer) {
        return false
      }

      if (this.productHasOffers)
        return this.IS_PRODUCT_IN_CART(this.product.id, this.selectedOffer.id)
      else return this.IS_PRODUCT_IN_CART(this.product.id)
    },
    productPrice() {
      return `${formatThousandSeparator(this.product.price.value)} ${
        currencyToIcon[this.product.price.currency]
      }`
    },
    productImg() {
      return this.selectedOffer?.image || this.product.image
    },
  },
  methods: {
    ...mapMutations(['ADD_CART_PRODUCT', 'ADD_CART_OFFER', 'REMOVE_CART_ITEM']),
    onCartActionClick() {
      if (this.productHasOffers && !this.selectedOffer) {
        alert('Выберете цвет и размер')
        return
      }
      if (this.isItemInCart) {
        this.removeItemFromCart()
        return
      }
      const addedProduct = { ...this.product, count: 1 }
      if (this.productHasOffers) addedProduct.offer = this.selectedOffer
      this.ADD_CART_PRODUCT(addedProduct)
    },
    removeItemFromCart() {
      if (this.productHasOffers)
        this.REMOVE_CART_ITEM({
          productId: this.product.id,
          offerId: this.selectedOffer.id,
        })
      else
        this.REMOVE_CART_ITEM({
          productId: this.product.id,
        })
    },
    addItemToCart() {},
  },
}
</script>

<style></style>
