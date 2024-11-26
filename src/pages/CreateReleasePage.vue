<template>
    <div class="create-release-page">
        <h1>Create a New Release</h1>
        <CreateReleaseForm />
    </div>
</template>

<script>
import CreateReleaseForm from '@/components/CreateReleaseForm.vue';

export default {
    name: "CreateReleasePage",
    components: {
        CreateReleaseForm,
    },
};
</script>

<style>
.create-release-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
}
</style>
