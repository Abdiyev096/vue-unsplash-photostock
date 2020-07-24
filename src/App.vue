<template>
  <div id="app">
    <component :is="getLayout">
        <router-view></router-view>
    </component>
  </div>
</template>


<script>
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export default {
  computed: {
    getLayout() {
      return this.$route.meta.layout ? this.$route.meta.layout : AuthLayout
    }
  },

  components: {
    AuthLayout,
    MainLayout
  }
}
</script>

<style lang="less">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';

.slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>
