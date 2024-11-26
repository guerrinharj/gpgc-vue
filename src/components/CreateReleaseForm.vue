<template>
    <form @submit.prevent="submitForm" class="create-release-form">
        <div>
            <label for="name">Release Name</label>
            <input id="name" v-model="form.name" required />
        </div>
        <div>
            <label for="artist_name">Artist Name</label>
            <input id="artist_name" v-model="form.artist_name" required />
        </div>
        <div>
            <label for="release_date">Release Date</label>
            <input id="release_date" type="date" v-model="form.release_date" required />
        </div>
        <div>
            <label for="label">Label</label>
            <input id="label" v-model="form.label" />
        </div>
        <div>
            <label for="format">Format</label>
            <input id="format" v-model="form.format" />
        </div>
        <button type="submit">create</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "CreateReleaseForm",
    data() {
        return {
            form: {
                name: '',
                artist_name: '',
                release_date: '',
                label: '',
                format: '',
            },
        };
    },
    methods: {
        ...mapActions(['createRelease']),
        async submitForm() {
            const success = await this.createRelease(this.form);
            if (success) {
                alert('Release created successfully!');
                this.$router.push('/featurings'); // Redirect after creation
            } else {
                alert('Failed to create release.');
            }
        },
    },
};
</script>

<style>
.create-release-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.create-release-form label {
    color: white;
    font-weight: bold;
}

.create-release-form input {
    padding: 0.5rem;
    font-size: 1rem;
}

.create-release-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: black;
    border: 1px solid white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-release-form button:hover {
    background-color: white;
    color: black;
}
</style>
