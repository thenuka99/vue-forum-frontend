import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'notiwind'

// fontawesome
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
// main css file
import"./assets/tailwind.css";

createApp(App).use(Notifications).use(store).use(router).mount('#app')
