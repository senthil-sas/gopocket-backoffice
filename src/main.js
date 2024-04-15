import './assets/main.css'
import { createApp } from 'vue';

import App from './App.vue'
import router from './router'
import store from "./store";
import "./assets/tailwind/tailwind.css";
import Chart from "vue-frappe-chart"
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'; // You can import other themes as well

const app = createApp(App);

// Register the plugin globally
Vue.use(VueToast);



import spinner from './components/utilComponents/spinner.vue'
app.component("spinner", spinner);

app.use(router)
app.use(store)
app.use(Chart)
app.mount('#viteapp')





import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin defaults (optional)
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
