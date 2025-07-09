<template>
    <div class="featuring-item">
        <div v-if="featuring.url">
            <a :href="featuring.url" target="_blank" rel="noopener noreferrer">
                <p><b>{{ featuring.name }}</b></p>
                <p>{{ featuring.artist }}</p>
            </a>
        </div>
        <div v-else>
            <p><b>{{ featuring.name }}</b></p>
            <p>{{ featuring.artist }}</p>
        </div>

        <p class="mute">
            <em>{{ formattedCredit }}</em>
        </p>

        <div v-if="isAuthenticated" class="featuring-actions">
            <p>
                <router-link 
                    class="edit" 
                    :to="{ path: `/update-featuring/${featuring.slug}` }"
                >
                    edit
                </router-link>
            </p>
            <p>
                <a class="delete" @click.stop="deleteFeaturing">delete</a>
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
    position: relative;
    color: white;
    text-align: center;
    margin: 1.7rem;
    padding: 1.7rem;
    font-size: 32px;
}

.featuring-item p {
    margin: 0.1rem;
}

.mute {
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 1.1rem;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.featuring-item:hover .mute {
    opacity: 1;
    visibility: visible;
}

.featuring-actions {
    padding: 10px;
    font-size: 0.8rem;
}

.delete {
    color: red !important;
}

@media (max-width: 500px) {
    .featuring-item {
        font-size: 22px;
    }
}
</style>
