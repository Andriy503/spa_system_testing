<template>
  <div class="wrapper">
    <button class="btn_getUsers" @click="getTestUsers">{{ btnNameGetUsers }}</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Point',
  data () {
    return {
      btnNameGetUsers: 'Get Users'
    }
  },
  methods: {
    getTestUsers () {
      axios.get('/user?ID=12345')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
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
