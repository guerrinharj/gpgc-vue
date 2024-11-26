<template>
    <div class="create-soundtrack-page">
        <h1>Create a New Soundtrack</h1>
        <CreateSoundtrackForm />
    </div>
</template>

<script>
import CreateSoundtrackForm from '@/components/CreateSoundtrackForm.vue';

export default {
    name: "CreateSoundtrackPage",
    components: {
        CreateSoundtrackForm,
    },
};
</script>

<style>
.create-soundtrack-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
}
</style>
