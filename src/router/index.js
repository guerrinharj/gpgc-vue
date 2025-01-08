import { createRouter, createWebHistory } from 'vue-router';
import ReleasesPage from '@/pages/ReleasesPage.vue';
import ReleasePage from '@/pages/ReleasePage.vue';
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
import UpdateFeaturingPage from '@/pages/UpdateFeaturingPage.vue';
import UpdateSoundtrackPage from '@/pages/UpdateSoundtrackPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';


const routes = [
    { path: '/', component: ReleasesPage },
    { path: '/releases/:slug', component: ReleasePage }, 
    { path: '/artists', component: ArtistsPage },
    { path: '/featurings', component: FeaturingsPage },
    { path: '/soundtracks', component: SoundtracksPage },
    { path: '/about', component: AboutPage },
    { path: '/login', component: LoginPage },
    { path: '/create-release', component: CreateReleasePage, meta: { requiresAuth: true } },
    { path: '/create-featuring', component: CreateFeaturingPage, meta: { requiresAuth: true } },
    { path: '/create-soundtrack', component: CreateSoundtrackPage, meta: { requiresAuth: true } },
    { path: '/create-artist', component: CreateArtistPage, meta: { requiresAuth: true } },
    { path: '/update-release/:slug', component: UpdateReleasePage, props: true, meta: { requiresAuth: true } },
    { path: '/update-artist/:slug', component: UpdateArtistPage, props: true, meta: { requiresAuth: true } },
    { path: '/update-featuring/:slug', component: UpdateFeaturingPage, props: true, meta: { requiresAuth: true } },
    { path: '/update-soundtrack/:slug', component: UpdateSoundtrackPage, props: true, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFoundPage },     
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
