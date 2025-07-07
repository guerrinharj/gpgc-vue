<template>
    <div class="release-item" @click="goToRelease">
        <div>
            <p><b>{{ release.name }}</b></p>
            <p>{{ release.artist_name }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['release'],
    methods: {
        async goToRelease() {
            try {
                // Dispatch the action to fetch the release
                await this.$store.dispatch('fetchRelease', this.release.slug);

                // Navigate to the release page
                this.$router.push(`/releases/${this.release.slug}`);
            } catch (error) {
                console.error('Error navigating to release:', error);
                alert('Failed to load release details. Please try again.');
            }
        },
    },
};
</script>

<style>
.release-item {
    cursor: pointer;
    color: white;
    text-align: center;
    margin: 1.7rem;
    padding: 1.7rem;
    font-size: 32px;
}

.release-item p {
    margin: 0.1rem;
}

.release-item div:hover {
    text-decoration: underline;
}

@media (max-width: 500px) {
    .release-item {
        font-size: 22px
    }
}
</style>
