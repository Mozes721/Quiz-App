<template>
     <v-card
    class="mx-auto mt-5 "
    max-width="800"
    elevation="4"> 
  <v-card-title style="background-color: #81D4FA" primary-title class="justify-center rounded-card mb-1">  
	<h1 class="font-weight-thin">Multiple Choice Quiz</h1>
  </v-card-title>
  <v-card-text primary-title class="pt-2">
    <p>Currently answering question Nr:{{this.currentIndex +1}}</p>
  </v-card-text>
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/multiple_choice.jpg"
      
    >
    </v-img>
  <v-spacer></v-spacer>
     <v-card style="background-color: #E1F5FE">

     <v-card-text v-if="loading">
        <h4 class="justify-center font-italic" >Data is being loaded one moment please...</h4>
    </v-card-text>
    <v-card-text v-else>
        <h4 class="justify-center font-italic" >{{this.currentQuestion}}</h4>
    </v-card-text>
      <v-spacer></v-spacer>
        <v-card-actions rules="required">
          <v-radio-group v-model="answered">
              <v-radio
                v-for="n in this.shuffledAnswers"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>
        </v-card-actions>
    </v-card>
    <v-card-actions class="d-flex justify-space-around">
    <v-btn @click="exit"
      elevation="2"
      color="error"
      size="x-large"
    >
      Exit
    </v-btn>
    <v-btn @click="next"
    elevation="2"
    color="green"
    size="x-large"
   
    >
      Next
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
    props:
        ['quizArr'],
    data() {
        return {
            loading: true,
            questions: null,
            currentQuestion: null,
            currentIndex: 0,
            answered: null,
            correctAnswer: null,
            shuffledAnswers: [],
            correct: 0
        }
    }, 
    watch: {
      currentQuestion() {
        this.answered = false
      }
    },
  methods: {
            getAPIquestions: function() {
                let link = 'https://opentdb.com/api.php?'
                let quiz = 'amount='+this.quizArr[0]+'&difficulty='+this.quizArr[1]+'&type='+this.quizArr[2]
                let url = link.concat(quiz)
                console.log(url)
                return axios
                .get(url)
                .then(response => (this.questions = response))
                .catch(function(err){
                    console.log("Trivia Error: " + err);
                })
            },
        getQuestion: function() {
            let question = this.questions.data.results[this.currentIndex].question
            if (question.includes(('&quot;'))) {
                this.currentQuestion = question.replace(/(&quot\;)/g,"\ ")
            }  
            else if (question.includes('&#039;')) {
                this.currentQuestion = question.replace(/(&#039\;)/g,"\'")
            }  
            else {
                this.currentQuestion = question
            }
            this.loading = false
        },
        getChoices: function() {
             this.correctAnswer = this.questions.data.results[this.currentIndex].correct_answer
             let answers = [...this.questions.data.results[this.currentIndex].incorrect_answers,this.questions.data.results[this.currentIndex].correct_answer]
             if (answers.includes('&quot;')) {
                answer = answer.replace(/(&quot\;)/g,"\ ")
            }  
            else if (answers.includes('&#039;')) {
                answer = answer.replace(/(&#039\;)/g,"\'")
            }
      
             this.shuffledAnswers = _.shuffle(answers)
        },
    
        answerClass: function() {
          if(!this.correctAnswer && !this.answered){
            return
          }
          if(this.correctAnswer === this.answered) {
          this.correct++
          }
          else if (this.correctAnswer !== this.answered){
          console.log("incorrect")
          }
          console.log(this.correct)
        },
        next: function() {
            if (!this.answered) {
              this.answerClass()
              alert("You didn't select a value")
              return
            }
            if (this.currentIndex >= parseInt(this.quizArr[0] - 1)) {
                this.answerClass()
                this.$store.commit("updateResults", this.correct)
                this.$router.push("/result")
            } else {
                this.answerClass()
                this.currentIndex++
                this.getQuestion()
                this.getChoices()
                console.log(this.correctAnswer)
            }
        },
        exit: function() {
          this.$router.push("/")
        }
        },
      mounted: async function() {
        await this.getAPIquestions()
        this.getQuestion()
        this.getChoices()
      }
}

</script>