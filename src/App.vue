<template>
  <v-app class="red">
    <router-view></router-view>
  </v-app>
</template>

<script>
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import Result from './views/Result.vue'
export default {
  name: 'App',
  components: {
    Home,

  },
  data: () => ({
  }),
}
</script>
