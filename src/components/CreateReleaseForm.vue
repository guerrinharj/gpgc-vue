<template>
    <form @submit.prevent="submitForm" class="create-release-form">
        <div>
            <label for="name">Name</label>
            <textarea
                id="label"
                placeholder="Add name of the release"
                v-model="form.name"
                required
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
            <label for="release_type">Release Type</label>
            <select id="release_type" v-model="form.release_type" required>
                <option value="" disabled>Select Release Type</option>
                <option value="Album">Album</option>
                <option value="EP">EP</option>
                <option value="Single">Single</option>
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
            <div v-for="(track, index) in form.tracks" :key="index" class="track-input-group">
                <input
                type="text"
                placeholder="Track Name"
                v-model="track.name"
                required
                />
                <input
                type="text"
                placeholder="Track URL"
                v-model="track.url"
                required
                />
                <button type="button" @click="removeTrack(index)">remove</button>
            </div>
            <button id="add-track" type="button" @click="addTrack">add track</button>
        </div>

        <div>
            <label for="credits">Credits</label>
            <div v-for="(credit, index) in form.credits" :key="index" class="credit-input-group">
                <input
                    type="text"
                    placeholder="Credit Key"
                    v-model="credit.key"
                    required
                />
                <input
                    type="text"
                    placeholder="Credit Value"
                    v-model="credit.value"
                    required
                />
                <button type="button" @click="removeCredit(index)">remove</button>
            </div>
            <button id="add-credit" type="button" @click="addCredit">add credit</button>
        </div>


        <div>
            <label for="links">Links</label>
            <div v-for="(link, index) in form.links" :key="index" class="link-input-group">
                <input
                    type="text"
                    placeholder="Link Key"
                    v-model="link.key"
                    required
                />
                <input
                    type="text"
                    placeholder="Credit Value"
                    v-model="link.value"
                    required
                />
                <button type="button" @click="removeLink(index)">remove</button>
            </div>
            <button id="add-link" type="button" @click="addLink">add link</button>
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
                release_type: '',
                cover: [],
                label: [],
                format: [],
                credits: [],
                notes: [],
                tracks: [],
                links: [],
            }
        };
    },
    computed: {
        ...mapState(['artists']), // Bind Vuex state to the component
    },
    mounted() {
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


        addTrack() {
            this.form.tracks.push({ name: '', url: '' });
        },
        removeTrack(index) {
            this.form.tracks.splice(index, 1);
        },

        
        addCredit() {
            this.form.credits.push({ key: '', value: '' });
        },
        removeCredit(index) {
            this.form.credits.splice(index, 1);
        },
        prepareCredits() {
            return this.form.credits
            .filter((credit) => credit.key.trim() && credit.value.trim())
            .reduce((acc, credit) => {
                acc[credit.key] = credit.value;
                return acc;
            }, {});
        },
        processCreditsBeforeSubmit() {
            this.form.credits = this.prepareCredits();
        },


        addLink() {
            this.form.links.push({ key: '', value: '' });
        },
        removeLink(index) {
            this.form.links.splice(index, 1);
        },
        prepareLinks() {
            return this.form.links
            .filter((link) => link.key.trim() && link.value.trim())
            .reduce((acc, link) => {
                acc[link.key] = link.value;
                return acc;
            }, {});
        },
        processLinksBeforeSubmit() {
            this.form.links = this.prepareLinks();
        },




        async submitForm() {
            this.processCreditsBeforeSubmit();
            this.processLinksBeforeSubmit();

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

#release_date {
    width: 120%
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

.track-input-group, .credit-input-group, .link-input-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border: solid 1px white;
    padding: 20px;
}

.track-input-group input, .credit-input-group input, .link-input-group input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: black;
    color: white;
}

.track-input-group button, .credit-input-group button, .link-input-group button {
    margin: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}

#add-track, #add-credit, #add-link {
    margin: 1rem;
}

.track-input-group button:hover {
    background-color: darkred;
}

.create-release-form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: white;
    background-color: black;
    border: 1px solid grey;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.create-release-form button:hover {
    background-color: white;
    color: black;
}
</style>

