<template>
  <div class="wrapper">
    <button class="btn_getUsers" @click="getTestUsers">{{ btnNameGetUsers }}</button>
    <button class="btn_getUsers" @click="getStoreData">{{ storeBtnName }}</button>
  </div>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export default {
  name: 'Point',
  data () {
    return {
      btnNameGetUsers: 'Get Users',
      storeBtnName: 'Get store variable'
    }
  },
  methods: {
    getTestUsers () {
      axios.get('http://system-testing/show')
        .then(function (response) {
          toastr.success(response.data.success, response.data.message)
        })
        .catch(function (error) {
          console.log('error', error)
        })
    },
    getStoreData () {
      let tmpUsers = this.$store.getters['user/getUsers']
      console.log(tmpUsers)
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
