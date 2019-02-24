const namespaced = true

const state = {
  isAutorized: true,
  usersFixture: [
    {
      id: 1,
      name: 'user1'
    },
    {
      id: 2,
      name: 'user2'
    },
    {
      id: 3,
      name: 'user3'
    }
  ]
}

const getters = {
  getUsers: state => state.usersFixture
}

export default {
  namespaced,
  state,
  getters
}
