<template>
  <div class="wrapper-testing">
    <!-- pre loader -->
    <preLoader v-if="preLoader"></preLoader>

    <div class="content-testing" v-else>
      <div class="test-page">
        <h1 class="test-title text-center">{{ ticket.title }}</h1>
        <div class="test-container">

          <!-- navigator -->
          <div class="test-navigation">
            <button
              class="navi-btn"
              :class="{'active': paginationNumber === i}"
              v-for="(i, index) in questions.length"
              :key="index"
              @click="changeNumberPagination(i)"
            >
            {{ i }}
            </button>
          </div>

          <!-- content testing -->
          <div class="test-content">

            <!-- question -->
            <div class="test-question">
              {{ currentQuestion.title }}
            </div>

            <!-- block answers -->
            <div class="answers-block">

              <div class="answer-element" v-for="(answer, index) in currentQuestion.answers" :key="index">

                <!-- One Assoc -->
                <div v-if="currentQuestion.id_type === 1">
                  <input type="radio" id="answer1" value="1" name="answerOneAssoc">
                  <label>
                    {{ answer.title }}
                  </label>
                </div>

                <!-- Many Assoc -->
                <div v-if="currentQuestion.id_type === 2">
                  <input type="checkbox" id="answer1" value="1" name="answerManyAssoc">
                  <label>
                    {{ answer.title }}
                  </label>
                </div>

                <!-- Assoc -->
                <div v-if="currentQuestion.id_type === 3" class="face-wrapper">
                  <!-- bundles questions -->
                  <div class="block-answer-1">
                    <ul id="ul-block-one">
                      <li value="10" v-for="(i, index) in currentQuestion.move_bundles.questions" :key="index">
                        {{ i.title }}
                      </li>
                    </ul>
                  </div>

                  <!-- bundles answers -->
                  <div class="block-answer-2">
                    <ul id="ul-block-two">
                      <li value="10" v-for="(i, index) in currentQuestion.move_bundles.answers" :key="index">
                        {{ i.title }}
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Word -->
                <div v-if="currentQuestion.id_type === 4">
                  <textarea type="text"
                  class="form-control"
                  placeholder="Введіть відповідь"
                  rows="4"
                ></textarea>
                </div>

              </div>

            </div>

          </div>

          <!-- btn next and back -->
          <div class="test-control">
            <button class="test-control-btn">
              Далі
            </button>
          </div>

        </div>
      </div>
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
      preLoader: false,
      questions: [],
      currentQuestion: {},
      ticket: {},
      paginationNumber: 1
    }
  },
  methods: {
    getDataAndCheckRootUser () {
      this.preLoader = true

      api.getDataAndCheckRootUser({id: this.entrant.id})
        .then(res => {
          if (res.data.success) {
            this.questions = res.data.data.questions
            this.ticket = res.data.data.ticket

            console.log(this.questions)

            this.currentQuestion = this.questions[0]
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
    },
    changeNumberPagination (number) {
      this.paginationNumber = number

      let index = number - 1
      this.currentQuestion = this.questions[index]
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
