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
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  letter-spacing: -2px;
  background-color: black;
  padding: 4vh;
  margin: 0;
  -webkit-font-smoothing: antialiased; /* Smooth fonts for WebKit browsers */
  -moz-osx-font-smoothing: grayscale; /* Smooth fonts for macOS */
  max-width: 100vw;
}

h1 {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
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
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  text-align: center;
  overflow-x: hidden;
}

a {
  color: inherit; 
  text-decoration: none; 
}

a:hover {
  text-decoration: underline;
}

.router-link-active {
  font-weight: bold; 
  text-decoration: underline; 
  color: white; 
}

ol {
    display: block;
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    unicode-bidi: isolate;
}


button {
  all: unset;
}

@media (max-width: 768px) {
  body {
    padding: 2vh 0 !important;
  }
}

</style>
