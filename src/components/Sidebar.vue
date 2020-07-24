<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
            <router-link
                        to="/"
                        tag="li"
                        active-class="active"
                        exact>
                <a href="#" class="waves-effect waves-orange pointer">Поиск изображений</a>
            </router-link>
            <router-link
                        to="/favorites"
                        tag="li"
                        active-class="active"
                        exact>
                <a href="#" class="waves-effect waves-orange pointer">Избранные изображения</a>
            </router-link>
            <router-link
                        to="/history"
                        tag="li"
                        active-class="active"
                        exact>
                <a href="#" class="waves-effect waves-orange pointer">История поиска</a>
            </router-link>
    </ul>
</template>

<script>
export default {
    props: ['value']
}
</script>