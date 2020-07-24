<template>
    <nav class="navbar orange lighten-1">
            <div class="nav-wrapper">
                <div class="navbar-left">
                    <a href="#" @click.prevent="$emit('toggleHamburger')">
                        <i class="material-icons black-text">dehaze</i>
                    </a>
                </div>

                <ul class="right ">
                    <li>
                        <a
                            class="dropdown-trigger black-text"
                            href="#"
                            data-target="dropdown"
                            ref="dropdown"
                        >
                        {{getUserName}}
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>

                        <ul id='dropdown' class='dropdown-content'>  
                            <li>
                                <a @click.prevent="logout" href="#" class="black-text">
                                <i class="material-icons">assignment_return</i>Выйти
                                </a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',

    data() {
        return {
            dropdown: null
        }
    },

    computed: {
        getUserName() {
            return this.$store.getters.getUserInfo.name
        }
    },

    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.push('/login?message=logout')
        }
    },

    mounted() {
        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: false,
            coverTrigger: false,
            closeOnClick: true
        })
    },

    beforeDestroy() {
        if(this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy()
        }
    }
}
</script>