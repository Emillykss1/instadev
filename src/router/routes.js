const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
    { path: '', redirect: { name: 'login' }},
    { path: 'sign-in', name: 'login', component: () => import('pages/Signin/Index.vue'), alias: '' },
    { path: 'sign-up', name: 'register', component: () => import('pages/SignUp/Index.vue')},
    { path: 'main', name: 'main', component: () => import('pages/Main/Index.vue') },
    { path: 'my-area', name: 'my-area',  component: () => import('pages/MyArea/Index.vue') },
    { path: 'profile', name: 'profile', component: () => import('pages/Profile/Index.vue') },
    { path: 'new-post', name: 'new-post', component: () => import('pages/NewPost/Index.vue') }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
