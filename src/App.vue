<template>
  <div id="app">
    <Navbar />
    <CreateBar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/NavBar.vue';
import CreateBar from '@/components/CreateBar.vue';

export default {
  components: {
    Navbar, CreateBar
  },
};
</script>

<style>
/* Add global styles here if needed */

  body {
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: black;
    padding: 0;
    margin: 0;
    text-transform: lowercase;
    -webkit-font-smoothing: antialiased; /* Smooth fonts for WebKit browsers */
    -moz-osx-font-smoothing: grayscale; /* Smooth fonts for macOS */
    font-size: 23px;
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
