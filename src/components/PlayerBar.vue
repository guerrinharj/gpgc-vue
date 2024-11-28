<template>
    <div class="player-bar" v-if="track">
        <p>{{ track.name }}</p>
        <audio ref="audio" :src="track.url" @timeupdate="updateProgress"></audio>
        <div class="controls">
        <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        <button @click="stopPlayer">Stop</button>
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
    stopPlayer() {
    const audio = this.$refs.audio;
    audio.pause();
    audio.currentTime = 0;
    this.isPlaying = false;
    this.stopPlayer(); // Dispatch Vuex action to hide the player
    },
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
padding: 10px;
z-index: 1000;
display: flex;
justify-content: space-between;
align-items: center;
}
</style>