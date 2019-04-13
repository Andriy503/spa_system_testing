<template>
    <div class="d-flex" id="wrapper_bar">

      <!-- Sidebar -->
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">
          <img src="@/assets/admin_panel.png" width="40" class="admin_panel_icon">
          <span>Адмін панель</span>
        </div>
        <div class="list-group list-group-flush">
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'educations')"><i class="fas fa-university"></i> Навчальні піздрозділи</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addTickets')"><i class="fas fa-ticket-alt"></i> Додати білет</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addQuestions')"><i class="fas fa-plus-square"></i> Додати питання</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addAnswers')"><i class="fas fa-plus-circle"></i> Додати відповіді</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addAdminUsers')" v-if="authUser.role_id === 1"><i class="fas fa-users"></i> Користувачі</a>
          <a href="#" class="list-group-item list-group-item-action bg-light" @click="toggleComponent($event, 'addAnswers')">Тестове</a>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <addQuestions v-if="myComponents.addQuestions"></addQuestions>
      <addAnswers v-if="myComponents.addAnswers"></addAnswers>
      <adminUsers v-if="myComponents.addAdminUsers"></adminUsers>
      <addTickets v-if="myComponents.addTickets"></addTickets>
      <educations v-if="myComponents.educations"></educations>

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
import addTickets from '@/components/addTickets'
import educations from '@/components/educations'

export default {
  name: 'slimSideBar',
  data () {
    return {
      myComponents: {
        addQuestions: false,
        addAnswers: false,
        addAdminUsers: false,
        addTickets: false,
        educations: true
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
    adminUsers,
    addTickets,
    educations
  }
}
</script>
