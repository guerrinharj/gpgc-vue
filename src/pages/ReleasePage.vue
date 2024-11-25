<template>
    <div class="release-page">
        <div class="release-titles">
            <h1 class="release-name">{{ release.name }}</h1>
            <h1>{{ release.artist_name }}</h1>
        </div>

        <!-- Display Cover Images -->
        <div class="release-cover" v-if="release.cover && release.cover.length > 0">
            <div v-for="(image, index) in release.cover" :key="index" class="cover-image">
                <img :src="image" :alt="`${release.name} cover ${index + 1}`" />
            </div>
        </div>

        <div v-if="release.release_date" class="release-info">
            <b>Release date</b>
            <span>{{ release.release_date }}</span>
        </div>
        <div v-if="release.label && release.label.length > 0" class="release-info">
            <b>Label</b>
            <span>{{ release.label.join(', ') }}</span>
        </div>
        <div v-if="release.format && release.format.length > 0" class="release-info">
            <b>Formats</b>
            <span>{{ release.format.join(', ') }}</span>
        </div>

        <!-- Display Track List -->
        <div class="release-tracks" v-if="release.tracks && release.tracks.length > 0">
            <h4>Tracklist:</h4>
            <ul>
                <li v-for="(track, index) in release.tracks" :key="index">
                    <a v-if="track.url" :href="track.url" target="_blank" rel="noopener noreferrer">  {{ track.name }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['getSelectedRelease']),
        release() {
            return this.getSelectedRelease;
        },
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

/* Styling for release information */
.release-info {
    margin: 1rem 0;
    text-align: center;
}

.release-info b {
    display: block;
    margin-bottom: 0.5rem;
}

.release-info span {
    font-size: 1rem;
}

/* Center the ordered list */
.release-tracks {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.release-tracks {
    padding: 2rem;
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
</style>
