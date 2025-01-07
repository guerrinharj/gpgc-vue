<template>
    <div class="update-featuring-page">
        <UpdateFeaturing :slug="slug" />
    </div>
</template>

<script>
import UpdateFeaturing from '@/components/UpdateFeaturingForm.vue';

export default {
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    components: {
        UpdateFeaturing,
    },
};
</script>

<style>
.update-featuring-page {
    padding: 2rem;
    background: black;
    color: white;
}
</style>
