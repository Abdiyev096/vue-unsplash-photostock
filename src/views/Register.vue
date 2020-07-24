<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Мой Фотосток - Регистрация</span>
            <div class="input-field">
            <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{invalid: (!$v.email.required && $v.email.$dirty) || ($v.email.$dirty && !$v.email.email)}"
            >
            <label for="email">Email</label>
            <small 
                class="helper-text invalid"
                v-if="!$v.email.required && $v.email.$dirty">
                Email не должен быть пустым</small>
            <small 
                class="helper-text invalid"
                v-else-if="$v.email.$dirty && !$v.email.email">
                Введите корректный email</small>
            </div>
            <div class="input-field">
            <input
                id="name"
                type="text"
                v-model="name"
                :class="{invalid: !$v.name.required && $v.name.$dirty}"
            >
            <label for="name">Имя</label>
            <small 
                class="helper-text invalid"
                v-if="!$v.email.required && $v.email.$dirty">
                Имя не должен быть пустым</small>
            </div>
            <div class="input-field">
            <input
                id="password"
                type="password"
                v-model="password"
                :class="{invalid: (!$v.password.required && $v.password.$dirty) || ($v.password.$dirty && !$v.password.minLength)}"
            >
            <label for="password">Пароль</label>
            <small  v-if="!$v.password.required && $v.password.$dirty" 
                    class="helper-text invalid
                    ">Пароль не должен быть пустым</small>
            <small  v-else-if="$v.password.$dirty && !$v.password.minLength" 
                    class="helper-text invalid
                    ">Пароль должен быть больше 6 символов</small>
            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                Войти
                <i class="material-icons right">send</i>
            </button>
            </div>

            <p class="center">
            Уже есть аккаунт?
            <router-link to="/login">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
    name: 'Login',

    data() {
        return {
            email: '',
            password: '',
            name: ''
        }
    },

    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try {
                await this.$store.dispatch('register', {
                    email: this.email,
                    password: this.password,
                    name: this.name
                })

                this.$router.push('/?message=welcome')
            } catch(e) {}
            
        }
    },

    validations: {
        email: {
            email,
            required
        },

        name: {
            required
        },

        password: {
            required,
            minLength: minLength(6)
        }
    }
}
</script>