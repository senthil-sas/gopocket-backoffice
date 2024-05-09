// Import CSS files
import './assets/main.css';
import './assets/tailwind/tailwind.css';

// Import Vue and necessary plugins/components
import { createApp } from 'vue';
import router from './router';
import store from './store';
import Chart from 'vue-frappe-chart';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import spinner from './components/utilComponents/spinner.vue';
import App from './App.vue';
import Notifications from "@kyvg/vue3-notification";


// Import v-calendar components and styles
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// Create the Vue app
const app = createApp(App);

// Register global components
app.component("spinner", spinner);

// Use plugins
app.use(router);
app.use(store);
app.use(Chart);
app.use(VueToast);
app.use(Notifications)
app.mount('#app')

app.use(setupCalendar, {});

// Register v-calendar components
app.component('VCalendar', Calendar);
app.component('VDatePicker', DatePicker);

// Mount the app
app.mount('#viteapp');
