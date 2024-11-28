<template>
    <div class="player-bar" v-if="track">
        <div class="player-bar-content">
            <p>{{ track.name }}</p>
            <audio
                ref="audio"
                :src="track.url"
                @loadeddata="onAudioReady"
                @timeupdate="updateProgress"
                @ended="onTrackEnd"
            ></audio>
            <div class="controls">
                <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
                <button @click="stopAudio">Stop</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getCurrentTrack', 'isPlayerVisible']),
        track() {
            return this.getCurrentTrack; // Bind to Vuex state
        },
    },
    data() {
        return {
            isPlaying: true, // Start playing automatically
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
        stopAudio() {
            const audio = this.$refs.audio;
            audio.pause();
            audio.currentTime = 0;
            this.isPlaying = false;
            this.stopPlayer(); // Dispatch Vuex action to hide the player
        },
        onAudioReady() {
            if (this.isPlaying) {
                const audio = this.$refs.audio;
                audio.play(); // Play only after the audio is ready
            }
        },
        onTrackEnd() {
            this.isPlaying = false;
        },
    }
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