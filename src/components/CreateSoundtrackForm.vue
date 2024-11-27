<template>
    <form @submit.prevent="submitForm" class="create-soundtrack-form">
        <div>
            <label for="name">Name</label>
            <input id="name" v-model="form.name" required />
        </div>
        <div>
            <label for="company">Company</label>
            <input id="company" v-model="form.company" required />
        </div>
        <div>
            <label for="year">Year</label>
            <input id="year" type="number" v-model="form.year" required />
        </div>
        <div>
            <label for="info">Info</label>
            <input id="info" v-model="form.info" required />
        </div>
        <div>
            <label for="url">url</label>
            <input id="url" v-model="form.url" required />
        </div>
        <div>
            <label for="kind">kind</label>
            <input id="kind" v-model="form.kind" required />
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
                name: '',
                company: '',
                info: '',
                year: '',
                kind: '',
                url: ''
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
