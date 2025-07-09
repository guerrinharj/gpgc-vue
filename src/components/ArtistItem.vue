<template>
    <div class="artist-item">
        <!-- Artist Name -->
        <div>
            <a @click="toggleReleases" class="artist-name-wrapper">
                <h3 :class="{ active: isActive }">
                    <span class="formatted-type"><em>{{ formattedType }}</em></span>
                    <b>{{ artist.name }}</b>
                </h3>
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

        <!-- All Releases Chronologically -->
        <transition name="spiral-fade">
            <div v-if="isActive" class="artist-releases">
                <div v-if="sortedReleases.length > 0">
                    <ul>
                        <li v-for="release in sortedReleases" :key="release.id">
                            <router-link 
                                :to="`/releases/${release.slug}`" 
                                @click="navigateToRelease(release.slug)">
                                {{ release.name }}
                            </router-link>
                            <span class="year">({{ release.release_date.slice(0, 4) }})</span>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['artist', 'isActive'],
    data() {
        return {
            releases: [],
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated']),
        sortedReleases() {
            return [...this.releases].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        },
        formattedType() {
            return this.artist.group ? 'group' : 'solo';
        }
    },
    methods: {
        async toggleReleases() {
            this.$emit('toggle');
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
            this.$emit('toggle');
            this.$router.push(`/releases/${slug}`);
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
    padding: 10px;
}

.year {
    display: none;
}

.artist-item h3.active {
    text-decoration: underline;
}


.artist-item a {
    text-decoration: none;
    color: white;
    cursor: pointer;
    font-size: 32px;
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
    font-size: 1.6rem;
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

.artist-name-wrapper {
    display: inline-block;
    position: relative;
}

.artist-name-wrapper b {
    font-size: 48px;
}

.artist-name-wrapper h3 {
    position: relative;
    display: inline-block;
    font-size: 28px;
    margin: 0;
}

.formatted-type {
    position: absolute;
    left: -100px; /* adjust this value as needed */
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    white-space: nowrap;
    font-size: 1rem;
    pointer-events: none;
}

.artist-name-wrapper:hover .formatted-type {
    opacity: 1;
}

/* Transition classes */
.spiral-fade-enter-active {
    animation: spiralDown 0.6s ease-out forwards;
}
.spiral-fade-leave-active {
    opacity: 0;
    transition: opacity 0.3s ease-out;
}
.spiral-fade-enter-from,
.spiral-fade-leave-to {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
}

/* Keyframes for spiral down effect */
@keyframes spiralDown {
    0% {
        opacity: 0;
        transform: scale(0.8) rotate(-10deg) translateY(-20px);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.05) rotate(3deg) translateY(10px);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg) translateY(0);
    }
}




    @media (max-width: 500px) {
    .artist-item b {
        font-size: 7vw!important;
        margin-bottom: 10px;
    }

    .artist-item a {
        font-size: 1.4rem
    }

    .year {
        display: none;
    }



    }
</style>
