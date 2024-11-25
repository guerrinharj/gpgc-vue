import { createRouter, createWebHistory } from 'vue-router';
import ReleasesPage from '@/pages/ReleasesPage.vue';
import ReleasePage from '@/pages/ReleasePage.vue'; // Import the ReleasePage component
import FeaturingsPage from '@/pages/FeaturingsPage.vue';
import SoundtracksPage from '@/pages/SoundtracksPage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import AddContentPage from '@/pages/AddContentPage.vue';

const routes = [
    { path: '/', component: ReleasesPage },
    { path: '/releases/:slug', component: ReleasePage }, // Add dynamic route for ReleasePage
    { path: '/featurings', component: FeaturingsPage },
    { path: '/soundtracks', component: SoundtracksPage },
    { path: '/about', component: AboutPage },
    { path: '/login', component: LoginPage },
    { path: '/add-content', component: AddContentPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
