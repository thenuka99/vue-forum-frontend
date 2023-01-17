import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// fontawesome
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// main css file
import"./assets/tailwind.css";

createApp(App).use(store).use(router).mount('#app')
