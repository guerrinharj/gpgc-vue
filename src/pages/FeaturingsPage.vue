<template>
    <div class="featurings-page">
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
        name: 'FeaturingsPage',
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
    }
</style>
