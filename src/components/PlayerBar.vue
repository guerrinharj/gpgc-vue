<template>
    <div class="player-bar" v-if="track">
        <audio
            ref="audio"
            :src="track.url"
            @loadeddata="onAudioReady"
            @timeupdate="updateProgress"
            @ended="onTrackEnd"
        ></audio>
        <div class="player-bar-content">
            <!-- Artist Name -->
            <div class="player-artist">
                <p @click="navigateToRelease" class="clickable">{{ track.artist }}</p>
            </div>
            <!-- Track Name -->
            <div class="player-track">
                <strong @click="navigateToRelease" class="clickable">{{ track.name }}</strong>
            </div>
            <!-- Controls -->
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
            return this.getCurrentTrack; // Fetch updated track details
        },
    },
    data() {
        return {
            isPlaying: true, // Start playing automatically
        };
    },
    methods: {
        ...mapActions(['stopPlayer', 'fetchRelease']),

        async loadRelease() {
            const slug = this.$route.params.slug;
            try {
                await this.fetchRelease(slug);
            } catch (error) {
                console.error('Error loading release:', error);
                alert('Failed to load release details.');
            }
        },



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
        navigateToRelease() {
            // Navigate to the release page using the releaseSlug
            if (this.track?.releaseSlug) {
                this.$router.push(`/releases/${this.track.releaseSlug}`);
            }
        },
    },
    watch: {
        '$route.params.slug': 'loadRelease', // React to route parameter changes
    },
    created() {
        this.loadRelease(); // Load the release when the component is created
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
    padding: 10px 20px; /* Add some horizontal padding */
    z-index: 1000;
    display: flex;
    justify-content: center; /* Center the player-bar content */
    align-items: center; /* Align items vertically */
}

.player-bar-content {
    display: flex;
    justify-content: space-between; /* Distribute items evenly */
    align-items: center; /* Align items vertically */
    max-width: 800px; /* Limit the width of the bar */
    width: 100%; /* Ensure the content spans the full bar */
    font-size: 20px;
}

.player-artist {
    flex: 1; /* Let the artist name take up equal space */
    text-align: center; /* Align text to the left */
}

.player-track {
    flex: 1; /* Let the track name take up equal space */
    text-align: center; /* Center the track name */
}

.controls {
    font-size: 9px;
    flex: 1; /* Let the controls take up equal space */
    text-align: center; /* Align controls to the right */
}

.controls button {
    background: none; /* Remove default button background */
    border: none; /* Remove default button border */
    color: white; /* Match the text color of the page */
    font-family: inherit; /* Use the page's font */
    font-size: 16px; /* Adjust the font size for consistency */
    padding: 8px 16px; /* Add padding for better clickability */
    cursor: pointer; /* Show a pointer cursor on hover */
    text-transform: lowercase; /* Match the page's text style */
    transition: color 0.3s ease; /* Add a smooth hover effect */
}

.controls button:hover {
    text-decoration: underline; /* Optional: Add underline on hover */
}


.clickable {
    cursor: pointer;
    color: white; /* Highlight the clickable text */
    transition: color 0.3s ease; /* Smooth transition on hover */
}

.clickable:hover {
    text-decoration: underline; /* Underline on hover */
}

</style>