<template>
    <div class="create-bar" v-if="isAuthenticated">
        <button @click="createArtist" class="create-button">Create Artist</button>
        <button @click="createRelease" class="create-button">Create Release</button>
        <button @click="createFeaturing" class="create-button">Create Featuring</button>
        <button @click="createSoundtrack" class="create-button">Create Soundtrack</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "CreateBar",
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    methods: {
        createArtist() {
            this.$router.push('/create-artist');
        },
        createRelease() {
            this.$router.push('/create-release');
        },
        createFeaturing() {
            this.$router.push('/create-featuring');
        },
        createSoundtrack() {
            this.$router.push('/create-soundtrack');
        },
    },
};
</script>

<style>
.create-bar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
    transform: translateY(100%);
}

.create-button {
    text-transform: inherit;
    background-color: black;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    border: solid 1px white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-button:hover {
    background-color: white;
    color: black;
}
</style>
