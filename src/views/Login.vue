<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <v-input
        type="text"
        label="Email"
        :inputClasses="{ invalid: $v.email.$error }"
        :hasError="$v.email.$error"
        v-model.trim="email"
      />
      <v-input
        type="password"
        label="Пароль"
        :inputClasses="{ invalid: $v.password.$error }"
        :hasError="$v.password.$error"
        v-model.trim="email"
      />
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators/'
import VInput from '@/components/form/VInput'
import messages from '@/utils/messages'

export default {
  name: 'login',
  mixins: [validationMixin],
  components: {
    VInput,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  mounted() {
    const { message } = this.$route.query    
    if(messages[message]) this.$toastMessage(messages[message])    
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(4),
    },
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
      }
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.log('error', formData)
      } else {
        console.log('success', formData)
      }
    },
  },
}
</script>
