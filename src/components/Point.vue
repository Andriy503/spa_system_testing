<template>
  <div class="wrapper">

    <!-- navs -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div>
        <img src="@/assets/herb.png" width="40" height="40" alt="logo DDPU">
        <span class="navbar-brand" id="title">Дрогобицький педагогічний університет імені Івана Франка</span>
      </div>

      <div class="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo03">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Увійти</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Реєстрація</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- end navs -->

    <!-- slider -->
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <button class="btn btn-success btn-lg" id="beginTest">Почати тестування</button>
        <div class="carousel-item active">
          <img src="@/assets/8.jpg" class="d-block w-100" alt="photo one">
        </div>
        <div class="carousel-item">
          <img src="@/assets/10.jpg" class="d-block w-100" alt="photo two">
        </div>
        <div class="carousel-item">
          <img src="@/assets/12.jpg" class="d-block w-100" alt="photo three">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <!-- end slider -->

  </div>
</template>

<script>
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/point.css'

export default {
  name: 'Point',
  mq: {
    phone: '(max-width: 768px)',
    tabletMin: '(min-width: 769px)',
    tablet: '(max-width: 1088px)',
    desktop: '(min-width: 1088px)',
    widescreen: '(min-width: 1280px)',
    fullhd: '(min-width: 1472px)'
  },
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
  },
  created () {

  }
}
</script>
