import { createWebHistory, createRouter } from 'vue-router'
import MainPage from "../pages/MainPage.vue";

const routes = [
    { path: '/', component: MainPage },
    { path: '/table', component: () => import('../pages/MainTable.vue') },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
