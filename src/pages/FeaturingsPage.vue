<template>
    <transition name="page" appear>
        <div class="featurings-page" ref="container">
            <div
                v-for="(featuring, index) in featurings"
                :key="featuring.id"
                :ref="el => itemRefs[index] = el"
                class="featuring-wrapper"
            >
                <FeaturingItem :featuring="featuring" />
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import FeaturingItem from '@/components/FeaturingItem.vue';

export default {
    name: 'FeaturingsPage',
    components: { FeaturingItem },
    data() {
        return {
            itemRefs: [],
            hasScrolled: false
        };
    },
    computed: mapState(['featurings']),
    mounted() {
        this.$store.dispatch('fetchFeaturings').then(() => {
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
.featurings-page {
    background: black;
    color: white;
    text-align: center;
    padding: 4vh;
    min-height: 100vh;
}

.featuring-wrapper {
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
