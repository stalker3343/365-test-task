<template>
 <v-app id="inspire">


    <v-app-bar app>
      <v-container>
        <v-row>
          <v-col class="d-flex align-center">
            <v-toolbar-title class="toolbar-title" @click="$router.push({name: 'index'})">Логотип</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-badge
              :content="GET_CARD_ITEMS_COUNT"
              :value="GET_CARD_ITEMS_COUNT"
              color="green"
              overlap
            >
              <v-btn icon @click="$router.push({name: 'basket'})">
                <v-icon large>
                  mdi-cart
                </v-icon>
              </v-btn>
              
            </v-badge>
          </v-col>
        </v-row>

          
      </v-container>

    </v-app-bar>

    <v-main>
      
      <nuxt></nuxt>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['GET_CARD_ITEMS_COUNT']),
  },

  created() {
    const localStorageState = localStorage.getItem('CART_ITEMS')
    if (localStorageState) {
      this.SET_LOCAL_STORAGE_STATE(JSON.parse(localStorageState))
    }

    this.unwatch = this.$store.watch(
      (state, getters) => state.CARD_ITEMS,
      (newValue, oldValue) => {
        localStorage.setItem('CART_ITEMS', JSON.stringify(newValue))
      }
    )
  },
  beforeDestroy() {
    this.unwatch()
  },
  methods: {
    ...mapMutations(['SET_LOCAL_STORAGE_STATE']),
  },
}
</script>

<style lang="scss" scoped>
.toolbar-title {
  cursor: pointer;
}
</style>
