<template>
  <div>
    <v-spacer></v-spacer>
    <main v-if="this.quizArr[2] === 'multiple'" >
      <QuizMultipleChoice v-bind:quizArr="quizArr" />
    </main>
    <main v-else-if="this.quizArr[2] === 'boolean'" >
      <QuizTrueFalse  v-bind:quizArr="quizArr"/>
    </main>
  </div>
</template>

<script>
import QuizMultipleChoice from '../components/QuizMultipleChoice.vue';
import QuizTrueFalse from '../components/QuizTrueFalse.vue';
export default {
    data () {
      return {
        quizArr: [],
      } 
   },
    created() {
        var quizType = this.$store.state.data;
        this.quizArr = quizType.split(",");
    },
    components: { QuizMultipleChoice, QuizTrueFalse }
};
</script>