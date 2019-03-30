<template>
    <div class="d-flex" id="wrapper_bar">

      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">Start Bootstrap </div>
        <div class="list-group list-group-flush">
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addQuestions')">Дадати питання</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addAnswers')">Додати відповіді</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addAdminUsers')" v-if="authUser.role_id === 1">Користувачі</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addAnswers')">Тестове</a>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <addQuestions v-if="myComponents.addQuestions"></addQuestions>
      <addAnswers v-if="myComponents.addAnswers"></addAnswers>
      <adminUsers v-if="myComponents.addAdminUsers"></adminUsers>

    </div>
</template>

<script>

import store from '@/store'
// import toastr from 'toastr'
// import _ from 'lodash'
// import 'toastr/build/toastr.min.css'
// import api from '@/api'
import '@/css/slim_side_bar.css'
import isEmpty from 'lodash/isEmpty'
import addQuestions from '@/components/addQuestions'
import addAnswers from '@/components/addAnswers'
import adminUsers from '@/components/adminUsers'

export default {
  name: 'slimSideBar',
  data () {
    return {
      myComponents: {
        addQuestions: false,
        addAnswers: false,
        addAdminUsers: false
      },
      authUser: {}
    }
  },
  methods: {
    toggleComponent (event, nameComponent) {
      event.preventDefault()

      // clear object myComponents
      for (var item in this.myComponents) {
        this.myComponents[item] = false
      }

      this.myComponents[nameComponent] = true
    }
  },
  created () {
    if (isEmpty(store.state.user.authUser)) {
      this.$router.push('/')

      return
    }

    this.authUser = store.state.user.authUser
  },
  components: {
    addQuestions,
    addAnswers,
    adminUsers
  }
}
</script>
