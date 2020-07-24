<template>
    <div class="col l4 image-container"
            @mouseover="active = true"
            @mouseout="active = false">
        <img class="image" 
            :src="image.regular">
        <div class="onHover" 
            :class="{active: active}">
            <a @click.prevent="addToFavorites"
                 href="#">
                 <i class="material-icons">stars</i>
            </a>
            <a target="blank" 
                :href="image.regular">
                <i class="material-icons">file_download</i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'imageBlock',

    data() {
        return {
            active: false
        }
    },

    methods: {
        async addToFavorites(event) {
            const urls = {
                regular: this.image.regular,
                full: this.image.regular,
                id: this.image.id
            }

            try {
                const element = await this.$store.getters.getFavoritePhotos
                                            .find(el => el.id === urls.id)

                if(!element) {
                    await this.$store.dispatch('addToFavorites', urls)
                    this.$message('Добавлено в избранные')
                } else {
                    await this.$store.dispatch('deleteFromFavorites', element.dataBaseID)
                    this.$message('Удалено из избранных')
                }
            } catch(e) {}
        }
    },

    props: {
        image: {
            type: Object
        }
    }
}
</script>

<style lang="less">

    .image-container{
        position: relative;
        transition: all 0.4s;

        & .image{
            max-width: 95%;
            max-height: 100%;
        }

        &:hover,
        &:active{
            transform: scale(0.95);
        }
    }

    .onHover{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        align-items: center;
        justify-content: center;
        background-color: #26a69a;
        padding: 5px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        transition: all 0.4s;

        & a{
            margin: 0 20px;
            color: #fff;
        }

        & a.like{
            color: yellow;
        }

        & a:hover{
            margin: 0 20px;
            transform: scale(1.1);
            color: yellow;
        }

        &.active{
            display: flex;
        }
    }

</style>