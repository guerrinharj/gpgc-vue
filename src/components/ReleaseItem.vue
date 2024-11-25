<template>
    <div class="release-item">
        <h3 @click="goToRelease">{{ release.name }}</h3>
    </div>
</template>

<script>
export default {
    props: ['release'],
    methods: {
        goToRelease() {
        this.$router.push(`/releases/${this.release.slug}`);
        },
    },
};
</script>

<style>
.release-item {
    cursor: pointer;
    color: white;
    text-align: center;
    margin: 1rem;
}
</style>
