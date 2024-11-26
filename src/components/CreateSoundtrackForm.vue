<template>
    <form @submit.prevent="submitForm" class="create-soundtrack-form">
        <div>
            <label for="title">Soundtrack Title</label>
            <input id="title" v-model="form.title" required />
        </div>
        <div>
            <label for="composer">Composer</label>
            <input id="composer" v-model="form.composer" required />
        </div>
        <div>
            <label for="year">Year</label>
            <input id="year" type="number" v-model="form.year" required />
        </div>
        <button type="submit">create</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "CreateSoundtrackForm",
    data() {
        return {
            form: {
                title: '',
                composer: '',
                year: '',
            },
        };
    },
    methods: {
        ...mapActions(['createSoundtrack']),
        async submitForm() {
            const success = await this.createSoundtrack(this.form);
            if (success) {
                alert('Soundtrack created successfully!');
                this.$router.push('/soundtracks'); // Redirect after creation
            } else {
                alert('Failed to create soundtrack.');
            }
        },
    },
};
</script>

<style>
.create-soundtrack-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.create-soundtrack-form label {
    color: white;
    font-weight: bold;
}

.create-soundtrack-form input {
    padding: 0.5rem;
    font-size: 1rem;
}

.create-soundtrack-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: black;
    border: 1px solid white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-soundtrack-form button:hover {
    background-color: white;
    color: black;
}
</style>
