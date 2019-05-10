<template>
    <div class="w-100 wrapper-answers">
      <!-- pre loader -->
      <preLoader v-if="preLoader"></preLoader>

      <div class="content-answers" v-else>
        <nav class="navbar" id="nav-header-questions">
          <form class="form-inline my-2 my-lg-0" id="form-filter-questions">

            <!-- search hash -->
            <input type="text"
              class="form-control mr-sm-2"
              placeholder="Введіть hash"
              id="search-hash"
              v-model="hash"
            >
            <!-- btn search -->
            <button class="btn btn-success"
              @click="searchHash"
            >
              Пошук
            </button>

          </form>
        </nav>

        <div class="answer-block" v-if="isIssetQuestion">

          <!-- card question -->
          <div class="card" id="card-question-block-answer">
            <img class="card-img-top"
              :src="(question.pre_img)
                ? getServerName + question.pre_img
                : require('@/assets/placholder-no-question-image.jpg')"
              alt="Question image"
              id="preImgQuestionBlockAnswer"
              @click="toggleModal(question.pre_img)"
            >
            <div class="card-body">
              <h5 class="card-title" id="card-question-block-answer-title">
                {{ question.ticket.title }}
              </h5>
              <p class="card-text" id="card-question-block-answer-body">
                {{ question.title }}
              </p>
            </div>
            <ul class="list-group list-group-flush" id="ticket-list">
              <li class="list-group-item">Кількість балів: {{ question.points }}</li>
              <li class="list-group-item">Тип питання: {{ question.types_question.title }}</li>
            </ul>
          </div>

          <!-- one answer -->
          <div v-if="question.id_type === 1" class="test1">

            <!--input add answer -->
            <form class="form-inline my-2 my-lg-0" id="form-add-answer">
              <textarea type="text"
                class="form-control"
                placeholder="Введіть відповідь"
                rows="4"
                id="inp-add-answer"
                v-model="form.title"
              ></textarea>
            </form>

            <!-- checkbox -->
            <input type="checkbox" id="checkbox-is-true-answer" v-model="form.current_answer">
            <label for="checkbox-is-true-answer" id="label-is-true-answer">Це правильна відповідь</label>

            <!--  -->
            <button class="btn btn-primary"
              id="add-answer-one"
              @click="addAnswer"
            >
              Додати відповідь <i class='fa fa-spinner fa-spin fa-fw' v-if="btnLoader"></i>
            </button>

            <!-- list answers -->
            <div class="list-answers">
              <ul class="list-group" v-for="(answer, index) in answers" :key="index">
                <li
                  class="list-group-item list-group-item-action active-li-answer-false"
                  id="li-answers-group"
                  :class="{'active-li-answer-true' : answer.current_answer}"
                >
                  {{ answer.title }}
                  <div class="action-answer-in-div">
                    <i
                      class="far fa-edit"
                      id="icon-ans-edit"
                      title="Редагувати"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      @click="activeAnswer = {...answer}"
                    ></i>
                    <i
                      class="far fa-trash-alt"
                      id="icon-ans-delete"
                      title="Видалити"
                      @click="deleteAnswer(answer.id)"
                    ></i>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <!-- modal window -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Редагувати відповідь</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <textarea type="text"
                    class="form-control"
                    placeholder="Введіть відповідь"
                    rows="4"
                    id="inp-add-answer"
                    v-model="activeAnswer.title"
                  ></textarea>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрити</button>
                  <button type="button" class="btn btn-primary" @click="updateAnswer">
                    Оновити <i class='fa fa-spinner fa-spin fa-fw' v-if="btnLoaderUpdate"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- end modal -->

          <!-- modal full view photo -->
          <div class="photo-view-modal">
            <div class="modal-view-content">
              <img class="pre-img"
                  v-if="activeImg"
                  :src="activeImg"
                >
            </div>
          </div>
          <!-- end modal -->

        </div>
      </div>

    </div>
</template>

<script>

import isEmpty from 'lodash/isEmpty'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import '@/css/answers.css'
import api from '@/api'
import preLoader from '@/components/preLoader'
import config from '@/default_config'

export default {
  name: 'addAnswers',
  data () {
    return {
      hash: 'q5cd5422dcee5e4.62598155',
      preLoader: false,
      question: {},
      answers: [],
      form: {
        title: '',
        current_answer: false
      },
      btnLoader: false,
      btnLoaderUpdate: false,
      activeAnswer: {},
      activeImg: ''
    }
  },
  methods: {
    searchHash () {
      if (isEmpty(this.hash)) {
        toastr.error('Hash не може бути пустим!')

        return false
      }

      this.preLoader = true

      api.searchHash(this.hash)
        .then(res => {
          if (res.data.success) {
            let data = res.data.data

            if (data.question) {
              this.answers = data.answers
              this.question = data.question
            }
          }

          this.preLoader = false
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    },
    addAnswer () {
      if (isEmpty(this.form.title)) {
        toastr.error('Поле не може бути пустим!')

        return false
      }

      this.btnLoader = true

      api.addAnswer({...this.form, id_question: this.question.id})
        .then(res => {
          this.answers.push(res.data.data.answer)
          this.form.title = ''

          this.btnLoader = false
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    },
    deleteAnswer (id) {
      api.deleteAnswer(id)
        .then(res => {
          if (res.data.success) {
            let index = this.answers.findIndex(i => i.id === id)
            this.$delete(this.answers, index)

            toastr.success(res.data.message)
          } else {
            toastr.success(res.data.message)
          }
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    },
    updateAnswer () {
      if (isEmpty(this.activeAnswer.title)) {
        toastr.error('Поле не може бути пустим!')

        return false
      }

      this.btnLoaderUpdate = true
      let params = {
        title: this.activeAnswer.title,
        id: this.activeAnswer.id
      }

      api.updateAnswer(params)
        .then(res => {
          if (res.data.success) {
            let index = this.answers.findIndex(i => i.id === params.id)
            this.answers[index] = res.data.data.answer

            toastr.success(res.data.message)
          } else {
            toastr.error(res.data.message)
          }

          this.btnLoaderUpdate = false
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    },
    // photo view modal functions
    toggleModal (imgPath = '') {
      if (!isEmpty(imgPath)) {
        this.activeImg = this.getServerName + imgPath
        let modal = this.photoViewModal()

        modal.classList.toggle('photo-view-modal-show-or-hide')
      }
    },
    bindWindowClick (event) {
      let modal = this.photoViewModal()

      if (event.target === modal) {
        modal.classList.toggle('photo-view-modal-show-or-hide')
      }
    },
    photoViewModal () {
      return document.querySelector('.photo-view-modal')
    } // end view modal functions
  },
  computed: {
    isIssetQuestion () {
      if (isEmpty(this.question)) {
        return false
      }

      return true
    },
    getServerName () {
      return config.serverNameDomain
    }
  },
  created () {
    window.addEventListener('click', this.bindWindowClick)
  },
  components: {
    preLoader
  }
}
</script>
