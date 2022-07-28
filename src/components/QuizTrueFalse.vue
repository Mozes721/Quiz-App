<template>
     <v-card
    class="mx-auto mt-5"
    max-width="800" 
    elevation="4"> 
  <v-card-title style="background-color: #81D4FA" primary-title class="justify-center rounded-card mb-1">
	<h1 class="font-weight-thin">True False Choice Quiz</h1>
  </v-card-title>
  <v-card-text primary-title class="pt-2">
    <p>Currently answering question Nr:{{this.currentIndex +1}}</p>
  </v-card-text>
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/true_false.jpg"
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
    <v-card-actions style="background-color: #E1F5FE">
        <v-radio-group label="Select the correct answer" v-model="answered">
          <v-radio
            label="True"
            value="True"
          ></v-radio>
          <v-radio
            label="False"
            value="False"
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
             getCorrectAnswer: function() {
             this.correctAnswer = this.questions.data.results[this.currentIndex].correct_answer
             console.log(this.correctAnswer)
        },
          answerClass: function() {
          if(!this.correctAnswer && !this.answered){
            return
          }
          if(this.correctAnswer === this.answered) {
          this.correct++
          }
          else if (this.correctAnswer !== this.answered){
          }

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
  
                console.log(this.correctAnswer)
                console.log(this.answered)
              }
            },
            exit: function() {
          this.$router.push("/")
        }
        },
       mounted: async function() {
        await this.getAPIquestions()
        this.getQuestion()
        this.getCorrectAnswer()
      }
}

</script>