<template>
        <div>
            <div class="page-title">
                <h3 class="main-title">Unsplash Фотосток</h3>
            
                <div class="input-field photo-search">
                    <input id="last_name" type="text" class="validate" v-model="keyword">
                    <label for="last_name">Поиск</label>
                </div>
                <button class="btn"
                        @click="search">Поиск</button>

            </div>
            <transition name="slide" mode="out-in">
            <Loader v-if="loading"/>
            <div class="row" v-else>
                <ImageBlock v-for="image in images"
                            :key="image.id"
                            :image="image"/>
            </div>
            </transition>
            <button class="btn more-btn"
                        v-show="images.length"
                        :disabled="noMorePages"
                        @click.prevent="showMore">{{noMorePages ? 'Больше изображений нет' : 'Показать еще'}}</button>
        </div>
</template>

<script>
import ImageBlock from '../components/ImageBlock'

export default {
    name: 'Home',

    data() {
        return {
            loading: false,
            images: [],
            keyword: '',
            showPage: 2,
            noMorePages: false
        }
    },

    methods: {
        async search() {
            try {
                this.loading = true
                this.noMorePages = false
                this.showPage = 2
                this.images = await this.$store.dispatch('fetchImages', this.keyword)
                this.loading = false
                await this.$store.dispatch('addToHistory', this.keyword)
            } catch(e) {}
        },

        async showMore() {
            if(this.$store.getters.getTotalPages >= this.showPage) {
                const data = {
                    keyword: this.keyword,
                    pageNum: this.showPage
                }
                const imgs = await this.$store.dispatch('fetchMoreImages', data)
                this.images = [...this.images, ...imgs]
                this.showPage++
            } else {
                this.noMorePages = true
            }
        }
    },

    mounted() {
        if(this.$route.query.message == 'welcome') {
            this.$message("Добро пожаловать")
        }
    },

    beforeDestroy() {
        console.log('destroy')
    },

    components: {
        ImageBlock
    }
}
</script>

<style lang="less">
    .page-title{
        align-items: center;
        justify-content: center;
        flex-direction: column;
        & h3{
            text-align: center;
        }

        & button {
            margin-top: 1em;
        }
    }

    .photo-search {
        width: 60%;
        & input{
            text-align: center;
        }
    }

    .more-btn {
        display: block;
        margin: 0 auto;
    }

</style>