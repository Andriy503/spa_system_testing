<template>
  <div class="auth">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3>{{ (this.isRegistration) ? 'Реєстрація' : 'Увійти' }}</h3>
          <div class="d-flex justify-content-end social_icon">
            <span><i class="fab fa-facebook-square"></i></span>
            <span><i class="fab fa-google-plus-square"></i></span>
            <span><i class="fab fa-twitter-square"></i></span>
          </div>
        </div>
        <div class="card-body">
          <form action="javascript:void(0);">

            <!-- login -->
            <div class="input-group form-group">
              <div class="input-group-prepend" v-if="!isRegistration">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Логін:" v-model="form.login" :disabled="disableForm">
            </div>

            <!-- name -->
            <div class="input-group form-group" v-if="isRegistration">
              <input type="text" class="form-control" placeholder="Ім'я:" v-model="form.name" :disabled="disableForm">
            </div>

            <!-- surname -->
            <div class="input-group form-group" v-if="isRegistration">
              <input type="text" class="form-control" placeholder="Прізвище:" v-model="form.last_name" :disabled="disableForm">
            </div>

            <!-- password -->
            <div class="input-group form-group">
              <div class="input-group-prepend" v-if="!isRegistration">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" class="form-control" placeholder="Пароль:" v-model="form.password" :disabled="disableForm">
            </div>

            <!-- confirm password -->
            <div class="input-group form-group" v-if="isRegistration">
              <input type="password" class="form-control" placeholder="Повторити пароль:" v-model="form.retryPassword" :disabled="disableForm">
            </div>

            <!-- about -->
            <div class="input-group form-group" v-if="isRegistration">
              <textarea class="form-control" rows="5" placeholder="Про себе..." :disabled="disableForm" v-model="form.about"></textarea>
            </div>

            <!-- remember me -->
            <div class="row align-items-center remember" v-if="!isRegistration">
              <input type="checkbox" :disabled="disableForm">Запам'ятати мене
            </div>

            <!-- Sign in | up -->
            <div class="form-group">
              <button
                class="btn float-right login_btn"
                @click="signIn"
                id="signBtn"
                data-loading-text="<i class='fa fa-spinner fa-spin fa-fw' aria-hidden='true'></i>"
                :disabled="disableForm"
              >
                {{ (isRegistration) ? 'Зареєструватися' : 'Увійти' }}
              </button>
            </div>

          </form>
        </div>
        <div class="card-footer" v-if="!isRegistration">
          <div class="d-flex justify-content-center">
            <a href="#">Забули свій пароль?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/auth.css'

export default {
  name: 'Point',
  data () {
    return {
      isRegistration: false, // isRegistration - cheked url is registration
      disableForm: false,
      form: {
        login: '',
        password: '',
        retryPassword: '',
        name: '',
        last_name: '',
        about: ''
      }
    }
  },
  methods: {
    signIn () {
      var signBtn = document.getElementById('signBtn')
      this.disableForm = true
      let textBtn = (this.isRegistration) ? 'Зареєструватися' : 'Увійти'

      if (!this.isRegistration) {
        delete this.form.retryPassword
        delete this.form.name
        delete this.form.last_name
        delete this.form.about
      }

      let onOffDisable = (isCheck = true) => {
        signBtn.innerHTML = textBtn // add inner text
        this.disableForm = isCheck // disable false
      }

      signBtn.innerHTML = "<i class='fa fa-spinner fa-spin fa-fw'></i> " + textBtn

      api.auth(this.form, this.isRegistration)
        .then(function (response) {
          if (response.data.success) {
            let resJson = response.data.data

            localStorage.setItem('token', resJson.token)
            localStorage.setItem('adminUser', resJson.admin_user)

            toastr.success(response.data.message)

            onOffDisable(false)
          } else {
            toastr.options.timeOut = 3000
            toastr.error(response.data.message)

            onOffDisable(false)
          }
        })
        .catch(function (error) {
          console.log('error', error)

          onOffDisable(false)
        })
    }
  },
  created () {
    if (location.hash === '#/registration') {
      this.isRegistration = true
    }
  }
}
</script>
