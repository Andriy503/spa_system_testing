// import api from '@/api'
// import router from '@/router'

const namespaced = true

const state = {
  educations: []
}

const actions = {
  updateEducation ({state}, data) {
    let index = state.educations.findIndex(item => item.id === data.education.id)
    state.educations[index].title = data.education.title
  },
  addEducation ({state, mutations}, newEducation) {
    state.educations.push(newEducation)
  }
}

const mutations = {
  updateEducations (state, educations) {
    state.educations = educations
  }
}

export default {
  namespaced,
  state,
  actions,
  mutations
}
