<template>
    <div class="release-page">
        <h1>{{ release.name }}</h1>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
    computed: {
        ...mapState(['release']),
    },
    created() {
        const slug = this.$route.params.slug;
        this.$store.dispatch('fetchRelease', slug);
    },
    };
</script>

<style>
    .release-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
    }
</style>