<template>
    <div class="releases-page">
        <ReleaseItem
        v-for="release in releases"
        :key="release.id"
        :release="release"
        />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import ReleaseItem from '@/components/ReleaseItem.vue';

    export default {
        name: 'ReleasesPage',
        components: { ReleaseItem },
        computed: mapState(['releases']),
        created() {
            this.$store.dispatch('fetchReleases');
        },
        };
</script>

<style>
    .releases-page {
    background: black;
    color: white;
    text-align: center;
    }
</style>
