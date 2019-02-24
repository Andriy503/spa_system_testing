import axios from 'axios'
// import store from '@/store'
import config from '@/default_config'

axios.defaults.baseURL = config.serverName

// store.getters['user/getUsers'] - example get getters

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('token')

  if (token !== null) {
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default {
  getTestUsersAdmin () {
    return axios.get('show')
  },
  singIn (login, password) {
    return axios.post('users', {login, password})
  }
}
