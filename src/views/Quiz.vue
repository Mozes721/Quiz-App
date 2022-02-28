<template>
  <div>
    <h3>Component</h3>
    <p>{{$store.state.data}}</p>
  </div>
</template>

<script>
export default {
  computed: {
    usersFromStore() {
      return this.$store.state.data;
    },
  },
};
</script>