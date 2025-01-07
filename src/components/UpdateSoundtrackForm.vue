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
        <button type="submit">update</button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "UpdateSoundtrackForm",
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
                company: '',
                year: '',
                info: '',
                url: '',
                kind: ''
            }
        };
    },
    mounted() {
        this.loadSoundtrack();
    },
    methods: {
        ...mapActions(['updateSoundtrack', 'fetchSoundtrack']),

        async loadSoundtrack() {
            const soundtrack = this.$store.getters.getSoundtrackBySlug
                ? this.$store.getters.getSoundtrackBySlug(this.slug)
                : null;

            if (!soundtrack) {
                try {
                    await this.fetchSoundtrack(this.slug);
                    this.initializeForm();
                } catch (error) {
                    console.error('Error fetching soundtrack:', error);
                    alert('Failed to load soundtrack details.');
                }
            } else {
                this.initializeForm(soundtrack);
            }
        },  

        initializeForm(soundtrack) {
            if (!soundtrack) {
                soundtrack = this.$store.getters.getSoundtrackBySlug(this.slug);
            }
            if (soundtrack) {
                this.form = {
                    name: soundtrack.name || '',
                    company: soundtrack.company || '',
                    year: soundtrack.year || '',
                    info: soundtrack.info || '',
                    url: soundtrack.url || '',
                    kind: soundtrack.kind || ''
                };
            } else {
                console.error('Soundtrack not found for slug:', this.slug);
            }
        },



        async submitForm() {
            try {
                await this.updateSoundtrack({ slug: this.slug, data: this.form });
                alert('Soundtrack updated successfully!');
                this.$router.push(`/soundtracks/`);
            } catch (error) {
                console.error('Error updating soundtrack:', error);
                alert('Failed to update soundtrack.');
            }
        },


        updateArray(field, value) {
            this.form[field] = value.split(',').map(item => item.trim());
        },
    },
};
</script>

<style>
.update-soundtrack-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}
</style>
