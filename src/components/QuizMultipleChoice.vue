<template>
     <v-card
    class="mx-auto mt-5"
    max-width="800" style="background-color: rgba(154, 192, 218, 0.8);"> 
  <v-card-title>  
	<h1 class="display-1">Multiple Choice Quiz</h1>
  </v-card-title>
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/multiple_choice.jpg"
    >
    </v-img>
  <v-spacer></v-spacer>
      <v-card-subtitle>
        <p>{{this.currentQuestion}}</p>
      </v-card-subtitle>
	<v-spacer></v-spacer>
    <!-- <v-card-actions>
        <v-radio-group label="Select the correct answer" v-model="level">
          <v-radio
            label="first"
            value="asdsad"
          ></v-radio>
          <v-radio
            label="second"
            value="second"
          ></v-radio>
          <v-radio
            label="third"
            value="third"
          ></v-radio>
          <v-radio
            label="forth"
            value="forth"
          ></v-radio>
        </v-radio-group> -->
         <b-list-group>
            <b-list-group-item
            v-for="answer, index in this.shuffledAnswers"
            :key="index"
            :class="answerClass(index)"
            @click="selectAnswer(index)">
          {{ answer }}
        </b-list-group-item>
      </b-list-group>
    <v-card-actions>
     <v-btn
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
import _ from 'lodash'
export default {
    props:
        ['quizArr'],
    data() {
        return {
            questions: null,
            currentQuestion: null,
            currentIndex: 0,
            correctIndex: null,
            shuffledAnswers: [],
            answered: false
        }
    }, 
//   computed: {
//     answers() {
//         return this.shuffelAnswers
//     }
//   },
//   watch: {
//     questions: {
//     handler(data) {
//         if (!data) {
//             console.log(data)
//         }
//     }
//     }
//   },
  methods: {
            getAPIquestions: function() {
                let link = 'https://opentdb.com/api.php?'
                let quiz = 'amount='+this.quizArr[0]+'&difficulty='+this.quizArr[1]+'&type='+this.quizArr[2]
                let url = link.concat(quiz)
                return axios
                .get(url)
                .then(response => (this.questions = response))
                .catch(function(err){
                    console.log("Trivia Error: " + err);
                })
            },
        getQuestion: function() {

            let question = this.questions.data.results[this.currentIndex].question
            if (question.includes('&quot;')) {
                this.currentQuestion = question.replace(/(&quot\;)/g,"\ ")
            }  
            else if (question.includes('&#039;')) {
                this.currentQuestion = question.replace(/(&#039\;)/g,"\'")
            }  
            else {
                this.currentQuestion = question
            }
        },
        getChoices: function() {
             let answers = [...this.questions.data.results[this.currentIndex].incorrect_answers,this.questions.data.results[this.currentIndex].correct_answer]
             if (answers.includes('&quot;')) {
                answer = answer.replace(/(&quot\;)/g,"\ ")
            }  
            else if (answers.includes('&#039;')) {
                answer = answer.replace(/(&#039\;)/g,"\'")
            }
             this.shuffledAnswers = _.shuffle(answers)
             this.correctIndex = this.shuffledAnswers.indexOf(this.questions.data.results[this.currentIndex].correct_answer)
             console.log(this.shuffledAnswers)
        },
    
        answerClass(index) {
            let k = ""
            if(!this.answered && this.selectedIndex === index)
            k = 'selected'
            else if (this.answered && this.correctIndex === index)
            k = 'correct'
            else if (this.answered && this.selectedIndex === index && this.correctIndex !== index)
            k = 'incorrect'
            
            return k
        },
        next: function() {
            if (this.currentIndex >= parseInt(this.quizArr[0] - 1)) {
                alert("your done with questions")
            } else {
                this.currentIndex++
                this.getQuestion()
                this.getChoices()
            }
        },
        },
      mounted: async function() {
        await this.getAPIquestions()
        this.getQuestion()
        this.getChoices()
      }
}

</script>
