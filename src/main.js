import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
    .use(router)
    .use(store) // Use the store here
    .mount('#app');
