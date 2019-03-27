import api from '@/api'
import router from '@/router'

const namespaced = true

const state = {
  isAuthorized: false
}

const actions = {
  checkIsAuthorized ({state, commit}) {
    return new Promise((resolve, reject) => {
      api.getMe()
        .then(res => {
          if (res.data.data.user) {
            commit('setIsAuthorized', true)
            resolve(true)
          } else {
            resolve(false)
          }
        })
        .catch(error2 => {
          commit.setIsAuthorized(false)
          resolve(false)
          console.log('Error block catch, file store user action checkIsAuthorized!', error2)
        })
    })
  },
  authResponse ({state, commit}, isValue) {
    commit('setIsAuthorized', isValue)
  },
  redirect ({state}, path) {
    router.push(path)
  }
}

const mutations = {
  setIsAuthorized (state, isValue) {
    state.isAuthorized = isValue
  }
}

export default {
  namespaced,
  state,
  actions,
  mutations
}
