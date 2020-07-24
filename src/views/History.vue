<template>
     <div>
        <ul class="collection with-header center">
            <li class="collection-header"><h4>История</h4></li>
            <li v-for="(h, index) in history"
                :key="index"
                class="collection-item">{{h}}</li>
        </ul>
     </div>
</template>

<script>
export default {
    name: 'History',

    computed: {
        history() {
            return this.$store.getters.getHistory
        }
    },

    async mounted() {
        try {
            await this.$store.dispatch('fetchHistory')
        } catch(e) {}
    }
}
</script>