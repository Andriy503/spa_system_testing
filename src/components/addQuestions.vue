<template>
    <div class="w-100 wrapper-questions">
      <!-- header -->
      <nav class="navbar" id="nav-header-questions">
        <form class="form-inline my-2 my-lg-0" id="form-filter-questions">
          <!-- Educations -->
          <select class="form-control mr-sm-2"
            v-model="activeIdEducation"
          >
            <option value="" disabled selected>Виберіть навчальний підрозділ</option>
            <option v-for="(item, index) in educations" :key="index" :value="item.id">
              {{item.title}}
            </option>
          </select>

          <!-- Departament -->
          <select class="form-control mr-sm-2"
            v-if="activeIdEducation"
            v-model="activeIdDepartament"
          >
            <option value="" disabled selected>Виберіть кафедру</option>
            <option v-for="(item, index) in getDepartaments" :key="index" :value="item.id">
              {{item.title}}
            </option>
          </select>

          <!-- Specialty -->
          <select class="form-control mr-sm-2"
            v-if="activeIdDepartament"
            v-model="activeIdSpecialty"
          >
            <option value="" disabled selected>Виберіть спеціальність</option>
            <option v-for="(item, index) in getSpecialty" :key="index" :value="item.id">
              {{item.title}}
            </option>
          </select>

          <!-- Tickets -->
          <select class="form-control mr-sm-2"
            v-if="tickets.length"
            v-model="activeIdTicket"
          >
            <option value="" disabled selected>Виберіть білет</option>
            <option v-for="(item, index) in getTickets" :key="index" :value="item.id">
              {{item.title}}
            </option>
          </select>

        </form>
        <button
          class="btn btn-success"
          v-if="activeIdTicket"
          data-toggle="modal"
          data-target="#exampleModalCenter"
          @click="selectQuestion({})"
        >
          Додати питання
        </button>
      </nav>

      <!-- table -->
      <div class="block-table" v-if="questions.length">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Питання</th>
              <th scope="col">Фото</th>
              <th scope="col">Рейтинг</th>
              <th scope="col">Кількість балів</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in getQuestions" :key="index">
              <td>{{ item.title }}</td>
              <td>{{ item.pre_img ? '+' : '-' }}</td>
              <td>{{ item.rating }}</td>
              <td>{{ item.points }}</td>
              <td align="right" id="tdTableGetEducations">
                <i
                  class="far fa-edit"
                  @click="selectQuestion(item)"
                  data-toggle="modal"
                  title="Редагувати"
                  data-target="#exampleModalCenter"
                ></i>
                <i
                  class="far fa-trash-alt"
                  title="Видалити"
                  @click="deleteQuestion(item.id)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center playholder-table" v-else>
        <img src="@/assets/search_playcholder.png" alt="" width="100">
        <h2>Нічого не знайдено</h2>
        <h2 >Спробуйте налаштувати фільтри</h2>
      </div>
      <!-- end table -->

      <!-- modal window -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">{{ (!Object.keys(this.activeQuestion).length ? 'Додати' : 'Редагувати') + ' питання' }}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <!-- title -->
              <label for="basic-url">Заголовок</label>
              <textarea type="text"
                class="form-control"
                placeholder="Введіть заголовок"
                v-model="form.title"
                rows="4"
                id="titleArea"
              ></textarea>

              <!-- rating -->
              <label for="basic-url">Рейтинг питання</label>
              <select v-model="form.rating" class="form-control">
                <option value=""></option>
                <option v-for="i in 3" :key="i">
                  {{ i }}
                </option>
              </select>

              <!-- type -->
              <label for="basic-url">Тип питання</label>
              <select class="form-control" v-model="form.id_type">
                <option value=""></option>
                <option v-for="(item, index) in typeQuestions" :key="index" :value="item.id">
                  {{ item.title }}
                </option>
              </select>

              <!-- count scores -->
              <label for="basic-url">Кількість балів</label>
              <input type="number" class="form-control" placeholder="наприклад 5" v-model="form.points">

              <!-- load img -->
              <label for="basic-url">Загрузка зображення</label>
              <input type="file" @change="onLoadFile">

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрити</button>
              <button type="button" class="btn btn-primary" @click="updateQuestion" v-if="Object.keys(this.activeQuestion).length">
                Оновити <i class='fa fa-spinner fa-spin fa-fw' v-if="btnLoader"></i>
              </button>
              <button type="button" class="btn btn-success" @click="saveQuestions" v-else>
                Зберегти <i class='fa fa-spinner fa-spin fa-fw' v-if="btnLoader"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>

// import store from '@/store'
// import toastr from 'toastr'
import isEmpty from 'lodash/isEmpty'
// import 'toastr/build/toastr.min.css'
import api from '@/api'
import '@/css/questions.css'
import {mapState} from 'vuex'

export default {
  name: 'addQuestions',
  data () {
    return {
      activeIdEducation: 0,
      activeIdDepartament: 0,
      activeIdSpecialty: 0,
      activeIdTicket: 0,
      tickets: [],
      questions: [],
      activeQuestion: {},
      btnLoader: false,
      form: {
        title: '',
        pre_img: null,
        rating: 0,
        points: 0,
        id_type: 0
      },
      typeQuestions: [
        {
          id: 1,
          title: 'Одна відповідь'
        },
        {
          id: 2,
          title: 'Багато відповідей'
        },
        {
          id: 3,
          title: 'Відповідність сутностей'
        },
        {
          id: 2,
          title: 'Слово'
        }
      ],
      selectedFile: []
    }
  },
  methods: {
    updateQuestion () {

    },
    saveQuestions () {
      let fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      // fd.append('title', 'Hello world')

      api.saveQuestion(fd)
        .then(res => {
          console.log(res.data)
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    },
    deleteQuestion (id) {
      console.log('delete, id: ' + id)
    },
    selectQuestion (question = {}) {
      this.activeQuestion = question

      if (!isEmpty(this.activeQuestion)) {
        this.form = this.activeQuestion
        console.log(this.activeQuestion)
      } else {
        this.form.title = ''
        this.form.pre_img = null
        this.form.rating = 0
        this.form.points = 0
        this.form.id_type = 0
      }
    },
    onLoadFile (event) {
      this.selectedFile = event.target.files[0]

      console.log(this.selectedFile)
    }
  },
  computed: {
    ...mapState('general', [
      'educations',
      'departaments',
      'specialty'
    ]),
    getDepartaments () {
      return this.departaments.filter(i => i.id_educations === this.activeIdEducation)
    },
    getSpecialty () {
      return this.specialty.filter(i => i.id_departament === this.activeIdDepartament)
    },
    getTickets () {
      return this.tickets
    },
    getQuestions () {
      return this.questions
    }
  },
  watch: {
    activeIdSpecialty () {
      if (this.activeIdSpecialty) {
        api.getTickets(this.activeIdSpecialty)
          .then(res => {
            if (res.data.success) {
              this.tickets = res.data.data.tickets
            }
          })
          .catch(resErr => {
            console.log('Помилка в блоці catch: ', resErr)
          })
      }
    },
    activeIdEducation () {
      this.activeIdDepartament = 0
      this.tickets = []
    },
    activeIdDepartament () {
      this.tickets = []
    },
    activeIdTicket () {
      api.getQuestions(this.activeIdTicket)
        .then(res => {
          if (res.data.success) {
            this.questions = res.data.data.questions
          }
        })
        .catch(resErr => {
          console.log('Помилка в блоці catch: ', resErr)
        })
    }
  },
  created () {
    // !delete
    this.activeIdTicket = 1
  }
}
</script>
