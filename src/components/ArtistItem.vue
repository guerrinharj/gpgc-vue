<template>
    <div class="artist-item">
        <!-- Artist Name -->
        <div>
            <a @click="toggleReleases">
                <h2 :class="{ active: isActive }"><b>{{ artist.name }}</b></h2>
            </a>

            <div v-if="isAuthenticated" class="artist-actions">
                <p>
                    <router-link 
                        class="edit" 
                        :to="{ path: `/update-artist/${artist.slug}` }">
                        edit
                    </router-link>
                </p>
                <p>
                    <a class="delete" @click="deleteArtist">delete</a>
                </p>
            </div>
        </div>

        <!-- Release Lists -->
        <div v-if="isActive" class="artist-releases">
            <!-- Albums -->
            <div v-if="albums.length > 0">
                <h3>Albums:</h3>
                <ul>
                    <li v-for="album in albums" :key="album.id">
                        <router-link 
                            :to="`/releases/${album.slug}`" 
                            @click="navigateToRelease(album.slug)">
                            {{ album.name }} 
                        </router-link>
                        <span class="year">({{ album.release_date.slice(0, 4) }})</span>
                    </li>
                </ul>
            </div>

            <!-- Singles / EPs -->
            <div v-if="singlesAndEPs.length > 0">
                <h3>Singles / EPs:</h3>
                <ul>
                    <li v-for="single in singlesAndEPs" :key="single.id">
                        <router-link 
                            :to="`/releases/${single.slug}`" 
                            @click="handleLinkClick(single.slug)">
                            {{ single.name }} 
                        </router-link>
                        <span class="year">({{ single.release_date.slice(0, 4) }})</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    props: ['artist', 'isActive'], // Accept isActive to determine visibility
    data() {
        return {
            releases: [],
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
        albums() {
            return this.releases.filter(release => release.release_type === 'Album');
        },
        singlesAndEPs() {
            return this.releases.filter(
                release => release.release_type === 'Single' || release.release_type === 'EP'
            );
        },
    },
    methods: {
        async toggleReleases() {
            this.$emit('toggle'); // Notify the parent to toggle the active artist
            if (this.releases.length === 0) {
                try {
                    const response = await this.$store.dispatch('fetchArtistReleases', this.artist.slug);
                    this.releases = response;
                } catch (error) {
                    console.error('Error fetching releases:', error);
                    alert('Failed to load artist details.');
                }
            }
        },
        navigateToRelease(slug) {
            console.log('Navigating to slug:', slug); // Debugging
            this.$emit('toggle'); // Close the current list
            this.$router.push(`/releases/${slug}`); // Navigate to the release page
        },

        async deleteArtist() {
            const confirmed = confirm(`Are you sure you want to delete "${this.artist.name}"?`);
            if (!confirmed) return;

            try {
                await this.$store.dispatch('deleteArtist', this.artist.slug);
                alert('Artist deleted successfully!');
                this.$router.push('/artists');
            } catch (error) {
                console.error('Error deleting artist:', error);
                alert('Failed to delete the artist. Please try again.');
            }
        }
    }
};
</script>



<style>
.artist-item {
    color: white;
    text-align: center;
    margin: 1rem;
    padding: 0.5rem;
}

.artist-item h2 {
    margin: 0.1rem;
}

.artist-item h2.active {
    text-decoration: underline;
}

.artist-item a {
    text-decoration: none;
    color: white;
    cursor: pointer;
    font-weight: 600;
}

.artist-item a:hover {
    text-decoration: underline;
}

.artist-actions {
    padding: 10px;
    font-size: 0.8rem;
}

.artist-releases {
    text-align: center;
}

.artist-releases ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    text-align: center;
}

.artist-releases li {
    margin: 0.5rem 0;
}

.artist-releases h3 {
    font-size: 1.3rem;
    font-weight: 400;
    padding: 0.8rem;
    font-style: italic;
}

.year {
    font-style: normal;
    margin-left: 0.5rem;
    padding-top: 9px;
    font-size: 1.1rem;
}

.edit {
    color: blue;
}

.delete {
    color: red;
}
</style>
