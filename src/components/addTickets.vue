<template>
  <div class="wrapper_ticket w-100">

    <!-- pre loader -->
    <preLoader v-if="preLoader"></preLoader>
    <!-- end pre loader -->

    <div class="content_tickets" v-else>
      <!-- table tickets -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Білет</th>
          <th scope="col">Час проходження</th>
          <th scope="col">Кількість питань</th>
          <th scope="col">Спеціальність</th>
          <th scope="col">Курс</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tiket, index) in tickets" :key="index">
          <th>{{ tiket.id }}</th>
          <td>{{ tiket.title }}</td>
          <td>{{ tiket.time_of_passing }}</td>
          <td>{{ tiket.count_question }}</td>
          <td>{{ tiket.specialty.title }}</td>
          <td>{{ tiket.course.title }}</td>
        </tr>
      </tbody>
    </table>
    <!-- end table tackets -->
    </div>

  </div>
</template>

<script>

// import store from '@/store'
// import toastr from 'toastr'
// import _ from 'lodash'
// import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/tickets.css'
import preLoader from '@/components/preLoader'

export default {
  name: 'addTickets',
  data () {
    return {
      tickets: [],
      preLoader: true
    }
  },
  methods: {
    getTickets () {
      api.getTickets()
        .then(res => {
          this.tickets = res.data.data.tickets

          this.preLoader = false

          // console.log(this.tickets)
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch function getTickets', resErr)
        })
    }
  },
  created () {
    this.getTickets()
  },
  components: {
    preLoader
  }
}
</script>
