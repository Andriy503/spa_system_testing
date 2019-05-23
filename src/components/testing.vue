<template>
  <div class="wrapper-testing">
    <!-- pre loader -->
    <preLoader v-if="preLoader"></preLoader>

    <div class="content-testing" v-else>
      <h1>Cooll</h1>
    </div>

  </div>
</template>

<script>

// import isEmpty from 'lodash/isEmpty'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/testing.css'
import preLoader from '@/components/preLoader'

export default {
  name: 'testing',
  data () {
    return {
      entrant: {},
      preLoader: false
    }
  },
  methods: {
    getDataAndCheckRootUser () {
      this.preLoader = true

      api.getDataAndCheckRootUser({id: this.entrant.id})
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data)
          } else {
            toastr.error(res.data.message)
            this.$router.push('/access-entrants')
            return false
          }

          this.preLoader = false
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    }
  },
  created () {
    if (!localStorage.getItem('entrant')) {
      this.$router.push('/access-entrants')
      return false
    }

    this.entrant = JSON.parse(localStorage.getItem('entrant'))

    this.getDataAndCheckRootUser()
  },
  components: {
    preLoader
  }
}
</script>
