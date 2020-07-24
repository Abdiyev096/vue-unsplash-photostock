<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Мой Фотосток - Логин</span>
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
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
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
            password: ''
        }
    },

    methods: {
        async submitHandler() {
            if(this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try {
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })

                this.$router.push('/?message=welcome')
            } catch(e) {}
            
        }
    },

    mounted() {
        if(this.$route.query.message == 'logout') {
            this.$message('Вы вышли из системы')
        }

        if(this.$route.query.message == 'login') {
            this.$message('Нужно залогиниться сначало')
        }
    },

    validations: {
        email: {
            email,
            required
        },

        password: {
            required,
            minLength: minLength(6)
        }
    }
}
</script>

<style lang="less">

    .auth-card{
        width: 40%;
    }

    @media (max-width: 900px) {
       .auth-card{
            width: 55%;
        } 
    }

    @media (max-width: 700px) {
       .auth-card{
            width: 70%;
        } 
    }

</style>