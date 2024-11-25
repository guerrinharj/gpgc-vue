<template>
    <div class="release-page">
        <h1>{{ release.name }}</h1>
        <h2>{{ release.artist_name }}</h2>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['getSelectedRelease']),
            release() {
                return this.getSelectedRelease;
            },
        },
        created() {
            const slug = this.$route.params.slug;

            // If no release is selected or slug doesn't match, fetch it
            if (!this.release || this.release.slug !== slug) {
                this.$store.dispatch('fetchRelease', slug).catch((error) => {
                    console.error('Error loading release:', error);
                    alert('Failed to load release details.');
                });
            }
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
