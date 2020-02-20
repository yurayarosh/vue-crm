<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <div class="col s12 m6">
          <v-categorie-form title="Создать" btnTitle="Создать" @submit.prevent="onAddSubmit">
            <v-input
              type="text"
              label="Название"
              errorMessage="Введите название"
              :inputClasses="{ 'invalid': $v.addFormName.$error }"
              :hasError="$v.addFormName.$error"
              v-model.trim="addFormName"
            />

            <v-input
              type="number"
              label="Лимит"
              errorMessage="Минимальная величина"
              :inputClasses="{ 'invalid': $v.addFormLimit.$error }"
              :hasError="$v.addFormLimit.$error"
              v-model.trim="addFormLimit"
            />
          </v-categorie-form>
        </div>

        <div class="col s12 m6">
          <v-categorie-form
            title="Редактировать"
            btnTitle="Обновить"
            @submit.prevent="onChangeSubmit"
          >

            <v-select
              ref="select"
              label="Выберите категорию"
              v-model.trim="addFormCategorie"
            >
              <option value="1" selected>Category</option>
              <option value="2">Category 1</option>
            </v-select>
            <v-input
              type="text"
              label="Название"
              errorMessage="Введите название"
              :inputClasses="{ 'invalid': $v.changeFormName.$error }"
              :hasError="$v.changeFormName.$error"
              v-model.trim="changeFormName"
            />

            <v-input
              type="number"
              label="Лимит"
              errorMessage="Минимальная величина"
              :inputClasses="{ 'invalid': $v.changeFormLimit.$error }"
              :hasError="$v.changeFormLimit.$error"
              v-model.trim="changeFormLimit"
            />
          </v-categorie-form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import M from 'materialize-css'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators/'
import VCategorieForm from '@/components/form/VCategorieForm'
import VInput from '@/components/form/VInput'
import VSelect from '@/components/form/VSelect'

export default {
  name: 'Categories',
  components: {
    VCategorieForm,
    VInput,
    VSelect,
  },
  mixins: [validationMixin],
  data: () => ({
    addFormName: '',
    addFormLimit: '',
    changeFormName: '',
    changeFormLimit: '',
    addFormCategorie: ''
  }),
  methods: {
    onAddSubmit() {
      this.$v.addFormName.$touch()
      this.$v.addFormLimit.$touch()

      if (this.$v.addFormName.$invalid || this.$v.addFormLimit.$invalid ) {
        console.log('error')

        return
      }

      console.log('success')
    },
    onChangeSubmit() {
      this.$v.changeFormName.$touch()
      this.$v.changeFormLimit.$touch()

      this.select = M.FormSelect.getInstance(this.$refs.select.$el.querySelector('select'))

      if (this.$v.addFormName.$invalid || this.$v.addFormLimit.$invalid ) {
        console.log('error')

        return
      }

      console.log('success')
    }
  },
  validations: {
    addFormName: {
      required,
    },
    addFormLimit: {
      required,
    },
    changeFormName: {
      required,
    },
    changeFormLimit: {
      required,
    }
  },
}
</script>

