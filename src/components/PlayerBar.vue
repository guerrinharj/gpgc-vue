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
            <div class="player-bar-wrapper">
                <div class="track-info">
                    <div class="player-artist">
                        <p @click="navigateToRelease" class="clickable">{{ currentTrack.artist }}  &nbsp; &nbsp; </p>
                    </div>
                    <div class="player-track">
                        <span><strong @click="navigateToRelease" class="clickable">{{ currentTrack.name }}</strong></span>
                    </div>
                </div>
                <div class="controls">
                    <div class="play-controls">
                        <!-- Play/Pause Button -->
                        <button @click="togglePlay">
                            <font-awesome-icon
                                :icon="isPlaying ? 'pause' : 'play'"
                            />
                        </button>

                        <!-- Stop Button -->
                        <button @click="stopAudio">
                            <font-awesome-icon icon="stop"/>
                        </button>

                        <!-- Previous Button -->
                        <button @click="playPrevious">
                            <font-awesome-icon icon="backward"  />
                        </button>

                        <!-- Next Button -->
                        <button @click="playNext">
                            <font-awesome-icon icon="forward" />
                        </button>
                    </div>
                    <div class="volume-control">
                        <label for="volume-slider"></label>
                        <input
                            ref="volumeSlider"
                            id="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            v-model="volume"
                            @input="adjustVolume"
                            :style="volumeGradient"
                        />
                    </div>
                </div>
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
        volumeGradient() {
            const percentage = this.volume * 100;
            return {
                background: `linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet, grey ${percentage}%)`,
            };
        },
    },
    data() {
        return {
            isPlaying: false,
            audioCurrentTime: 0,
            audioDuration: 0,
            isDragging: false,
            volume: 1, 
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
                audio.play().catch((error) => console.error('Error auto-playing audio:', error));
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
                audio.play().catch((error) => console.error('Error starting playback:', error));
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

        adjustVolume(event) {
            const audio = this.$refs.audio;
            audio.volume = event.target.value;
        },
    },
    watch: {
        '$route.params.slug': 'loadRelease', // React to route parameter changes
        currentTrack(newTrack) {
            if (newTrack && this.$refs.audio) {
                const audio = this.$refs.audio;
                audio.src = newTrack.url;
                audio.load();
                audio.oncanplay = () => {
                    audio.play().catch((error) => console.error('Error playing new track:', error));
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
/* Player bar */
.player-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: black;
    color: white;
    padding: 10px 20px;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.player-bar-content, .player-bar-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.player-bar-content {
    width: 100%
}

.player-bar-wrapper {
    width: 80%;
    margin: auto;
}

.track-info {
    display: flex; /* Use flexbox to layout the children */
    align-items: center; /* Align items vertically */
    justify-content: space-between; /* Space out items equally */
}

.track-info span  {
    cursor: pointer;
}

.track-info span:hover {
    text-decoration: underline;
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: #444;
}

.progress {
    height: 100%;
    background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
    transition: width 0.1s ease-in-out;
}

.progress-handle {
    position: absolute;
    top: -3px;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
}

/* Controls */
.controls button {
    background: none;
    border: none;
    color: white;
    font-family: inherit;
    font-size: 16px;
    padding: 8px 16px;
    cursor: pointer;
    text-transform: lowercase;
    transition: color 0.3s ease;
}

.controls button:hover {
    text-decoration: underline;
}

/* Volume slider */
.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
}

.volume-control input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 0px;
    background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
    outline: none;
}

.volume-control input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background: white;
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;
}

.volume-control input {
    width: 100%!important;
    padding: 0.1rem!important;
    border: none!important;
    border-radius: 3px!important;
    background: black;
    color: white;
}


/* Hide elements by default */
.hidden-desktop {
    display: none;
}

.hidden-mobile {
    display: none;
}

@media (max-width: 500px) {

    .player-bar-wrapper {
        width: 85%;
    }

    .controls button {
        padding: 2px;
        margin-bottom: 10px;
    }


    .track-info {
        display: block; /* Maintain block layout for mobile */
        width: 50%; /* Define a consistent width */
        overflow: hidden; /* Hide overflow content */
        text-overflow: ellipsis; /* Add ellipsis for overflowing text */
        white-space: nowrap; /* Prevent text wrapping */
        font-size: 24px;
    }

    .controls {
        width: 50%;
    }

    .controls button {
        padding: 8px;
    }

    .player-track {
        text-align: left;
    }

    .track-info p, .track-info span strong {
        text-align: left;
        margin: 0;
        font-size: 1.4rem;
    }

    .hidden-mobile {
        display: inline;
    }

    .hidden-desktop {
        display: none;
    }
}

</style>
