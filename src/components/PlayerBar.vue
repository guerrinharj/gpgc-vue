<template>
    <div class="player-bar" v-if="track">
        <div class="player-bar-content">
            <p>{{ track.name }}</p>
            <audio ref="audio" :src="track.url" @timeupdate="updateProgress"></audio>
            <div class="controls">
                <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
                <button @click="stopAudio">Stop</button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
props: ['track'],
data() {
    return {
        isPlaying: false,
    };
},
methods: {
    ...mapActions(['stopPlayer']),
    togglePlay() {
        const audio = this.$refs.audio;
        if (this.isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        this.isPlaying = !this.isPlaying;
    },
    stopAudio() { // Rename this method to avoid conflict with Vuex action
        const audio = this.$refs.audio;
        audio.pause();
        audio.currentTime = 0;
        this.isPlaying = false;
        this.stopPlayer(); // Dispatch the Vuex action to hide the player
    },
},
};
</script>

<style>
.player-bar {
    border-top: solid 1px white;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: black;
    color: white;
    padding: 10px;
    z-index: 1000;
    display: flex;
    justify-content: center; /* Center the flex container content */
}

.player-bar-content {
    display: flex;
    justify-content: space-between; /* Space out items in the content */
    align-items: center; /* Align items vertically */
    max-width: 400px; /* Set a maximum width for the bar */
    width: 100%; /* Ensure it takes up the full width of the bar */
    margin: auto; /* Center the content horizontally */
}


.player-bar .controls button {
    background: none; /* Remove default button background */
    border: none; /* Remove default button border */
    color: white; /* Match the text color of the page */
    font-family: inherit; /* Use the page's font */
    font-size: 16px; /* Adjust the font size for consistency */
    padding: 8px 16px; /* Add some padding for better clickability */
    cursor: pointer; /* Show a pointer cursor on hover */
    text-transform: lowercase; /* Match the page's text style */
    transition: color 0.3s ease; /* Add a smooth hover effect */
}

.player-bar .controls button:hover {
    text-decoration: underline; /* Optional: Add underline on hover */
}

.player-bar .controls button:active {
    color: darkblue; /* Darker color on active press */
}


</style>