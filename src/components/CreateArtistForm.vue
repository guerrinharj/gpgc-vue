<template>
    <form @submit.prevent="submitForm" class="create-artist-form">
        <div>
            <label for="name">Artist Name</label>
            <input id="name" v-model="form.name" required />
        </div>
        <div>
            <label for="genre">Genre</label>
            <input id="genre" v-model="form.genre" required />
        </div>
        <button type="submit">Create Artist</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "CreateArtistForm",
    data() {
        return {
            form: {
                name: '',
                genre: '',
                bio: '',
            },
        };
    },
    methods: {
        ...mapActions(['createArtist']),
        async submitForm() {
            const success = await this.createArtist(this.form);
            if (success) {
                alert('Artist created successfully!');
                this.$router.push('/'); // Redirect after creation
            } else {
                alert('Failed to create artist.');
            }
        },
    },
};
</script>

<style>
.create-artist-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.create-artist-form label {
    color: white;
    font-weight: bold;
}

.create-artist-form input, .create-artist-form textarea {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    max-width: 400px;
}

.create-artist-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: black;
    border: 1px solid white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-artist-form button:hover {
    background-color: white;
    color: black;
}
</style>
