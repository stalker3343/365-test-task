import {set} from  'vue'
import {ADD_CART_PRODUCT,REMOVE_CART_ITEM,SET_CARD_ITEM_COUNT,SET_FILTERS,SET_LOCAL_STORAGE_STATE,SET_PRODUCTS} from './type.mutations'
import { formatThousandSeparator } from '@/helpers'
import { currencyToIcon } from '@/const'
export const state = () => {
    return {
      CARD_ITEMS: [],
      PRODUCTS: [],
      FILTERS:{
        color: '',
        brands: '',
        sizes: ''
      }
    }
  }
  
  export const mutations = {
    [SET_PRODUCTS](state, payload){
      state.PRODUCTS = payload
    },
    [SET_FILTERS](state, payload){
      state.FILTERS = {...state.FILTERS, ...payload}
    },
    [SET_LOCAL_STORAGE_STATE](state, payload){
      state.CARD_ITEMS = payload
    },
    [ADD_CART_PRODUCT](state, item) {
      state.CARD_ITEMS.push(item)
    },
    [REMOVE_CART_ITEM](state, {
      productId,
      offerId = null,
    }){
      if(offerId){
        state.CARD_ITEMS = state.CARD_ITEMS.filter(el=>{
          if(el.id !== productId) return true
          return !el.offer?.id || el.offer.id !== offerId
        })
        return 
      }
      state.CARD_ITEMS = state.CARD_ITEMS.filter(el=> el.id !== productId)
    },
    [SET_CARD_ITEM_COUNT](state, {productId, offerId, count}) {
      let editedItemIdx = null
      if(offerId){
        editedItemIdx = state.CARD_ITEMS.findIndex(el=> {
          return el.id === productId && el.offer && el.offer.id === offerId
        }) 
      }else{
        editedItemIdx = state.CARD_ITEMS.findIndex(el=> {
          return el.id === productId
        })
      }

      const editedItem = state.CARD_ITEMS[editedItemIdx]
      set(state.CARD_ITEMS, editedItemIdx, {...editedItem, count} )
    },
  }
  
  export const actions = {}
  
  export const getters = {
    GET_CARD_ITEMS(state) {
      return state.CARD_ITEMS
    },
    GET_CARD_ITEMS_COUNT(state) {
      return state.CARD_ITEMS.length
    },
    GET_CARD_ITEMS_SUMM(state) {
      let totalSumm = 0
      state.CARD_ITEMS.forEach(el=>{
        const productSumm = el.count * el.price.value     
        totalSumm +=  productSumm
      })
      return `${formatThousandSeparator(totalSumm)} ${
        currencyToIcon.RUB
      }`


    },
    IS_PRODUCT_IN_CART: (state) => (productId, offerId = null) => {
      const searchFn = offerId ?
        (el) => el.id === productId && el.offer && el.offer.id === offerId:
        (el) => el.id === productId
   
      return !!state.CARD_ITEMS.find(searchFn)
 
    },
    CART_DISPLAYED_ITEMS(state){
      return state.CARD_ITEMS
    },
    FILTERED_PRODUCTS(state){
      return state.PRODUCTS.filter(el=>{
        if(!state.FILTERS.brands) return true
        return el.brand === state.FILTERS.brands
      }).filter(el=>{
        if(!state.FILTERS.color) return true
        if(!el.offers) return false
        return el.offers.some(el=> el.color === state.FILTERS.color) 
      }).filter(el=>{
        if(!state.FILTERS.sizes) return true
        if(!el.offers) return false
        return el.offers.some(el=> el.sizes === state.FILTERS.sizes) 
      })
    }
  }
  