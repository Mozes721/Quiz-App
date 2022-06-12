<template >
    <v-card
    class="mx-auto mt-5"
    max-width="800" style="background-color: rgba(154, 192, 218, 0.8);"> 
  <v-card-title>
	<h1 class="display-1">Lets check your knowledge?!</h1>
  </v-card-title>
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/quiz.jpg"
    >
    </v-img>
  <v-spacer></v-spacer>
      <v-card-subtitle>
    <h2 class="display-2">
        Select a Level 
    </h2>
      </v-card-subtitle>
	<v-spacer></v-spacer>
    <v-card-actions>
        <v-text-field v-model="question_lenght" name="question_lenght" 
              type="number" class="text-field" label="Question Count minimum 10" 
              min="10" step="50">
        </v-text-field>
    </v-card-actions>
    <v-card-actions>
        <v-radio-group label="Select your difficulty" v-model="level">
          <v-radio
            label="Easy"
            value="easy"
          ></v-radio>
          <v-radio
            label="Medium"
            value="medium"
          ></v-radio>
          <v-radio
            label="Hard"
            value="hard"
          ></v-radio>
        </v-radio-group>
      </v-card-actions>
      <v-card-actions>
        <v-select
        v-model="question_type"
          :items="items"
          label="Multiple Choise or boolean as True / False questions"
        ></v-select>
      </v-card-actions>
    <v-card-actions>
      <v-btn elevation="2"  color="success" :disabled="validated ? '' : disabled" @click="Selected">
      <router-link style="text-decoration: none; color: inherit;" to='/quiz' >
        Start Game!
      </router-link>
      </v-btn>
    </v-card-actions>
  </v-card>

</template>


<script>
  export default {
   data () {
      return {
        question_lenght: '',
        level: '',
        question_type: '',
        items: [
          'multiple',
          'boolean',
        ],
        selection: []
      } 
   },
   methods: {
    Selected () { 
      this.selection.push(this.question_lenght, this.level, this.question_type)
      this.$store.commit("getData", this.selection);
    },

   },
   computed: {
    validated() {
      if (this.question_type !== '' && this.level !== '' && this.question_lenght !== '' &&  this.question_lenght >= 10) {
      	return false
      }
      else {
        return true
      }
    },

  }
  }
</script>
