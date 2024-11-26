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
        ...mapGetters(['isAuthenticated']), // Use Vuex to check if the user is authenticated
    },
    methods: {
        createArtist() {
            console.log('Create Release button clicked');
            // Add Vuex or routing logic here
            this.$router.push('/create-artist'); // Example: Navigate to a route
        },
        createRelease() {
            console.log('Create Release button clicked');
            // Add Vuex or routing logic here
            this.$router.push('/create-release'); // Example: Navigate to a route
        },
        createFeaturing() {
            console.log('Create Featuring button clicked');
            // Add Vuex or routing logic here
            this.$router.push('/create-featuring'); // Example: Navigate to a route
        },
        createSoundtrack() {
            console.log('Create Soundtrack button clicked');
            // Add Vuex or routing logic here
            this.$router.push('/create-soundtrack'); // Example: Navigate to a route
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
