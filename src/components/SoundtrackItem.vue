<template>
    <div class="soundtrack-item">
        <div v-if="soundtrack.url">
            <a :href="soundtrack.url" target="_blank" rel="noopener noreferrer">
                <p><b>{{ soundtrack.name }}</b></p>
                <p>{{ soundtrack.company }}</p>
            </a>
        </div>
        <div v-else>
            <p><b>{{ soundtrack.name }}</b></p>
            <p>{{ soundtrack.company }}</p>
        </div>

        <div v-if="isAuthenticated" class="soundtrack-actions">
            <p>
                <router-link 
                    class="edit" 
                    :to="{ path: `/update-soundtrack/${soundtrack.slug}` }">
                    edit
                </router-link>
            </p>
            <p>
                <a class="delete" @click="deleteSoundtrack">delete</a>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['soundtrack'],
    computed: {
        ...mapGetters(['isAuthenticated']),
    },
    methods: {
        async deleteSoundtrack() {
            const confirmed = confirm(`Are you sure you want to delete "${this.soundtrack.name}"?`);
            if (!confirmed) return;

            try {
                await this.$store.dispatch('deleteSoundtrack', this.soundtrack.slug);
                alert('Soundtrack deleted successfully!');
                this.$router.push('/soundtracks');
            } catch (error) {
                console.error('Error deleting soundtrack:', error);
                alert('Failed to delete the soundtrack. Please try again.');
            }
        }
    }
};
</script>

<style>
.soundtrack-item {
    color: white;
    text-align: center;
    margin: 1.7rem;
    padding: 1.7rem;
    font-size: 3vw
}

.soundtrack-item p {
    margin: 0.1rem;
}

.soundtrack-item a {
    text-decoration: none; /* Remove underline for all links initially */
    color: white; /* Ensure the link matches the styling */
    cursor: pointer;
}

.soundtrack-item a:hover {
    text-decoration: underline; /* Add underline on hover */
}

.year {
    font-style: italic;
    padding-top: 9px;
    font-size: 1.1rem;
}

.soundtrack-actions {
    padding: 10px;
    font-size: 0.8rem;
}

.delete {
    color: red!important
}
</style>
