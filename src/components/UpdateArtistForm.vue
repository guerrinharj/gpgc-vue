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
        <button type="submit">update</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "UpdateArtistForm",
    props: {
        slug: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            form: {
                name: '',
                is_group: ''
            }
        };
    },
    mounted() {
        this.loadArtist();
    },
    methods: {
        ...mapActions(['updateArtist', 'fetchArtist']),

        async loadArtist() {
            const artist = this.$store.getters.getArtistBySlug
                ? this.$store.getters.getArtistBySlug(this.slug)
                : null;

            if (!artist) {
                try {
                    await this.fetchArtist(this.slug);
                    this.initializeForm();
                } catch (error) {
                    console.error('Error fetching artist:', error);
                    alert('Failed to load artist details.');
                }
            } else {
                this.initializeForm(artist);
            }
        },  

        initializeForm(artist) {
            if (!artist) {
                artist = this.$store.getters.getArtistBySlug(this.slug);
            }
            if (artist) {
                this.form = {
                    name: artist.name || '',
                    is_group: artist.is_group || false
                };
            } else {
                console.error('ARtist not found for slug:', this.slug);
            }
        },



        async submitForm() {
            try {
                await this.updateArtist({ slug: this.slug, data: this.form });
                alert('Artist updated successfully!');
                this.$router.push(`/artists/`);
            } catch (error) {
                console.error('Error updating artist:', error);
                alert('Failed to update artist.');
            }
        },
    },
};
</script>

<style>
.update-artist-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

/* Add specific styles here if needed */
</style>
