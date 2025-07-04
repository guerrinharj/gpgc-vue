<template>
    <div class="artists-page" ref="container">
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
            itemRefs: [],
            hasScrolled: false
        };
    },
    computed: mapState(['artists']),
    mounted() {
        this.$store.dispatch('fetchArtists').then(() => {
            this.$nextTick(() => {
                window.addEventListener('scroll', this.handleScroll, { passive: true });
                window.addEventListener('resize', this.applyEffects);
            });
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.applyEffects);
    },
    methods: {
        toggleArtist(artistId) {
            this.activeArtistId = this.activeArtistId === artistId ? null : artistId;
        },
        handleScroll() {
            if (!this.hasScrolled) this.hasScrolled = true;
            this.applyEffects();
        },
        applyEffects() {
            if (!this.hasScrolled) return;

            const centerY = window.innerHeight / 2;

            this.itemRefs.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - itemCenterY);
                const maxDistance = window.innerHeight / 2;
                const ratio = Math.min(distance / maxDistance, 1);

                const scale = 1 - ratio * 0.2;
                const opacity = 1 - ratio * 0.95;

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
    padding: 0 50px;
    margin-bottom: 90px;
    min-height: 100vh;
}

.artist-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 20px 0;
    transform: scale(0.8);
    opacity: 0.6;
}
</style>
