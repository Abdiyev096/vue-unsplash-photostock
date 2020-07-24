<template>
    <div class="row">
        <h3 class="center">Избранные фотографии</h3>
        <Loader v-if="loading"/>
        <p class="center" v-else-if="!favorites.length">Избранных фотографии нету</p>
        <div v-else>
            <ImageBlock v-for="image in favorites"
                        :key="image.id"
                        :image="image"/>
        </div>
    </div>
</template>

<script>
import ImageBlock from '../components/ImageBlock'

export default {
    name: 'Favorites',

    data() {
        return {
            loading: true
        }
    },

    computed: {
        favorites() {
            return this.$store.getters.getFavoritePhotos
        }
    },

    async mounted() {
        try {
            await this.$store.dispatch('fetchFavorites')
            this.loading = false
        } catch(e) {}
    },

    components: {
        ImageBlock
    }
}
</script>

