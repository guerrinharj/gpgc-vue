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
/* Global styles */
body {
  font-family: 'Helvetica', sans-serif;
  letter-spacing: -2px;
  background-color: black;
  padding: 0;
  margin: 0;
  text-transform: lowercase;
  -webkit-font-smoothing: antialiased; /* Smooth fonts for WebKit browsers */
  -moz-osx-font-smoothing: grayscale; /* Smooth fonts for macOS */
  font-size: 23px;
  max-width: 100vw;
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

/* Keyframes for rainbow gradient animation */
@keyframes rainbowGradient {
  0% {
    background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet, white);
    background-size: 400% 400%;
    color: transparent; /* Make the text transparent to show the gradient */
    -webkit-background-clip: text; /* Use the background as text color */
    background-clip: text;
  }
  50% {
    background-position: 100% 0;
    color: white;
  }
  100% {
    color: white;
  }
}

/* Hover effect class */
.hover-rainbow {
  transition: color 2.2s, background 0.2s; /* Smooth transition effect */
}

.hover-rainbow:hover {
  animation: rainbowGradient 7s ease-in-out;
}

/* Keyframes for up-and-down animation */
@keyframes upDown {
  0% {
    transform: translateY(0); /* Start at the original position */
  }
  50% {
    transform: translateY(10px); /* Move up */
  }
  100% {
    transform: translateY(0); /* Return to the original position */
  }
}

/* Up-and-down animation class */
.up-down-effect {
  display: inline-block; /* Inline block for better control */
  transition: transform 0.3s ease-in-out; /* Smooth transition */
}

.up-down-effect:hover {
  animation: upDown 2s ease-in-out; /* Trigger the up-down animation on hover */
}


/* Transition for fading in from black */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 4s, transform 1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(20px); /* Slide in slightly from the bottom */
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0); /* Final position */
}

.release-item {
  margin-bottom: 20px; /* Space between items */
}
</style>

