import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import "./assets/tailwind/tailwind.css";
import Chart from "vue-frappe-chart"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Chart)
app.mount('#viteapp')
