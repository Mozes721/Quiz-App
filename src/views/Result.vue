<template>
  <v-container class="py-6 py-lg-12 text-center">
    <h1 class="text-h4 text-sm-h3 text-md-h2 text-lg-h1">Congratiulations your score is as follows</h1>
    <h2 class="text-h6 text-sm-h5 secondary--text mt-4 w-full w-md-8-12 w-xl-half mx-auto">
      Overall {{this.results[1]}}/{{this.results[0]}} correct. In percentage you got {{this.percent}}% correct.</h2>
    <div class="mt-4">
      <v-btn x-large class="my-1 mx-sm-1 w-full w-sm-auto" color="primary" 
      @click="newGame">Play Again</v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  data () {
      return {
        results: [],
        percent: null,

      } 
   },
    created() {
        var quizType = this.$store.state.data;
        var results = this.$store.state.results
        console.log(results);
        var quizArr = quizType.split(",");
        this.results.push(quizArr[0])
        this.results.push(results)
        console.log(this.results)
    },
  methods: {
    newGame: function() {
      this.$router.push('/')
    },
    isWhatPercentOf: function(numA, numB) {
      this.percent = Math.round((numA / numB) * 100);
    },
  },
  mounted: async function() {
    await this.isWhatPercentOf(this.results[1], this.results[0])
  }
}
</script>
