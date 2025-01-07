<template>
    <div class="update-release-page">
        <UpdateRelease :slug="slug" />
    </div>
</template>

<script>
import UpdateRelease from '@/components/UpdateReleaseForm.vue';

export default {
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    components: {
        UpdateRelease,
    },
};
</script>

<style>
.update-release-page {
    padding: 2rem;
    background: black;
    color: white;
}
</style>
