<template>
    <div class="artists-page" @scroll.passive="handleScroll" ref="container">
        <div
            v-for="(artist, index) in artists"
            :key="artist.id"
            :ref="el => itemRefs[index] = el"
            class="artist-wrapper"
        >
            <ArtistItem
                :artist="artist"
                :is-active="activeArtistId === artist.id"
                @toggle="toggleArtist(artist.id)"
            />
        </div>
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
            activeArtistId: null,
            itemRefs: []
        };
    },
    computed: mapState(['artists']),
    mounted() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.handleScroll(); // initialize on load
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    created() {
        this.$store.dispatch('fetchArtists');
    },
    methods: {
        toggleArtist(artistId) {
            this.activeArtistId = this.activeArtistId === artistId ? null : artistId;
        },
        handleScroll() {
            const centerY = window.innerHeight / 2;
            this.itemRefs.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - itemCenterY);
                const maxDistance = window.innerHeight / 2;
                const ratio = Math.min(distance / maxDistance, 1);
                const scale = 1 - ratio * 0.4;        // Shrinks more when far
                const opacity = 1 - ratio * 0.95;     // Almost invisible when far

                el.style.transform = `scale(${scale}) translateY(${ratio * 20}px)`;
                el.style.opacity = opacity;
            });
        }
    }
};
</script>

<style scoped>
.artists-page {
    background: black;
    color: white;
    text-align: center;
    padding: 0 0 50px 0;
    margin-bottom: 90px;
}

.artist-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 40px 0;
}
</style>
