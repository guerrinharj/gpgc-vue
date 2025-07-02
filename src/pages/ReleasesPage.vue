<template>
    <div class="releases-page" @scroll.passive="handleScroll" ref="container">
        <div
            v-for="(release, index) in releases"
            :key="release.id"
            :ref="el => itemRefs[index] = el"
            class="release-wrapper"
        >
            <ReleaseItem :release="release" />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ReleaseItem from '@/components/ReleaseItem.vue';

export default {
    name: 'ReleasesPage',
    components: { ReleaseItem },
    data() {
        return {
            itemRefs: []
        };
    },
    computed: mapState(['releases']),
    mounted() {
        window.addEventListener('scroll', this.handleScroll, { passive: true });
        this.handleScroll(); // initialize on load
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            const centerY = window.innerHeight / 2;
            this.itemRefs.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const itemCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(centerY - itemCenterY);
                const maxDistance = window.innerHeight / 2;
                const ratio = Math.min(distance / maxDistance, 1);
                const scale = 1 - ratio * 0.2;
                const opacity = 1 - ratio * 0.5;

                el.style.transform = `scale(${scale}) translateY(${ratio * 20}px)`;
                el.style.opacity = opacity;
            });
        }
    },
    created() {
        this.$store.dispatch('fetchReleases');
    }
};
</script>

<style scoped>
.releases-page {
    background: black;
    color: white;
    text-align: center;
    padding: 50px 0;
}

.release-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 40px 0;
}
</style>
