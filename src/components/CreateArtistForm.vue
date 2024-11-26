<template>
    <form @submit.prevent="submitForm" class="create-artist-form">
        <div>
            <label for="name">Artist Name</label>
            <input id="name" v-model="form.name" required />
        </div>
        <div>
            <label for="group">Group</label>
            <input id="group" type="checkbox" v-model="form.group" /> 
        </div>
        <button type="submit">Create</button>
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
                group: false,
            },
        };
    },
    methods: {
        ...mapActions(['createArtist']),
        async submitForm() {
            try {
                const success = await this.createArtist(this.form);
                if (success) {
                    alert('Artist created successfully!');
                    this.$router.push('/'); // Redirect after creation
                } else {
                    throw new Error('Failed to create artist.');
                }
            } catch (error) {
                alert(error);
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

.create-artist-form input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    max-width: 400px;
}

.create-artist-form button {
    text-transform: inherit;
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
