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
          <!-- <th scope="col">Примітка</th> -->
          <th scope="col">Роль</th>
          <!-- <th scope="col">Підрозділ</th> -->
          <th scope="col">Кафедра</th>
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
          <!-- <td>{{ (user.about) ? user.about : '-' }}</td> -->
          <td>{{ user.admin_role.title }}</td>
          <!-- <td>{{ (user.id_education) ? user.educational_subdivision.title : '-' }}</td> -->
          <td>{{ (user.id_departament) ? user.departament.title : '-' }}</td>

          <!-- ver user -->
          <td v-if="user.is_ver">
            <i class="fas fa-user-check" data-toggle="modal" data-target="#exampleModalCenter" style="color: green;" @click="activeUser = user"></i>
          </td>
          <td v-else>
            <i class="fas fa-user" data-toggle="modal" data-target="#exampleModalCenter" @click="activeUser = user"></i>
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

    <!-- Modal ver users-->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{ (activeUser.is_ver) ? 'Забрати доступ' : 'Надати доступ' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ (activeUser.is_ver) ? 'Користувач не буде мати доступа до адмін панелі' : 'Надати доступ в адмін панель' }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрити</button>
            <button type="button" class="btn btn-primary" @click="verifiedUser" data-dismiss="modal">Підтвердити</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

// import store from '@/store'
import toastr from 'toastr'
// import _ from 'lodash'
// import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/preloader_cab.css'
import '@/css/admin_users.css'
import verModal from '@/components/modals/verAdminUsers'

export default {
  name: 'adminUsers',
  data () {
    return {
      adminUsers: [],
      pre_loader: true,
      activeUser: {}
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
    verifiedUser () {
      api.verifiedAdminUser(this.activeUser.id)
        .then(res => {
          if (res.data.success) {
            toastr.info(res.data.message)

            this.getAdminUsers()
          } else {
            toastr.error(res.data.message)
          }
        })
        .catch(error2 => {
          toastr.error('Помилка сервера')
          console.log('помилка в блоці catch function verifiedUser')
        })
    }
  },
  created () {
    this.getAdminUsers()
    // спеціальнісь - факульткт
  },
  components: {
    verModal
  }
}
</script>
