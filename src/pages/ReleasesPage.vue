<template>
    <transition name="page" appear>
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
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import ReleaseItem from '@/components/ReleaseItem.vue';

export default {
    name: 'ReleasesPage',
    components: { ReleaseItem },
    data() {
        return {
            itemRefs: [],
            hasScrolled: false
        };
    },
    computed: mapState(['releases']),
    mounted() {
        this.$store.dispatch('fetchReleases').then(() => {
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
        handleScroll() {
            if (!this.hasScrolled) this.hasScrolled = true;
            this.applyEffects();
        },
        applyEffects() {
            if (!this.hasScrolled) return;

            const centerY = window.innerHeight / 2;

            this.itemRefs.forEach(el => {
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
.releases-page {
    background: black;
    color: white;
    text-align: center;
    padding: 4vh;
    min-height: 100vh;
}

.release-wrapper {
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    margin: 40px 0;
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

@media (width: 500px) {
    .releases-page {
        padding-top: 3vh;
    }
}
</style>
