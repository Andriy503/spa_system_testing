<template>
  <div class="cabinet">
    <div id="preloader" v-if="preloader">
      <div id="loader"></div>
    </div>

    <div class="cab_wrapper" v-if="!preloader">
      <h1>Cabinet</h1>
    </div>
  </div>
</template>

<script>

// import toastr from 'toastr'
// import 'toastr/build/toastr.min.css'
// import api from '@/api'
import store from '@/store'
import '@/css/preloader.css'

export default {
  name: 'Cabinet',
  data () {
    return {
      preloader: true
    }
  },
  methods: {
    cheked () {
      store.commit('user/ccc')
    }
  },
  created () {
    if (!store.state.user.isAuthorized) {
      store.dispatch('user/checkIsAuthorized')
        .then(res => {
          (res) ? this.preloader = false : this.router.push('/')
        })
        .catch(rej => {
          console.log('Помилка сталась у компоненті cabinet хук created', rej)
        })
    } else {
      this.preloader = false
    }
  }
}
</script>
