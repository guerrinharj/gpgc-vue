<template>
    <div class="featurings-page">
        <h1>Featurings</h1>
        <FeaturingItem
        v-for="featuring in featurings"
        :key="featuring.id"
        :featuring="featuring"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import FeaturingItem from '@/components/FeaturingItem.vue';

    export default {
    components: { FeaturingItem },
    computed: mapState(['featurings']),
    created() {
        this.$store.dispatch('fetchFeaturings');
    },
    };
</script>

<style>
    .featurings-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
    }
</style>
