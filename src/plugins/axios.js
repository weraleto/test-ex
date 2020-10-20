import Vue from 'vue'
import axiosVue from 'axios-vue'

Vue.use(axiosVue, {
    globalDefaults: {
      baseURL: 'https://webdev.modumlab.com/api/'
    },
    interceptors: {
      request(config) {
        return config
      },
      requestError(error) {
        alert(error)
        Promise.reject(error)
      },
      response(response) {
        return response
      },
      responseError(error) {
        alert(error)
        Promise.reject(error)
      },
    },
  })