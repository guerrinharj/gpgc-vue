<template>
    <div class="artists-page">
        <ArtistItem
            v-for="artist in artists"
            :key="artist.id"
            :artist="artist"
            :is-active="activeArtistId === artist.id"
            @toggle="toggleArtist(artist.id)"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ArtistItem from '@/components/ArtistItem.vue';

export default {
    name: 'ArtistsPage',
    components: { ArtistItem },
    data() {
        return {
            activeArtistId: null, // Tracks which artist's releases are visible
        };
    },
    computed: mapState(['artists']),
    created() {
        this.$store.dispatch('fetchArtists');
    },
    methods: {
        toggleArtist(artistId) {
            // If the clicked artist is already active, hide it
            this.activeArtistId = this.activeArtistId === artistId ? null : artistId;
        },
    },
};
</script>

<style>
.artists-page {
    background: black;
    color: white;
    text-align: center;
}
</style>
