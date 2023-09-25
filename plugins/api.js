/* eslint-disable camelcase */

// import createRepository from '@/api/repository'
import products from '@/api/products.json'
import filter from '@/api/filter.json'

export default function ({ $axios, $config }, inject) {
  // const repositoryWithAxios = createRepository($axios)

  inject('productsRepository', {
    products() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(products)
        })
      })
    },
    filter() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(filter)
        })
      })
    },
  })
}
