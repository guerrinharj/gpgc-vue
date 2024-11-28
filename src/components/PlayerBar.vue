<template>
    <div class="player-bar" v-if="currentTrack">
        <audio
            ref="audio"
            :src="currentTrack.url"
            @loadeddata="onAudioReady"
            @timeupdate="updateProgress"
            @ended="playNext"
        ></audio>
        <div class="player-bar-content">
            <div class="player-artist">
                <p @click="navigateToRelease" class="clickable">{{ currentTrack.artist }}</p>
            </div>
            <div class="player-track">
                <strong @click="navigateToRelease" class="clickable">{{ currentTrack.name }}</strong>
            </div>
            <div class="controls">
                <button @click="togglePlay">{{ isPlaying ? 'Play' : 'Pause' }}</button>
                <button @click="stopAudio">Stop</button>
                <button @click="playPrevious">Previous</button>
                <button @click="playNext">Next</button>
            </div>
        </div>
    </div>
</template>






<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['currentTrack', 'isPlayerVisible']),
    },
    data() {
        return {
            isPlaying: false, // Start as not playing
        };
    },
    methods: {
        ...mapActions(['playNextTrack', 'playPreviousTrack', 'stopPlayer', 'fetchRelease']),

        async loadRelease() {
            const slug = this.$route.params.slug;
            try {
                await this.fetchRelease(slug);
            } catch (error) {
                console.error('Error loading release:', error);
                alert('Failed to load release details.');
            }
        },

        onAudioReady() {
            const audio = this.$refs.audio;

            if (!this.isPlaying) {
                // Auto-play if not already playing
                audio.play().catch((error) => {
                    console.error("Error auto-playing audio:", error);
                });
            }
        },

        togglePlay() {
            const audio = this.$refs.audio;
            if (this.isPlaying) {
                audio.pause();
                this.isPlaying = false;
            } else {
                audio.play().catch((error) => {
                    console.error('Error starting playback:', error);
                });
                this.isPlaying = true;
            }
        },
        stopAudio() {
            const audio = this.$refs.audio;
            audio.pause();
            audio.currentTime = 0;
            this.isPlaying = false;
            this.stopPlayer(); // Hide the player bar
        },
        playNext() {
            this.handleTrackSwitch(() => {
                this.playNextTrack();
            });
        },
        playPrevious() {
            this.handleTrackSwitch(() => {
                this.playPreviousTrack();
            });
        },
        navigateToRelease() {
            if (this.currentTrack?.releaseSlug) {
                this.$router.push(`/releases/${this.currentTrack.releaseSlug}`);
            }
        },
        handleTrackSwitch(switchAction) {
            const audio = this.$refs.audio;

            // Pause and reset audio before switching
            audio.pause();
            audio.currentTime = 0;

            // Execute the track switch action
            switchAction();

            // Wait for the DOM to update, then load the new track
            this.$nextTick(() => {
                audio.load(); // Trigger the load process
                audio.oncanplay = () => {
                    // Play only when the audio is ready
                    audio.play().catch((error) => {
                        console.error('Error playing track:', error);
                    });
                    /* this.isPlaying = true; */
                };
            });
        },
    },
    watch: {
        '$route.params.slug': 'loadRelease', // React to route parameter changes
        currentTrack(newTrack) {
            if (newTrack && this.$refs.audio) {
                const audio = this.$refs.audio;
                audio.pause(); // Pause any current playback
                audio.src = newTrack.url; // Update the audio source
                audio.load(); // Prepare the audio element

                audio.oncanplay = () => {
                    // Only start playing when the audio is ready
                    audio.play().catch((error) => {
                        console.error('Error playing new track:', error);
                    });
                    this.isPlaying = true;
                };
            }
        },
    },
    mounted() {
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