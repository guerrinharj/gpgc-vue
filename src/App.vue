<template>
  <div id="app">
    <Navbar />
    <CreateBar />
    <router-view />
    <PlayerBar v-if="isPlayerVisible" :track="getCurrentTrack" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '@/components/NavBar.vue';
import CreateBar from '@/components/CreateBar.vue';
import PlayerBar from '@/components/PlayerBar.vue';

export default {
  components: {
    Navbar,
    CreateBar,
    PlayerBar,
  },
  computed: {
    ...mapGetters(['isPlayerVisible', 'getCurrentTrack']),
  },
};
</script>

<style>
body {
  font-family: math, 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  letter-spacing: -2px;
  background-color: black;
  padding: 0;
  margin: 0;
  text-transform: lowercase;
  -webkit-font-smoothing: antialiased; /* Smooth fonts for WebKit browsers */
  -moz-osx-font-smoothing: grayscale; /* Smooth fonts for macOS */
  max-width: 100vw;
}

.background {
  background-image: url('../src/assets/scan-3.jpeg')!important;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}

body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

#app {
  background: black;
  color: white;
  min-height: 100vh;
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Horizontally center */
  justify-content: center; /* Vertically center */
  text-align: center; /* Center text */
  overflow-x: hidden;
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
