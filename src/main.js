import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import "./assets/tailwind/tailwind.css";
import Chart from "vue-frappe-chart"

const app = createApp(App)


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
