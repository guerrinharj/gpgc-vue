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
    background-color: black;
    padding: 0;
    margin: 0;
    text-transform: lowercase;
  }

  body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
}


  #app {
    background: black;
    color: white;
    min-height: 100vh;
  }

  a {
    color: inherit; /* Inherits the text color from the parent element */
    text-decoration: none; /* Removes the underline */
  }

  a:hover {
    text-decoration: underline; /* Optional: Add underline on hover */
  }

  .router-link-active {
    font-weight: bold; /* Make the text bold */
    text-decoration: underline; /* Optional: Add underline */
    color: white; /* Ensure active links are visible */
  }
</style>
