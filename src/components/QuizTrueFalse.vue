<template>
     <v-card
    class="mx-auto mt-5"
    max-width="800" style="background-color: rgba(154, 192, 218, 0.8);"> 
  <v-card-title>
	<h1 class="display-1">True False Choice Quiz</h1>
  <v-spacer></v-spacer>
  <p>Currently answering question Nr:{{this.currentIndex +1}}</p>
  </v-card-title>
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/true_false.jpg"
    >
    </v-img>
  <v-spacer></v-spacer>
      <v-subheader>
        <h2>{{this.currentQuestion}}</h2>
      </v-subheader>
	<v-spacer></v-spacer>
    <v-card-actions>
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
    <v-card-actions>
      <v-btn @click="exit"
      class="mr-4"
    >
      Exit
    </v-btn>
    <v-btn @click="next">
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