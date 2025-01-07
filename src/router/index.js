import { createRouter, createWebHistory } from 'vue-router';
import ReleasesPage from '@/pages/ReleasesPage.vue';
import ReleasePage from '@/pages/ReleasePage.vue'; // Import the ReleasePage component
import FeaturingsPage from '@/pages/FeaturingsPage.vue';
import SoundtracksPage from '@/pages/SoundtracksPage.vue';
import ArtistsPage from '@/pages/ArtistsPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import CreateReleasePage from '@/pages/CreateReleasePage.vue';
import CreateFeaturingPage from '@/pages/CreateFeaturingPage.vue';
import CreateSoundtrackPage from '@/pages/CreateSoundtrackPage.vue';
import CreateArtistPage from '@/pages/CreateArtistPage.vue';
import UpdateReleasePage from '@/pages/UpdateReleasePage.vue';
import UpdateArtistPage from '@/pages/UpdateArtistPage.vue';


const routes = [
    { path: '/', component: ReleasesPage },
    { path: '/releases/:slug', component: ReleasePage }, 
    { path: '/artists', component: ArtistsPage },
    { path: '/featurings', component: FeaturingsPage },
    { path: '/soundtracks', component: SoundtracksPage },
    { path: '/about', component: AboutPage },
    { path: '/login', component: LoginPage },
    { path: '/create-release', component: CreateReleasePage },
    { path: '/create-featuring', component: CreateFeaturingPage },
    { path: '/create-soundtrack', component: CreateSoundtrackPage },
    { path: '/create-artist', component: CreateArtistPage },
    { path: '/update-release/:slug', component: UpdateReleasePage, props: true },
    { path: '/update-artist/:slug', component: UpdateArtistPage, props: true },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
