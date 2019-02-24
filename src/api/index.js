import axios from 'axios'
import store from '@/store'
import config from '@/default_config'

axios.defaults.baseURL = config.serverName

export default {
  getTestUsersAdmin () {
    console.log(store.getters['user/getUsers'])
    return axios.get('show')
  }
}
