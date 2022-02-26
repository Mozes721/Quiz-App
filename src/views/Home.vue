<template>

	  <v-card
    class="mx-auto mt-5"
    max-width="400"
    
  >
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
      Select a Level and a Username
	</h2>
    </v-card-subtitle>
	<v-spacer></v-spacer>
	
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"

      required
    ></v-text-field>

    <v-card-actions>
      <v-btn
      :disabled="!valid"
      color="yellow"
      class="mr-4"
      @click="validate"
    >
      Easy
    </v-btn>

    <v-btn
      color="warning"
      class="mr-4"
      @click="reset"
    >
      Medium
    </v-btn>

    <v-btn
      color="error"
      @click="resetValidation"
    >
      Hard
    </v-btn>
    </v-card-actions>
    <v-card-actions>
    <v-btn
      color="success"
      @click="resetValidation" 
    >
    <router-link to='/quiz'>
      Start Game!
    </router-link>
    </v-btn>
    </v-card-actions>
  </v-card>

</template>
<style scoped>
.v-text-field{
      display: block;
	margin-right: auto;
	margin-left: auto;
      width: 350px;
}
</style>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    })
  }
</script>
