<template>
    <form @submit.prevent="submitForm" class="create-release-form">
        <div>
            <label for="name">Name</label>
            <textarea
                id="label"
                placeholder="Add name of the release"
                v-model="form.name"
                @change="updateArray('name', form.name)"
            ></textarea>
        </div>
        
        <div>
            <label for="artist_name">Artist</label>
            <select id="artist_name" v-model="form.artist_name"  required>
                <option v-for="artist in artists" :key="artist.id" :value="artist.name">
                    {{ artist.name }}
                </option>
            </select>
        </div>

        <div>
            <label for="release_date">Release Date</label>
            <input id="release_date" type="date" v-model="form.release_date" required />
        </div>

        <div>
            <label for="cover">Cover</label>
            <textarea
                id="cover"
                placeholder="Add cover URLs separated by commas"
                v-model="form.cover"
                @change="updateArray('cover', form.cover)"
            ></textarea>
        </div>
    
        
        <div>
            <label for="label">Label</label>
            <textarea
                id="label"
                placeholder="Add labels separated by commas"
                v-model="form.label"
                @change="updateArray('label', form.label)"
            ></textarea>
        </div>
        
        <div>
            <label for="format">Format</label>
            <textarea
                id="format"
                placeholder="Add formats separated by commas"
                v-model="form.format"
                @change="updateArray('format', form.format)"
            ></textarea>
        </div>
        
        <div>
            <label for="credits">Credits</label>
            <textarea
                id="credits"
                placeholder='Add credits in JSON format, e.g., {"key1": "value1"}'
                v-model="creditsInput"
                @change="updateObject('credits', creditsInput)"
            ></textarea>
        </div>
        
        <div>
            <label for="notes">Notes</label>
            <textarea
                id="notes"
                placeholder="Add notes separated by commas"
                v-model="form.notes"
                @change="updateArray('notes', form.notes)"
            ></textarea>
        </div>
        
        <div>
            <label for="tracks">Tracks</label>
            <textarea
                id="tracks"
                placeholder='Add tracks as JSON array, e.g., [{"title": "Track 1", "url": "URL 1"}]'
                v-model="tracksInput"
                @change="updateObject('tracks', tracksInput)"
            ></textarea>
        </div>
        
        <div>
            <label for="links">Links</label>
            <textarea
                id="links"
                placeholder='Add links in JSON format, e.g., {"spotify": "url"}'
                v-model="linksInput"
                @change="updateObject('links', linksInput)"
            ></textarea>
        </div>
        
        <button type="submit">create</button>
    </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "CreateReleaseForm",
    data() {
        return {
            form: {
                name: '',
                artist_name: '',
                release_date: '',
                label: [],
                format: [],
                credits: {},
                notes: [],
                tracks: [],
                links: {},
            },
            creditsInput: '',
            tracksInput: '',
            linksInput: '',
        };
    },
    computed: {
        ...mapState(['artists']), // Bind Vuex state to the component
    },
    mounted() {
        console.log("Fetching artists..."); // Debugging log
        this.fetchArtists(); // Fetch artist data
    },
    methods: {
        ...mapActions(['createRelease', 'fetchArtists']),
        updateArray(field, value) {
            this.form[field] = value.split(',').map(item => item.trim());
        },
        updateObject(field, value) {
            try {
                this.form[field] = JSON.parse(value);
            } catch {
                alert('Invalid JSON format');
                this.form[field] = {};
            }
        },
        async submitForm() {
            const success = await this.createRelease(this.form);
            if (success) {
                alert('Release created successfully!');
                this.$router.push('/');
            } else {
                alert('Failed to create release.');
            }
        },
    },
};
</script>

<style>
.create-release-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

#artist_name {
    width: 110%;
}



.create-release-form label {
    color: white;
    font-weight: bold;
}

.create-release-form input,
.create-release-form textarea,
.create-release-form select {
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    background-color: black;
    color: white;
}

.create-release-form textarea {
    overflow: hidden; /* Hides the scrollbar */
}

.create-release-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: black;
    border: 1px solid white;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-release-form button:hover {
    background-color: white;
    color: black;
}
</style>

