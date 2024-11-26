<template>
    <div class="create-artist-page">
        <h1>Create a New Artist</h1>
        <CreateArtistForm />
    </div>
</template>

<script>
import CreateArtistForm from '@/components/CreateArtistForm.vue';

export default {
    name: "CreateArtistPage",
    components: {
        CreateArtistForm,
    },
};
</script>

<style>
.create-artist-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
}
</style>
