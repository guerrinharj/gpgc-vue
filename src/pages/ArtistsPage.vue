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
            itemRefs: []
        };
    },
    computed: mapState(['artists']),
    mounted() {
        this.$store.dispatch('fetchArtists').then(() => {
            this.$nextTick(() => {
                setTimeout(this.applyEffects, 0); // garante que os elementos estejam renderizados
                window.addEventListener('scroll', this.applyEffects, { passive: true });
                window.addEventListener('resize', this.applyEffects);
            });
        });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.applyEffects);
        window.removeEventListener('resize', this.applyEffects);
    },
    methods: {
        toggleArtist(artistId) {
            this.activeArtistId = this.activeArtistId === artistId ? null : artistId;
        },
        applyEffects() {
            const centerY = window.innerHeight / 2;
            this.itemRefs.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - itemCenterY);
                const maxDistance = window.innerHeight / 2;
                const ratio = Math.min(distance / maxDistance, 1);

                const scale = 1 - ratio * 0.4;
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
    padding: 0 0 50px 0;
    margin-bottom: 90px;
    min-height: 100vh;
}

.artist-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 40px 0;
}
</style>
