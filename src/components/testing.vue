<template>
  <div class="wrapper-testing">
    <!-- pre loader -->
    <preLoader v-if="preLoader"></preLoader>

    <div class="content-testing" v-else>
      <div class="test-page">
        <h1 class="test-title text-center2">{{ ticket.title }}</h1>
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
                      <li
                        v-for="(i, index) in currentQuestion.move_bundles.questions"
                        :key="index"
                        @click="selectBubleQuestion"
                        :value="i.id"
                      >
                        {{ i.title }}
                      </li>
                    </ul>
                  </div>

                  <!-- bundles answers -->
                  <div class="block-answer-2">
                    <ul id="ul-block-two">
                      <li
                        v-for="(i, index) in currentQuestion.move_bundles.answers"
                        @click="selectBubleAnswer"
                        :key="index"
                        :value="i.id"
                      >
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

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/testing.css'
import preLoader from '@/components/preLoader'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'testing',
  data () {
    return {
      entrant: {},
      preLoader: false,
      questions: [],
      currentQuestion: {},
      ticket: {},
      paginationNumber: 1,
      colors: [
        {
          color: '#8823ed',
          isAvailable: true
        },
        {
          color: '#ff7200',
          isAvailable: true
        },
        {
          color: '#e50658',
          isAvailable: true
        },
        {
          color: '#0bbf17',
          isAvailable: true
        }
      ],
      isOneTableToClick: false,
      isTwoTableToClick: false,
      activeOneLi: {},
      associations: []
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
    },
    selectBubleQuestion (e) {
      let li = e.target

      if (li.style['0'] || this.isOneTableToClick) {
        return false
      }

      this.isTwoTableToClick = false
      this.isOneTableToClick = true

      let findColor = this.colors.find(i => i.isAvailable)

      if (!findColor) return false

      li.style.borderColor = findColor.color
      li.style.borderLeftWidth = '5px'

      this.activeOneLi.color = findColor.color
      this.activeOneLi.value = li.value

      this.colors.forEach((i, index) => {
        if (i.color === findColor.color) {
          i.isAvailable = false
        }
      })
    },
    selectBubleAnswer (e) {
      let li = e.target

      if (isEmpty(this.activeOneLi) || this.isTwoTableToClick || li.style['0']) {
        return false
      }

      this.isTwoTableToClick = true
      this.isOneTableToClick = false

      li.style.borderColor = this.activeOneLi.color
      li.style.borderLeftWidth = '5px'

      this.associations.push(
        {
          idTableOne: this.activeOneLi.value,
          idTableTwo: li.value
        }
      )
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
