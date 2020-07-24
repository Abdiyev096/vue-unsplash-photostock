<template>
    <div class="grey darken-1 empty-layout">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        error() {
            return this.$store.getters.getError
        }
    },
    watch: {
        error(fbError) {
            if(fbError.code == 'auth/wrong-password') {
                this.$error("Неверный пароль!")
            } 
            else if (fbError.code == 'auth/user-not-found') {
                this.$error("Пользователь с таким email не существует!")
            }
            else if(fbError.code == 'auth/email-already-in-use') {
                this.$error("Данный email уже занят!")
            }
            else {
                this.$error("Что-то пошло не так...")
            }
        }
    }
}
</script>