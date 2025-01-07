<template>
    <form @submit.prevent="submitForm" class="update-featuring-form">
        <div>
            <label for="name">Name</label>
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
        <div>
            <label for="label">Label</label>
            <input id="label" v-model="form.label" />
        </div>
        <div>
            <label for="info">Info</label>
            <input id="info" v-model="form.info" />
        </div>
        <div>
            <label for="is_album">Album?</label>
            <input id="is_album" type="checkbox" v-model="form.is_album" /> 
        </div>

        <div>
            <label for="credit">Credits</label>
            <textarea
                id="cred"
                placeholder="Add credits separated by commas"
                v-model="form.credit"
                @change="updateArray('credit', form.credit)"
                required
            ></textarea>
        </div>


        <button type="submit">update</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "UpdateFeaturingForm",
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
                artist: '',
                release_date: '',
                label: '',
                info: '',
                is_album: false,
                credits: []

            }
        };
    },
    mounted() {
        this.loadFeaturing();
    },
    methods: {
        ...mapActions(['updateFeaturing', 'fetchFeaturing']),

        async loadFeaturing() {
            const featuring = this.$store.getters.getFeaturingBySlug
                ? this.$store.getters.getFeaturingBySlug(this.slug)
                : null;

            if (!featuring) {
                try {
                    await this.fetchFeaturing(this.slug);
                    this.initializeForm();
                } catch (error) {
                    console.error('Error fetching featuring:', error);
                    alert('Failed to load featuring details.');
                }
            } else {
                this.initializeForm(featuring);
            }
        },  

        initializeForm(featuring) {
            if (!featuring) {
                featuring = this.$store.getters.getFeaturingBySlug(this.slug);
            }
            if (featuring) {
                this.form = {
                    name: featuring.name || '',
                    is_group: featuring.artist || '',
                    release_date: featuring.release_date || '',
                    label: featuring.label || '',
                    info: featuring.info || '',
                    is_album: featuring.is_album || false,
                    credits: featuring.credits || []
                };
            } else {
                console.error('Featuring not found for slug:', this.slug);
            }
        },



        async submitForm() {
            try {
                await this.updateFeaturing({ slug: this.slug, data: this.form });
                alert('Featuring updated successfully!');
                this.$router.push(`/featurings/`);
            } catch (error) {
                console.error('Error updating featuring:', error);
                alert('Failed to update featuring.');
            }
        },


        updateArray(field, value) {
            this.form[field] = value.split(',').map(item => item.trim());
        },
    },
};
</script>

<style>
.update-featuring-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}
</style>
