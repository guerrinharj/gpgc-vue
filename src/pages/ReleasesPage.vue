<template>
    <div class="releases-page" ref="container">
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
        this.$store.dispatch('fetchReleases').then(() => {
            this.$nextTick(() => {
                setTimeout(this.applyEffects, 0); // garante que o DOM e os refs estejam prontos
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
        applyEffects() {
            const centerY = window.innerHeight / 2;

            this.itemRefs.forEach(el => {
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
.releases-page {
    background: black;
    color: white;
    text-align: center;
    padding: 0 0 50px 0;
    min-height: 100vh;
}

.release-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 40px 0;
}
</style>
