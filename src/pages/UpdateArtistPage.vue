<template>
    <div class="update-release-page">
        <UpdateArtist :slug="slug" />
    </div>
</template>

<script>
import UpdateArtist from '@/components/UpdateArtistForm.vue';

export default {
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    components: {
        UpdateArtist,
    },
};
</script>

<style>
.update-artist-page {
    padding: 2rem;
    background: black;
    color: white;
}
</style>
