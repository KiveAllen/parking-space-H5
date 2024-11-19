import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import routes from "./config/route.ts";
import * as VueRouter from 'vue-router';


const app = createApp(App);

app.use(Vant);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})
app.use(router)

app.mount('#app')
