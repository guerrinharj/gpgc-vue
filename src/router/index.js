import Vue from 'vue';
import Router from 'vue-router';
import Releases from '@/pages/Releases.vue';
import Release from '@/pages/Release.vue';
import Featurings from '@/pages/Featurings.vue';
import Soundtracks from '@/pages/Soundtracks.vue';
import About from '@/pages/About.vue';
import Login from '@/pages/Login.vue';
import AddContent from '@/pages/AddContent.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', component: Releases },
        { path: '/releases/:slug', component: Release },
        { path: '/featurings', component: Featurings },
        { path: '/soundtracks', component: Soundtracks },
        { path: '/about', component: About },
        { path: '/login', component: Login },
        { path: '/add-content', component: AddContent },
    ],
});
