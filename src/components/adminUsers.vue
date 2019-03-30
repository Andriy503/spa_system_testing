<template>
  <div class="admin_users">
    <div class="container" v-if="pre_loader">
      <div class="row">
          <div class="col-md-12">
              <div class="loader">
                  <div class="loader-inner">
                      <div class="loading one"></div>
                  </div>
                  <div class="loader-inner">
                      <div class="loading two"></div>
                  </div>
                  <div class="loader-inner">
                      <div class="loading three"></div>
                  </div>
                  <div class="loader-inner">
                      <div class="loading four"></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <!-- start table -->
    <table class="table table-striped" v-else>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ім`я</th>
          <th scope="col">Прізвище</th>
          <th scope="col">Логін</th>
          <th scope="col">Примітка</th>
          <th scope="col">Роль</th>
          <th scope="col">Ver</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="(user, index) in adminUsers" :key="index">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.login }}</td>
          <td>{{ (user.about) ? user.about : '-' }}</td>
          <td>{{ user.admin_role.title }}</td>

          <!-- ver user -->
          <td v-if="user.is_ver">
            <i class="fas fa-user-check" style="color: green;" @click="verificate(user.id)"></i>
          </td>
          <td v-else>
            <i class="fas fa-user" @click="verificate(user.id, true)"></i>
          </td>

          <!-- delete user -->
          <td v-if="user.is_delete">
            <i class="fas fa-trash-alt" style="color: red;"></i>
          </td>
          <td v-else>
            <i class="fas fa-trash-alt"></i>
          </td>

        </tr>

      </tbody>
    </table>
    <!-- end table -->

  </div>
</template>

<script>

// import store from '@/store'
// import toastr from 'toastr'
// import _ from 'lodash'
// import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/preloader_cab.css'

export default {
  name: 'adminUsers',
  data () {
    return {
      adminUsers: [],
      pre_loader: true
    }
  },
  methods: {
    getAdminUsers () {
      api.getAllAdminUsers()
        .then(res => {
          this.adminUsers = res.data.data.adminUsers
          this.pre_loader = false
        })
        .catch(error2 => {
          console.log('Сталась помилка файл adminUsers ', error2)
        })
    },
    verificate (userId, isDel = false) {
      console.log(userId, ' : ', isDel)
    }
  },
  created () {
    this.getAdminUsers()
    // спеціальнісь - факульткт
  }
}
</script>
