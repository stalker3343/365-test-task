//     return throttleRequest(()=>$axios.$patch(`${resource}`, payload))
const throttleRequest = (request) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const res = await request()
      resolve(res)
    }, 5000)
  })
}
export default ($axios) => (resource) => ({
  index(params) {
    return $axios.$get(`${resource}`, params)
  },

  show(id, params) {
    return $axios.$get(`${resource}${id}/`, params)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$patch(`${resource}${id}/`, payload)
  },

  delete(id, payload) {
    return $axios.$delete(`${resource}${id}/`, payload)
  },
  bulk(payload) {
    return $axios.$patch(`${resource}`, payload)
  },
  bulkDelete(payload) {
    return $axios.$delete(`${resource}`, {
      // data: payload,
      params: payload,
    })
  },
})
