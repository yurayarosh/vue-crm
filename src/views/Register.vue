<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <v-input
        type="text"
        label="Email"
        :inputClasses="{ 'invalid': $v.email.$error }"
        :hasError="$v.email.$error"
        v-model.trim="email"
      />
      <v-input
        type="password"
        label="Пароль"
        :inputClasses="{ 'invalid': $v.password.$error }"
        :hasError="$v.password.$error"
        v-model.trim="password"
      />
      <v-input
        type="text"
        label="Имя"
        :inputClasses="{ 'invalid': $v.name.$error }"
        :hasError="$v.name.$error"
        v-model.trim="name"
      />
      <div>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
        </label>
        <p v-show="$v.agree.$error" class="helper-text invalid"><small>Поле обязательно</small></p>
      </div>
    </div>
    <div class="card-action">
      <div>
        <v-btn class="auth-submit" icon="send">Зарегистрироваться</v-btn>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators/'
import VInput from '@/components/form/VInput'
import VBtn from '@/components/VBtn'

export default {
  name: 'register',
  mixins: [validationMixin],
  components: {
    VInput,
    VBtn
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    name: {
      required,
    },
    agree: {
      argree: checked => checked,
    },
  },
  methods: {
    async onSubmit() {
      if (this.$v.invalid) {
        this.$v.$touch()
        return
      }

      try {
        const response = await this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
        })

        if (response.ok) {
          const data = await response.json()

          const BASE_BILL = 1000

          localStorage.setItem('token', data.idToken)
          localStorage.setItem('userName', this.name)
          localStorage.setItem('userId', data.localId)
          localStorage.setItem('userBill', BASE_BILL)

          this.$store.commit('setUser', {
            name: this.name,
            id: data.localId,
            bill: BASE_BILL,
          })

          const userData = {
            name: this.$store.state.auth.userName,
            bill: this.$store.state.auth.userBill,
          }

          await fetch(`https://vue-crm-e390f.firebaseio.com/users/${data.localId}.json`, {
            method: 'POST',
            body: JSON.stringify(userData),
          })

          this.$router.push('/')
        } else {
          this.$toastError('Этот email уже занят')
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
