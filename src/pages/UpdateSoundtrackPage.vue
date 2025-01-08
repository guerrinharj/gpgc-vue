<template>
    <div class="update-soundtrack-page">
        <UpdateSoundtrack :slug="slug" />
    </div>
</template>

<script>
import UpdateSoundtrack from '@/components/UpdateSoundtrackForm.vue';

export default {
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    components: {
        UpdateSoundtrack,
    },
};
</script>

<style>
.update-soundtrack-page {
    padding: 2rem;
    background: black;
    color: white;
}
</style>
