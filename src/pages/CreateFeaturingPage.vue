<template>
    <div class="create-featuring-page">
        <h1>Create a New Featuring</h1>
        <CreateFeaturingForm />
    </div>
</template>

<script>
import CreateFeaturingForm from '@/components/CreateFeaturingForm.vue';

export default {
    name: "CreateFeaturingPage",
    components: {
        CreateFeaturingForm,
    },
};
</script>

<style>
.create-featuring-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
}
</style>
