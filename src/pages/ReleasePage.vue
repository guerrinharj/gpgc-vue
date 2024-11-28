<template>
    <div class="release-page">
        <div class="release-titles">
            <h1 class="release-name">{{ release.name }}</h1>
            <h1>{{ release.artist_name }}</h1>
        </div>

        <div v-if="isAuthenticated" class="release-actions">
            <p>
                <a class="delete" @click="deleteRelease">delete</a>
            </p>
        </div>

        <!-- Display Cover Images -->
        <div class="release-cover" v-if="release.cover && release.cover.length > 0">
            <div v-for="(image, index) in release.cover" :key="index" class="cover-image">
                <img :src="image" :alt="`${release.name} cover ${index + 1}`" />
            </div>
        </div>

                <!-- Display Track List -->
        <div class="release-tracks" v-if="release.tracks && release.tracks.length > 0">
            <h4>Tracklist</h4>
            <ul>
                <li v-for="(track, index) in release.tracks" :key="index">
                    <a v-if="track.url" :href="track.url" target="_blank" rel="noopener noreferrer">  {{ track.name }}</a>
                </li>
            </ul>
        </div>

        <div v-if="release.release_date" class="release-info">
            <b>Release date</b>
            <span>{{ release.release_date }}</span>
        </div>

        <div v-if="release.label && release.label.length > 0" class="release-info">
            <b>Label</b>
            <ul>
                <li v-for="label in release.label" :key="label">{{ label }}</li>
            </ul>
        </div>

        <div v-if="release.format && release.format.length > 0" class="release-info">
            <b>Formats</b>
            <ul>
                <li v-for="format in release.format" :key="format">{{ format }}</li>
            </ul>
        </div>

        <div v-if="filteredCredits.length > 0" class="release-info">
            <b>Credits</b>
            <ul>
                <li v-for="({ name, credit }) in filteredCredits" :key="name">
                    <strong>{{ name }}</strong>: {{ credit }}
                </li>
            </ul>
        </div>

        <div v-if="release.notes && release.notes.length > 0" class="release-info">
            <b>Notes</b>
            <ul>
                <li v-for="notes in release.notes" :key="notes">{{ notes }}</li>
            </ul>
        </div>

        <div v-if="filteredLinks.length > 0" class="release-info">
            <b>Links</b>
            <ul>
                <li v-for="({ platform, url }) in filteredLinks" :key="platform">
                    <a :href="url" target="_blank" rel="noopener noreferrer">{{ platform }}</a>
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getSelectedRelease', 'isAuthenticated']),
        release() {
            return this.getSelectedRelease;
        },
        filteredLinks() { 
            if (!this.release.links) return []; // In case "links" is null, return an empty array to avoid errors. 
            return Object.entries(this.release.links) // Transform the array of objects "release.links" into an array that follow the pattern ["key", "value"]
                .map(([platform, url]) => ({ platform, url })); // Use `platform` and `url` in the final result
        },
        filteredCredits() {
            if (!this.release.credits) return [];
            return Object.entries(this.release.credits) 
                .map(([credit, name]) => ({ credit, name }));
            
        }
    },
    methods: {
        async deleteRelease() {
            const confirmed = confirm(`Are you sure you want to delete "${this.release.name}"?`);
            if (!confirmed) return;

            try {
                await this.$store.dispatch('deleteRelease', this.release.slug);
                alert('Release deleted successfully!');
                this.$router.push('/');
            } catch (error) {
                console.error('Error deleting release:', error);
                alert('Failed to delete the release. Please try again.');
            }
        }
    },
    created() {
        const slug = this.$route.params.slug;

        // If no release is selected or slug doesn't match, fetch it
        if (!this.release || this.release.slug !== slug) {
            this.$store.dispatch('fetchRelease', slug).catch((error) => {
                console.error('Error loading release:', error);
                alert('Failed to load release details.');
            });
        }

        window.scrollTo(0, 0);
    },
};
</script>

<style>
.release-page {
    background: black;
    color: white;
    text-align: center;
    padding: 2rem;
}

.release-page b, h4 {
    text-decoration: underline;
}

.release-page h1 {
    margin: 0.1rem;
}

.release-titles {
    margin-bottom: 10px;
}

.release-name {
    text-decoration: underline;
}

.release-actions {
    font-size: 1.1rem;
}

.delete {
    color: red
}

/* Cover images are stacked on top of each other */
.release-cover {
    display: block;
    margin: auto;
    padding: 1rem;
}

.cover-image {
    margin-bottom: 1rem;
}

.cover-image img {
    max-width: 30%;
    height: auto;
    border-radius: 8px;
}

.release-info {
    margin: 2rem 0;
    text-align: center;
}

.release-info b {
    display: block;
    margin-bottom: 0.5rem;
}

.release-tracks {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.release-tracks {
    padding: 1rem;
}

.release-tracks h4 {
    margin: 0;
}

.release-tracks ul {
    list-style-type: none;
    padding: 0;
    text-align: center;
}

.release-tracks li {
    margin: 0.1rem 0;
    text-align: center;
}

.release-tracks a {
    color: white!important;
}

.release-tracks a {
    color: lightblue;
    text-decoration: none;
    margin-left: 5px;
}

.release-tracks a:hover {
    text-decoration: underline; 
}

.release-info ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.release-info li {
    margin: 0.1rem 0;
    text-align: center;
}

.release-info a {
    color: inherit;
    text-decoration: none;
}

.release-info a:hover {
    text-decoration: underline;
}

@media (max-width: 400px) {

    .release-tracks li {
        font-size: 0.8rem;
        padding: 0.4rem;
    }
    
}
</style>
