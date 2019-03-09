<template>
  <div class="wrapper">
    <button class="btn_getUsers" @click="getTestUsers">{{ btnNameGetUsers }}</button>
    <button class="btn_getUsers" @click="getStoreData">{{ storeBtnName }}</button>

    <div class="auth">
      <input type="text" placeholder="email" v-model="login">
      <input type="text" placeholder="password" v-model="password">
      <button @click="signin">Sign in</button>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import api from '@/api'

export default {
  name: 'Point',
  data () {
    return {
      btnNameGetUsers: 'Get Users',
      storeBtnName: 'Get store variable',
      login: '',
      password: ''
    }
  },
  methods: {
    getTestUsers () {
      api.getTestUsersAdmin()
        .then(function (response) {
          toastr.success(response.data.success, response.data.message)
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    getStoreData () {
      // let tmpUsers = this.$store.getters['user/getUsers']
      api.testPostRequest()
        .then(function (response) {
          toastr.success(response.data.message)
        })
    },
    signin () {
      api.singIn(this.login, this.password)
        .then(function (response) {
          if (response.data.success) {
            let resJson = response.data.data

            localStorage.setItem('token', resJson.token)
            localStorage.setItem('adminUser', resJson.admin_user)

            toastr.success('Success')
          } else {
            toastr.error(response.data.message)
          }
        })
        .catch(function (error) {
          console.log('error', error)
        })
    }
  }
}
</script>

<style>
  .btn_getUsers {
    padding: 10px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .btn_getUsers:hover {
    cursor: pointer;
    background-color: cyan;
  }
</style>
