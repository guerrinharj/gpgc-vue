<template>
    <div class="featuring-item">
        <div v-if="featuring.url">
            <a :href="featuring.url" target="_blank" rel="noopener noreferrer">
                <p><b>{{ featuring.name }}</b></p>
                <p>{{ featuring.artist }}</p>
            </a>
                <p class="mute"><em>{{ formattedCredit }}</em></p>
            
        </div>
        <div v-else>
            <p><b>{{ featuring.name }}</b></p>
            <p>{{ featuring.artist }}</p>
        </div>

        <div v-if="isAuthenticated" class="featuring-actions">
            <p>
                <router-link 
                    class="edit" 
                    :to="{ path: `/update-featuring/${featuring.slug}` }">
                    edit
                </router-link>
            </p>
            <p>
                <a class="delete" @click="deleteFeaturing">delete</a>
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['featuring'],
    computed: {
        ...mapGetters(['isAuthenticated']),
        formattedCredit() {
            return Array.isArray(this.featuring.credit) 
                ? this.featuring.credit.join(', ') 
                : this.featuring.credit;
        }
    },
    methods: {
        async deleteFeaturing() {
            const confirmed = confirm(`Are you sure you want to delete "${this.featuring.name}"?`);
            if (!confirmed) return;

            try {
                await this.$store.dispatch('deleteFeaturing', this.featuring.slug);
                alert('Featuring deleted successfully!');
                this.$router.push('/featurings');
            } catch (error) {
                console.error('Error deleting featuring:', error);
                alert('Failed to delete the featuring. Please try again.');
            }
        }
    }
};
</script>

<style>
    .featuring-item {
        color: white;
        text-align: center;
        margin: 1.7rem;
        padding: 1.7rem;
        font-size: 2vw;
    }

    .featuring-item p {
        margin: 0.1rem;
    }

    .featuring-item em {
        font-style: italic; /* Ensure italic styling */
        font-size: 1.1rem
    }

    /* Style for anchor tags in featuring items */
    .featuring-item a {
        text-decoration: none; /* Remove underline */
        color: white; /* Match the color of the text */
        cursor: pointer;
    }

    .featuring-item a:hover {
        text-decoration: underline; /* Add underline on hover */
    }

    .featuring-actions {
        padding: 10px;
        font-size: 0.8rem;
    }

    .delete {
        color: red!important
    }

    .mute {
        display: none
    }

    @media (max-width: 500px) {
        .featuring-item {
            font-size: 5vw
        }
    }
</style>
