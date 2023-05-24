import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import person from './plugins/person';
import globalDirectives from './plugins/global-directives';
import dayjs from './plugins/dayjs';
import { createPinia } from 'pinia';

const app = createApp(App);
// app.use(globalComponents);
// app.directive('focus', focus);
app.use(globalDirectives);
app.use(dayjs);
app.use(person);
app.use(router);
app.use(createPinia());
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
