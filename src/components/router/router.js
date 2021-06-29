import Vue  from "vue";
import VueRouter from "./krouter";
import Home from '../Home.vue'
Vue.use(VueRouter)
const routes = [
    {
        path:'/xxx',
        component: Home
    }
]
const router = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes
})

export default router;