<template>
    <transition name="page" appear>
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
    </transition>
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

                const opacity = 1 - ratio * 0.95;

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
    padding: 10vh 50px 5vh;
    margin-bottom: 90px;
    min-height: 100vh;
}

.artist-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 20px 0;
    opacity: 0.9;
}

.page-enter-active,
.page-leave-active {
    transition: opacity 1.6s ease;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
}
</style>
