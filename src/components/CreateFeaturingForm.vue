<template>
    <form @submit.prevent="submitForm" class="create-featuring-form">
        <div>
            <label for="name">Featuring Name</label>
            <input id="name" v-model="form.name" required />
        </div>
        <div>
            <label for="artist">Artist</label>
            <input id="artist" v-model="form.artist" required />
        </div>
        <div>
            <label for="release_date">Release Date</label>
            <input id="release_date" type="date" v-model="form.release_date" required />
        </div>
        <button type="submit">create</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "CreateFeaturingForm",
    data() {
        return {
            form: {
                name: '',
                artist: '',
                release_date: '',
                label: '',
            },
        };
    },
    methods: {
        ...mapActions(['createFeaturing']),
        async submitForm() {
            const success = await this.createFeaturing(this.form);
            if (success) {
                alert('Featuring created successfully!');
                this.$router.push('/'); // Redirect after creation
            } else {
                alert('Failed to create featuring.');
            }
        },
    },
};
</script>

<style>
.create-featuring-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.create-featuring-form label {
    color: white;
    font-weight: bold;
}

.create-featuring-form input {
    padding: 0.5rem;
    font-size: 1rem;
}

.create-featuring-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: black;
    border: 1px solid white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-featuring-form button:hover {
    background-color: white;
    color: black;
}
</style>
