<template>
    <div class="app-main-layout">

        <Navbar @toggleHamburger="isOpen = !isOpen"/>
        <Sidebar v-model="isOpen"/>
        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </main>

    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default {

    data() {
        return {
            isOpen: true
        }
    },

    computed: {
        error() {
            return this.$store.getters.getError
        }
    },

    watch: {
        error(e) {
            this.$error(e)
        }
    },

    async mounted() {
        if(!Object.keys(this.$store.getters.getUserInfo).length) {
            await this.$store.dispatch('fetchUserInfo')
        }
    },
    
    components: {
        Navbar,
        Sidebar
    }
}
</script>