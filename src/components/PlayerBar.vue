<template>
    <div class="player-bar" v-if="currentTrack">
        <div class="progress-bar" @click="seekTrack($event)">
            <div class="progress" :style="{ width: progressWidth }"></div>
            <div
                class="progress-handle"
                :style="{ left: progressWidth }"
                @mousedown="startDragging"
            ></div>
        </div>
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
        progressWidth() {
            if (this.audioDuration === 0) return '0%';
            return `${(this.audioCurrentTime / this.audioDuration) * 100}%`;
        },
    },
    data() {
        return {
            isPlaying: false,
            audioCurrentTime: 0,
            audioDuration: 0,
            isDragging: false, // To track if the handle is being dragged
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
            this.audioDuration = audio.duration || 0;

            if (!this.isPlaying) {
                audio.play().catch((error) => {
                    console.error("Error auto-playing audio:", error);
                });
                this.isPlaying = true;
            }
        },

        updateProgress() {
            if (!this.isDragging) {
                const audio = this.$refs.audio;
                this.audioCurrentTime = audio.currentTime;
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
            this.stopPlayer();
        },

        playNext() {
            this.playNextTrack();
        },

        playPrevious() {
            this.playPreviousTrack();
        },

        navigateToRelease() {
            if (this.currentTrack?.releaseSlug) {
                this.$router.push(`/releases/${this.currentTrack.releaseSlug}`);
            }
        },

        seekTrack(event) {
            const audio = this.$refs.audio;
            const progressBar = event.currentTarget;
            const rect = progressBar.getBoundingClientRect();
            const clickPosition = event.clientX - rect.left;
            const newTime = (clickPosition / rect.width) * this.audioDuration;

            audio.currentTime = newTime;
            this.audioCurrentTime = newTime;
        },

        startDragging() {
            this.isDragging = true;
            window.addEventListener('mousemove', this.dragHandle);
            window.addEventListener('mouseup', this.stopDragging);
        },

        dragHandle(event) {
            if (!this.isDragging) return;

            const progressBar = document.querySelector('.progress-bar');
            const rect = progressBar.getBoundingClientRect();
            const dragPosition = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
            const newTime = (dragPosition / rect.width) * this.audioDuration;

            this.audioCurrentTime = newTime;
        },

        stopDragging() {
            if (!this.isDragging) return;

            const audio = this.$refs.audio;
            audio.currentTime = this.audioCurrentTime;
            this.isDragging = false;

            window.removeEventListener('mousemove', this.dragHandle);
            window.removeEventListener('mouseup', this.stopDragging);
        },
    },
    watch: {
        currentTrack(newTrack) {
            if (newTrack && this.$refs.audio) {
                const audio = this.$refs.audio;
                audio.src = newTrack.url;
                audio.load();
                audio.oncanplay = () => {
                    audio.play().catch((error) => {
                        console.error('Error playing new track:', error);
                    });
                    this.isPlaying = true;
                };
            }
        },
    },
    mounted() {
        this.loadRelease();
    },
};
</script>









<style>
.player-bar {
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


.player-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: black;
    color: white;
    padding: 10px 20px;
    z-index: 1000;
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px; /* Height of the progress bar */
    background: #444; /* Background color for the bar */
    overflow: hidden;
}

.progress {
    height: 100%;
    background: linear-gradient(to right, #f06, #f90, #0f0); /* Gradient color */
    transition: width 0.1s ease-in-out;
}


</style>