import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/components/HomePage.vue'),
    },
    {
      name: 'search',
      path: '/search',
      meta: { auth: true },
      component: () => import('@/components/SearchPage.vue'),
    },
    {
      name: 'yours',
      path: '/yours',
      meta: { auth: true },
      component: () => import('@/components/YoursPage.vue'),
    },
    // {
    //   path: '/:notFound(.*)*',
    //   redirect: '/',
    // },
  ],
});

export default router;
