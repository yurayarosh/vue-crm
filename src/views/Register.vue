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
        v-model.trim="password"
      />
      <v-input
        type="text"
        label="Имя"
        :inputClasses="{ invalid: $v.name.$error }"
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
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
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

export default {
  name: 'register',
  mixins: [validationMixin],
  components: {
    VInput,
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
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
      argree: checked => checked
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$v.agree);
      
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
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
