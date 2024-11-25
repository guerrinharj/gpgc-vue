<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* Add global styles here if needed */

body {
  padding: 0;
  margin: 0;
}
#app {
  background: black;
  color: white;
  min-height: 100vh;
}
</style>
