import axios from 'axios'
// import toastr from 'toastr'
import store from '@/store'
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

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  localStorage.removeItem('token')
  localStorage.removeItem('adminUser')

  store.dispatch('user/authResponse', false)
  store.commit('user/fillAuthUser', {})

  store.dispatch('user/redirect', 'login')

  return Promise.reject(error)
})

export default {
  getTestUsersAdmin () {
    return axios.get('show.json')
  },
  auth (formData, isRegistration) {
    let url = (isRegistration) ? 'registration' : 'login'

    return axios.post(url + '.json', formData)
  },
  testPostRequest () {
    return axios.post('test.json')
  },
  getMe () {
    return axios.post('get_me.json')
  },
  logout () {
    return axios.get('logout.json')
  },
  test () {
    return axios.get('test.json')
  },
  getAllAdminUsers () {
    return axios.get('getAdminUsers.json')
  }
}
