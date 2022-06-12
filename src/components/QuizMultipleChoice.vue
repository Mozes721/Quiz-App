<template>
    <v-card>
        <h3>Multiple Choise Quiz</h3>
    <p>{{this.info}}</p>
    </v-card>
</template>

<script>
import axios from 'axios'
export default {
    props: ['quizArr'],
    data() {
        return {
            info: null
        }
    }, 
    created() {
        let link = 'https://opentdb.com/api.php?'
        let quiz = 'amount='+this.quizArr[0]+'&difficulty='+this.quizArr[1]+'&type='+this.quizArr[2]
        let url = link.concat(quiz)
        console.log(url);
        axios
        .get(url)
        .then(response => (this.info = response))
  },
  methods: {

      }
}

</script>