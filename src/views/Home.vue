<template>
    <v-card
    class="mx-auto mt-4"
    max-width="700" style="background-color: #fff" height="95%"> 
  <v-card-title style="background-color: #81D4FA" primary-title class="justify-center rounded-card mb-1">
    <h1 class="font-weight-thin">Lets check your knowledge?!</h1>
  </v-card-title>
    <v-img
      class="white--text align-end"
      height="150px"
      src="../assets/quiz.jpg"
    >
    </v-img>
  <v-spacer></v-spacer>
      <v-card-subtitle>
    <h2 class="display-1">
        Select a Level 
    </h2>
      </v-card-subtitle>
    <v-card-actions>
        <v-text-field v-model="question_lenght" name="question_lenght" 
              type="number" class="text-field" label="Question Count minimum 10" 
              min="10" step="50">
        </v-text-field>
    </v-card-actions>
    <v-card-actions>
        <v-radio-group  label="Select your difficulty" v-model="level">
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
        <v-select
        v-model="question_type"
          :items="items"
          label="Multiple Choise or boolean as True / False questions"
        ></v-select>
      <v-btn elevation="2"  :loading="loading5"
      color="info"
      class="ma-2 white--text" :disabled="validated ? '' : disabled" @click="Selected">
      <router-link style="text-decoration: none; color: inherit;" to='/quiz' >
        Start Game!
      </router-link>
      </v-btn>
  </v-card>

</template>

<style>
.rounded-card{
  border-radius:5px;
}
</style>

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
